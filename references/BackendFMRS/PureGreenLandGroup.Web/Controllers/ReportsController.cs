using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Models.ViewModel.Properties;
using PureGreenLandGroup.Models.ViewModel.Reports;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Razor;
using PureGreenLandGroup.Web.Filter;
using Microsoft.AspNetCore.Mvc;
using iText.Kernel.Pdf;
using Newtonsoft.Json;
using System.Net.Mail;
using iText.Html2pdf;
using System.Text;
using iText.Kernel.Geom;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IWebHostEnvironment;
using Azure;
using OfficeOpenXml;

namespace PureGreenLandGroup.Web.Controllers

{
    [TokenValidator]
    [Authorize(Roles = $"{UserRole.Admin},{UserRole.Manager}")]
    public class ReportsController : Controller
    {
        private string ApiBaseUrl = string.Empty;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;
        private readonly IEmailService _emailSender;
        private readonly IRazorViewEngine _viewEngine;
        private HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ReportsController(IHostingEnvironment environment, IConfiguration configuration, IEmailService emailSender, IRazorViewEngine viewEngine, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            ApiBaseUrl = _configuration.GetSection("BaseUrl")["API"]!.ToString();
            _emailSender = emailSender;
            _viewEngine = viewEngine;
            _httpClient = new HttpClient();
            _httpContextAccessor = httpContextAccessor;
            _environment = environment;
        }

        public IActionResult ReportsNavigation()
        {
            return View();
        }

        public async Task<IActionResult> ControllerRunTimeReportGrid()
        {
            List<ControllerTimeDetailsVM> controllerTimeDetailsList = new();
            List<PropertiesListVM> propertiesList = new();
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            string propertiesListEndpointUrl = ApiBaseUrl + ApiUrls.GetPropertiesList;
            string controllersListEndpointUrl = ApiBaseUrl + ApiUrls.GetControllerRunTimeList.Replace("[1]", "0");

            HttpResponseMessage constollerAPIResponse = await _httpClient.GetAsync(controllersListEndpointUrl);
            HttpResponseMessage propertAPIResponse = await _httpClient.GetAsync(propertiesListEndpointUrl);
            if (constollerAPIResponse.IsSuccessStatusCode && propertAPIResponse.IsSuccessStatusCode)
            {
                string constrollerJsonData = await constollerAPIResponse.Content.ReadAsStringAsync();
                string propertyJsonData = await propertAPIResponse.Content.ReadAsStringAsync();
                controllerTimeDetailsList = JsonConvert.DeserializeObject<List<ControllerTimeDetailsVM>>(constrollerJsonData)!;
                propertiesList = JsonConvert.DeserializeObject<List<PropertiesListVM>>(propertyJsonData)!;
            }

            //insert properties list into view bag to show in dropdown
            ViewBag.PropertiesList = propertiesList;
            return View(controllerTimeDetailsList);
        }

        [HttpPost]
        public async Task<ActionResult> PropertiesSearchFilter(int propId)
        {
            List<ControllerTimeDetailsVM> controllerTimeDetailsList = new();
            List<PropertiesListVM> propertiesList = new();
            string controllersListEndpointUrl = ApiBaseUrl + ApiUrls.GetControllerRunTimeList.Replace("[1]", propId.ToString());
            string propertiesListEndpointUrl = ApiBaseUrl + ApiUrls.GetPropertiesList;
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage constollerAPIResponse = await _httpClient.GetAsync(controllersListEndpointUrl);
            HttpResponseMessage propertAPIResponse = await _httpClient.GetAsync(propertiesListEndpointUrl);
            if (constollerAPIResponse.IsSuccessStatusCode && propertAPIResponse.IsSuccessStatusCode)
            {
                string constrollerJsonData = await constollerAPIResponse.Content.ReadAsStringAsync();
                string propertyJsonData = await propertAPIResponse.Content.ReadAsStringAsync();
                controllerTimeDetailsList = JsonConvert.DeserializeObject<List<ControllerTimeDetailsVM>>(constrollerJsonData)!;
                propertiesList = JsonConvert.DeserializeObject<List<PropertiesListVM>>(propertyJsonData)!;
            }

            ViewBag.PropertiesList = propertiesList;
            return PartialView("_controllerRunTimeGrid", controllerTimeDetailsList);
        }

        [HttpGet]
        public async Task<IActionResult> GetControllerPrograms(int controllerId)
        {
            try
            {
                List<ProgramViewModel> programViewModels = new();
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                string endPointUrl = ApiBaseUrl + ApiUrls.GetControllerProgramsById.ToString().Replace("[0]", controllerId.ToString());
                HttpResponseMessage response = await _httpClient.GetAsync(endPointUrl);
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the response content to a ProgramTable object

                    string responseContent = await response.Content.ReadAsStringAsync();
                    programViewModels = JsonConvert.DeserializeObject<List<ProgramViewModel>>(responseContent)!;
                }
                return Json(programViewModels);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProgramsStartTimer(int controllerId, int programId)
        {
            try
            {
                ProgramViewModel programViewModels = new();
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                string endPointUrl = ApiBaseUrl + ApiUrls.GetProgramsStartTimer.ToString().Replace("[0]", controllerId.ToString()).Replace("[1]", programId.ToString());
                HttpResponseMessage response = await _httpClient.GetAsync(endPointUrl);
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the response content to a ProgramTableGet object
                    string responseContent = await response.Content.ReadAsStringAsync();
                    programViewModels = JsonConvert.DeserializeObject<ProgramViewModel>(responseContent)!;
                }
                return Json(programViewModels);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// generate the controller runtime report csv file
        /// </summary>
        /// <param name="controllerTimeDetailsVM"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult ExportControllerRunTimeReport(ControllerTimeDetailsVM controllerTimeDetailsVM)
        {
            int controllerId = 0;
            StringBuilder controllerRunTimeReportData = new();
            try
            {
                if (controllerTimeDetailsVM != null)
                {
                    controllerId = controllerTimeDetailsVM.Id;
                    HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                    HttpResponseMessage response = _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.ControllerRuntimeReport}", controllerTimeDetailsVM).Result;
                    response.EnsureSuccessStatusCode(); // Throw an exception if the response is not successful
                    string controllerDetails = response.Content.ReadAsStringAsync().Result;
                    controllerRunTimeReportData = new StringBuilder(controllerDetails);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            var reportName = $"{controllerTimeDetailsVM.PropertyName}_{DateTime.Now.ToString("MMM")}_{DateTime.Now.Year}";
            // Return the PDF as a file result
            Response.Headers["Content-Disposition"] = $"attachment; filename=\"{reportName}.csv\"";
            return File(Encoding.UTF8.GetBytes(controllerRunTimeReportData.ToString()), "text/csv");
        }


        #region Download Inspection PDF for admin and technician
        public async Task<IActionResult> GenerateInspectionPDF(int inspectionId)
        {
            try
            {
                // Create a new instance of the PDF document
                using (MemoryStream memoryStream = new())
                {
                    PdfWriter writer = new(memoryStream);
                    PdfDocument pdfDocument = new(writer);

                    // Set the default page size to A4 (210 x 297 mm)
                    pdfDocument.SetDefaultPageSize(PageSize.A4);

                    string pdfContent = await GenerateInspectionHTML(inspectionId);

                    // Create a HTML converter that converts HTML to PDF
                    ConverterProperties converterProperties = new();
                    HtmlConverter.ConvertToPdf(pdfContent, pdfDocument, converterProperties);

                    // Get the PDF bytes from the MemoryStream
                    byte[] pdfBytes = memoryStream.ToArray();

                    // Return the PDF as a file result
                    Response.Headers["Content-Disposition"] = $"attachment; filename=\"Inspection_{inspectionId}_Report.pdf\"";

                    return File(pdfBytes, "application/pdf");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                throw ex;
            }
        }
        #endregion Download Inspection PDF for admin and technician

        public async Task<IActionResult> RenderInspectionReport(int inspectionId)
        {
            try
            {
                // Create a new instance of the PDF document
                using (MemoryStream memoryStream = new())
                {
                    PdfWriter writer = new(memoryStream);
                    PdfDocument pdfDocument = new(writer);

                    // Set the default page size to A4 (210 x 297 mm)
                    pdfDocument.SetDefaultPageSize(PageSize.A4);

                    string pdfContent = await GenerateInspectionHTML(inspectionId);

                    // Create a HTML converter that converts HTML to PDF
                    ConverterProperties converterProperties = new();
                    HtmlConverter.ConvertToPdf(pdfContent, pdfDocument, converterProperties);

                    // Get the PDF bytes from the MemoryStream
                    byte[] pdfBytes = memoryStream.ToArray();

                    return File(pdfBytes, "application/pdf", "test.pdf");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                throw ex;
            }
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> SendInspectionReportOnEmail(string emailInputs, int inspectionId)
        {
            try
            {
                var emails = emailInputs.Split(";");
                List<string> receivers = new List<string>();
                foreach (var email in emails)
                {
                    receivers.Add(email);
                }

                // Path to the HTML email template
                var filePath = System.IO.Path.Combine(_environment.WebRootPath, "EmailTemplate", "InspectionReportTemplate.html");

                // Read the HTML file as a string
                string body = await System.IO.File.ReadAllTextAsync(filePath);

                var subject = "Inspection Report";
                //var content = "This is the content of the PDF report."; // Your PDF content
                // Create the PDF stream
                byte[] pdfBytes = await CreatePdfAsByteArray(inspectionId);

                // Create an attachment from the byte array
                using (var stream = new MemoryStream(pdfBytes))
                {
                    Attachment attachment = new Attachment(stream, $"Inspection_{inspectionId}_Report.pdf", "application/pdf");
                    var response = await _emailSender.SendEmailAsync(receivers, subject, body, attachment);
                    return Json(response);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        // Method to create a PDF and return it as a byte array
        private async Task<byte[]> CreatePdfAsByteArray(int inspectionId)
        {
            using (MemoryStream memoryStream = new())
            {
                PdfWriter writer = new(memoryStream);
                PdfDocument pdfDocument = new(writer);

                string pdfContent = await GenerateInspectionHTML(inspectionId);

                // Create a HTML converter that converts HTML to PDF
                ConverterProperties converterProperties = new();
                HtmlConverter.ConvertToPdf(pdfContent, pdfDocument, converterProperties);

                // Get the PDF bytes from the MemoryStream
                byte[] pdfBytes = memoryStream.ToArray();

                return pdfBytes;
            }
        }

        // Helper method to generate the HTML content for the inspection report
        private async Task<string> GenerateInspectionHTML(int inspectionId)
        {
            string htmlContent = string.Empty;
            if (inspectionId > 0)
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetInspectionDetailsById.Replace("[0]", inspectionId.ToString())}");
                response.EnsureSuccessStatusCode();
                string responseContent = await response.Content.ReadAsStringAsync();
                InspectionMasterViewModel inspectionMasterData = JsonConvert.DeserializeObject<InspectionMasterViewModel>(responseContent);

                htmlContent = await RenderPartialViewToString("_inspectionReport", inspectionMasterData);

            }
            else
            {
                htmlContent = await RenderPartialViewToString("_inspectionReport", new InspectionMasterViewModel());
            }
            return htmlContent;
        }

        /// <summary>
        /// Render HTML into string
        /// used to convert partial view html to string
        /// </summary>
        /// <param name="viewName"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        private async Task<string> RenderPartialViewToString(string viewName, object model)
        {
            var view = _viewEngine.FindView(ControllerContext, viewName, false);

            if (view.View == null)
            {
                return string.Empty;
            }
            using (var writer = new StringWriter())
            {
                // Ensure ViewData contains the model
                ViewData.Model = model;

                var viewContext = new ViewContext(
                    ControllerContext,
                    view.View,
                    ViewData,
                    TempData,
                    writer,
                    new HtmlHelperOptions()
                );

                await view.View.RenderAsync(viewContext);
                return writer.ToString();
            }
        }

        /// <summary>
        /// creates the catalog mapping excel file
        /// and export it
        /// </summary>
        /// <param name="inspectionId"></param>
        /// <returns></returns>
        //public async Task<IActionResult> ExportCatalogMappingCSV(int inspectionId)
        //{
        //    StringBuilder controllerRunTimeReportData = new();
        //    try
        //    {
        //        if (inspectionId > 0)
        //        {
        //            // Set the authorization header
        //            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

        //            // Make an asynchronous HTTP request
        //            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.CatalogMappingCSV.Replace("[0]", inspectionId.ToString())}").ConfigureAwait(false);

        //            response.EnsureSuccessStatusCode(); // Ensure the response is successful

        //            // Read the response content asynchronously
        //            string controllerDetails = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

        //            controllerRunTimeReportData.Append(controllerDetails);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the error (implement logging mechanism) or handle accordingly
        //        throw new ApplicationException("An error occurred while generating the CSV export.", ex);
        //    }

        //    // Return the CSV as a file result
        //    Response.Headers["Content-Disposition"] = $"attachment; filename=\"catalogMapping{inspectionId}_Report.csv\"";
        //    return File(Encoding.UTF8.GetBytes(controllerRunTimeReportData.ToString()), "text/csv");
        //}



        public async Task<IActionResult> ExportCatalogMappingCSV(int inspectionId)
        {
            try
            {
                if (inspectionId <= 0)
                    return BadRequest("Invalid inspection ID.");

                // Set the authorization header
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                // Make an asynchronous HTTP request to get the CSV content
                HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.CatalogMappingCSV.Replace("[0]", inspectionId.ToString())}")
                                                               .ConfigureAwait(false);

                response.EnsureSuccessStatusCode(); // Ensure the response is successful

                // Read the response content asynchronously
                string catalogData = await response.Content.ReadAsStringAsync();

                // Convert CSV content to Excel format
                var memoryStream = new MemoryStream();
                using (var package = new ExcelPackage(memoryStream))
                {
                    //spreadsheet name
                    var worksheet = package.Workbook.Worksheets.Add("CatalogMapping");

                    // Split the CSV content into lines and columns
                    var lines = catalogData.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

                    // Fill worksheet with CSV data
                    for (int i = 0; i < lines.Length; i++)
                    {
                        var columns = lines[i].Split(',');
                        for (int j = 0; j < columns.Length; j++)
                        {
                            //convert the quantity of items into number format
                            if (j== 3 && i>0)
                            {
                                worksheet.Cells[i + 1, j + 1].Value = Convert.ToInt32(columns[j]);
                            }
                            else
                            {
                                worksheet.Cells[i + 1, j + 1].Value = columns[j];


                            }
                        }
                    }
                    // Save to memory stream
                    package.Save();
                }

                // Return the Excel file as a download
                memoryStream.Seek(0, SeekOrigin.Begin);
                Response.Headers["Content-Disposition"] = $"attachment; filename=\"catalogMapping{inspectionId}_Report.xlsx\"";
                return File(memoryStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception ex)
            {
                // Log the error (implement logging mechanism) or handle accordingly
                //throw new ApplicationException("An error occurred while generating the Excel export.", ex);
                throw ex;
            }
        }
    }
}

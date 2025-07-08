using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Utility.Enums;
using Microsoft.AspNetCore.Mvc.Razor;
using PureGreenLandGroup.Web.Filter;
using Microsoft.AspNetCore.Mvc;
using Path = System.IO.Path;
using Newtonsoft.Json;

namespace PureGreenLandGroup.Web.Controllers
{
    [TokenValidator]
    [Authorize]
    public class InspectionManagerController : Controller
    {
        #region CTOR
        private string ApiBaseUrl = string.Empty;
        private readonly IConfiguration _configuration;
        private readonly IRazorViewEngine _viewEngine;
        private readonly IWebHostEnvironment _environment;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public InspectionManagerController(IConfiguration configuration, IRazorViewEngine viewEngine, IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            ApiBaseUrl = configuration!.GetSection("BaseUrl")["API"]!.ToString();
            _configuration = configuration;
            _viewEngine = viewEngine;
            _environment = environment;
            _httpClient = new HttpClient();
            _httpContextAccessor = httpContextAccessor;
        }
        #endregion CTOR

        /// <summary>
        /// Inspection Grid page
        /// </summary>
        /// <param name="inspectionStatus"></param>
        /// <returns></returns>
        public async Task<IActionResult> InspectionGridIndex(int inspectionStatus = 0)
        {
            List<InspectionList> inspectionList = new();
            try
            {
                var id = HttpContext.Session.GetString("UserId");
                var userId = Convert.ToInt32(id);

                //Set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                string apiEndpoint = ApiUrls.GetUserSpecificInspectionList.Replace("[0]", userId.ToString()).Replace("[1]", inspectionStatus.ToString());
                HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{apiEndpoint}");
                int responseStatus = (int)response.StatusCode;
                if (responseStatus == 200)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    inspectionList = JsonConvert.DeserializeObject<List<InspectionList>>(responseContent)!;
                    inspectionList = inspectionList.OrderByDescending(m => m.InspectionId).ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return View(inspectionList);
        }

        /// <summary>
        /// get inspection list data based on category as draft/completed/all
        /// </summary>
        /// <param name="inspectionStatus"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetInspectionByStatusFilter(int inspectionStatus = 0)
        {
            List<InspectionList> inspectionList = new();
            var id = HttpContext.Session.GetString("UserId");
            var userId = Convert.ToInt32(id);
            //Set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            var endPoint = ApiBaseUrl + ApiUrls.GetUserSpecificInspectionList.Replace("[0]", userId.ToString()).Replace("[1]", inspectionStatus.ToString());
            HttpResponseMessage response = await _httpClient.GetAsync(endPoint);
            int responseStatus = (int)response.StatusCode;
            if (responseStatus == 200)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                inspectionList = JsonConvert.DeserializeObject<List<InspectionList>>(responseContent)!;
                inspectionList = inspectionList.OrderByDescending(m => m.InspectionId).ToList();
            }

            return PartialView("_inspectionGridFilter", inspectionList);
        }


        /// <summary>
        /// Create inspection view page
        /// </summary>
        /// <param name="controllerId"></param>
        /// <returns></returns>
        public async Task<IActionResult> CreateInspection(int controllerId)
        {
            try
            {
                InspectionMasterViewModel inspectionMasterViewModel = new();
                //Set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                string apiEndpoint = ApiUrls.GetCreateInspectionData.Replace("[0]", controllerId.ToString());
                HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{apiEndpoint}");
                int responseStatus = (int)response.StatusCode;
                if (responseStatus == 200)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    inspectionMasterViewModel = JsonConvert.DeserializeObject<InspectionMasterViewModel>(responseContent)!;
                }

                return View(inspectionMasterViewModel);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Save zone images
        /// </summary>
        /// <param name="zoneImageFile"></param>
        /// <param name="zoneId"></param>
        /// <param name="zoneImagesCount"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SaveZoneImage(IFormFile zoneImageFile, int zoneId, int zoneImagesCount)
        {
            InspectedZoneImagesViewModel zoneImagesViewModel = new();
            if (zoneImageFile != null)
            {
                string pathToSave = Path.Combine(_environment.WebRootPath, "ApplicationImages", "ZoneIssuesImages");

                string imageFileName = $"{Path.GetFileNameWithoutExtension(zoneImageFile.FileName)}_zoneIndex{zoneId}_zoneImageIndex{zoneImagesCount + 1}{Path.GetExtension(zoneImageFile.FileName)}";

                string filePath = Path.Combine(pathToSave, imageFileName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await zoneImageFile.CopyToAsync(fileStream);
                    zoneImagesViewModel = new() { ImageName = zoneImageFile.FileName, ImagePath = $"/ApplicationImages/ZoneIssuesImages/{imageFileName}", ImageSrcPath = filePath };
                }
            }
            return Json(zoneImagesViewModel);
        }

        /// <summary>
        /// create inspection post request
        /// </summary>3
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [RequestSizeLimit(201235041)]
        [RequestFormLimits(ValueCountLimit = 1010001)]
        public async Task<IActionResult> CreateInspection([FromBody] CreateInspectionViewModel createInspectionViewModel)
        {
            int actionResponse = 0;

            if (createInspectionViewModel != null)
            {
                //format model to handle nullable inputs
                if (createInspectionViewModel.ZoneIssuesInspectionViewModel != null && createInspectionViewModel.ZoneIssuesInspectionViewModel.Count > 0)
                {
                    foreach (var zoneIssuesItem in createInspectionViewModel.ZoneIssuesInspectionViewModel)
                    {
                        // Directly checking and initializing the lists if null
                        //??= -> This operator checks if the left-hand side is null, and if so, it assigns a new list
                        zoneIssuesItem.InspectedZoneBrokenLateralList ??= new List<InspectedZoneBrokenLateralViewModel>();
                        zoneIssuesItem.InspectedZoneBrokenMainViewModel ??= new List<InspectedZoneBrokenMainViewModel>();
                        zoneIssuesItem.InspectedZoneImagesList ??= new List<InspectedZoneImagesViewModel>();
                        zoneIssuesItem.InspectedMoveHeadList ??= new List<InspectedMoveHeadVM>();
                    }
                }

                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                var userId = HttpContext.Session.GetString("UserId");
                createInspectionViewModel.UserId = Convert.ToInt32(userId);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateNewInspection}", createInspectionViewModel);
                int apiresponseCode = (int)response.StatusCode;
                if (apiresponseCode == 200)
                {
                    actionResponse = (int)JsonResponse.Success;
                }
                else if (apiresponseCode == 400)
                {
                    actionResponse = (int)JsonResponse.ApiBadRequest;
                }
                else
                {
                    actionResponse = (int)JsonResponse.Error;
                }

            }
            return Json(actionResponse);
        }

        /// <summary>
        /// edit inspection bind data
        /// </summary>
        /// <param name="inspectionId"></param>
        /// <returns></returns>
        public async Task<IActionResult> PopulateInspection(int inspectionId)
        {
            try
            {
                InspectionMasterViewModel inspectionMasterData = new();
                if (inspectionId > 0)
                {
                    HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                    HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetInspectionDetailsById.Replace("[0]", inspectionId.ToString())}");
                    response.EnsureSuccessStatusCode();
                    string responseContent = await response.Content.ReadAsStringAsync();
                    inspectionMasterData = JsonConvert.DeserializeObject<InspectionMasterViewModel>(responseContent)!;
                    return View("CreateInspection", inspectionMasterData);
                }
                else
                {
                    return View("InspectionManagement", inspectionMasterData);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// update inspection post request
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [RequestSizeLimit(201235041)]
        [RequestFormLimits(ValueCountLimit = 1010001)]
        public IActionResult UpdateInspection(CreateInspectionViewModel createInspectionViewModel)
        {
            int actionResponse = 0;

            if (createInspectionViewModel != null)
            {
                //format model to handle nullable inputs
                if (createInspectionViewModel.ZoneIssuesInspectionViewModel != null && createInspectionViewModel.ZoneIssuesInspectionViewModel.Count > 0)
                {
                    foreach (var zoneIssuesItem in createInspectionViewModel.ZoneIssuesInspectionViewModel)
                    {
                        // Directly checking and initializing the lists if null
                        //??= -> This operator checks if the left-hand side is null, and if so, it assigns a new list
                        zoneIssuesItem.InspectedZoneBrokenLateralList ??= new List<InspectedZoneBrokenLateralViewModel>();
                        zoneIssuesItem.InspectedZoneBrokenMainViewModel ??= new List<InspectedZoneBrokenMainViewModel>();
                        zoneIssuesItem.InspectedZoneImagesList ??= new List<InspectedZoneImagesViewModel>();
                        zoneIssuesItem.InspectedMoveHeadList ??= new List<InspectedMoveHeadVM>();
                    }
                }
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                var userId = HttpContext.Session.GetString("UserId");
                createInspectionViewModel.UserId = Convert.ToInt32(userId);
                HttpResponseMessage response = _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateNewInspection}", createInspectionViewModel).Result;
                int apiResponseCode = (int)response.StatusCode;
                if (apiResponseCode == 200)
                {
                    actionResponse = (int)JsonResponse.Success;
                }
                else if (apiResponseCode == 400)
                {
                    actionResponse = (int)JsonResponse.ApiBadRequest;
                }
                else
                {
                    actionResponse = (int)JsonResponse.Error;
                }

            }
            return Json(actionResponse);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateInspectionSeasonalAdjust([FromBody] List<SeasionalAdjustViewModel> seasonalAdjustVMList, int controllerId)
        {
            bool actionResult = false;
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.UpdateInspectionSeasonalAdjust.Replace("[0]",controllerId.ToString())}", seasonalAdjustVMList);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                JsonResponse apiResponse = JsonConvert.DeserializeObject<JsonResponse>(responseContent)!;
                if (apiResponse == JsonResponse.RecordModified)
                {
                    actionResult = true;
                }
            }
            return Ok(actionResult);
        }

    }
}

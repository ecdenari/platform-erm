using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.DTO.SP_Models;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Web.Filter;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PureGreenLandGroup.Web.Controllers
{
    [TokenValidator]
    [Authorize] 
    public class ControllersManagerController : Controller
    {
        #region CTOR
        private readonly IConfiguration _configuration;
        private string ApiBaseUrl = string.Empty;
        private HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ControllersManagerController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = new HttpClient();
            ApiBaseUrl = configuration!.GetSection("BaseUrl")["API"]!.ToString();
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        #endregion CTOR

        /// <summary> 
        /// controllers list dashboard
        /// </summary>
        /// <param name="propertyId">if propId is 0 then return all controllers 
        /// otherwise returns specific controllers against specified propId</param>
        /// <returns></returns>
        public async Task<IActionResult> ControllerGridIndex(int propertyId = 0)
        {
            try
            {
                var isAdminLoggedIn = false;

                //validate for success message
                if (TempData.ContainsKey("CreateControllerStatus"))
                {
                    var statusMessage = TempData["CreateControllerStatus"]!.ToString();
                    if (!string.IsNullOrEmpty(statusMessage) && statusMessage.ToLower().Contains("saved"))
                    {
                        ViewBag.StatusMessage = "1";
                    }
                    else if (!string.IsNullOrEmpty(statusMessage) && statusMessage.ToLower().Contains("updated"))
                    {
                        ViewBag.StatusMessage = "2";
                    }
                    else if (!string.IsNullOrEmpty(statusMessage) && statusMessage.ToLower().Contains("error"))
                    {
                        ViewBag.StatusMessage = "0";
                    }
                }
                else
                {
                    ViewBag.StatusMessage = "";
                }

                var userRole = HttpContext.Session.GetString("LoggedUserRole");
                if (!string.IsNullOrEmpty(userRole) && userRole.ToLower() == "admin")
                {
                    isAdminLoggedIn = true;
                }
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
               
                string apiEndpointUrl = ApiUrls.GetControllerListData.Replace("[0]", propertyId.ToString()).Replace("[1]", isAdminLoggedIn.ToString());
                HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{apiEndpointUrl}");
                response.EnsureSuccessStatusCode(); // Throw an exception if the response is not successful
                string responseContent = await response.Content.ReadAsStringAsync();

                List<ControllerListVM> controllerListVMs = JsonConvert.DeserializeObject<List<ControllerListVM>>(responseContent)!;
                ViewBag.PropertyId = propertyId;
                return View(controllerListVMs);

            }
            catch (HttpRequestException ex)
            {
                return View("Error" , ex);
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
        }

        /// <summary>
        /// Create controller page
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> CreateSiteController(int propertyId)
        {
            try
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                CreateControllerViewModel createControllerViewModel = new();
                var apiEndpoint = ApiBaseUrl + ApiUrls.CreateControllerPageData.Replace("[0]", propertyId.ToString());
                HttpResponseMessage controllerResponse = await _httpClient.GetAsync(apiEndpoint);

                if (controllerResponse.IsSuccessStatusCode)
                {
                    string responseContent = await controllerResponse.Content.ReadAsStringAsync();
                    createControllerViewModel = JsonConvert.DeserializeObject<CreateControllerViewModel>(responseContent)!;
                }

                return View(createControllerViewModel);

            }
            catch (HttpRequestException ex)
            {
                return View("Error", ex);
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
        }

        /// <summary>
        /// create controller post request
        /// </summary>
        /// <param name="createControllerViewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [RequestFormLimits(ValueCountLimit = 10000)]
        public async Task<IActionResult> CreateSiteController(CreateControllerViewModel createControllerViewModel)
        {
            if (createControllerViewModel != null)
            {
                //initialize these properties as empty object because API don't accept null value in these
                createControllerViewModel.ManufacturerList = new();
                createControllerViewModel.ModelsList = new();
                createControllerViewModel.WaterSourceList = new();
                createControllerViewModel.PlantTypeList = new();
                createControllerViewModel.ProgramRunTime = new();
                createControllerViewModel.ProgramStartTime = new();
                createControllerViewModel.SoilTypeList = new();
                createControllerViewModel.SprinklerTypesList = new();
                createControllerViewModel.ValveSizeList = new();
                createControllerViewModel.SeasonalAdjutMasterViewModels.seasonalAdjustDropdownData = new();

                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                string apiUrl = $"{ApiBaseUrl}{ApiUrls.CreateController}";
                if (createControllerViewModel.ControllerViewModel.Id > 0)
                {
                    apiUrl = $"{ApiBaseUrl}{ApiUrls.ModifyControllerDetails}";
                }
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync(apiUrl, createControllerViewModel);

                int responseStatus = (int)response.StatusCode;
                if (responseStatus == 200)
                {
                    if (createControllerViewModel.ControllerViewModel.Id > 0)
                    {
                        TempData["CreateControllerStatus"] = "updated";
                        return RedirectToAction("ControllerGridIndex", new { propertyId = createControllerViewModel.PropertyViewModel.PropertId == 0 ? 0 : createControllerViewModel.PropertyViewModel.PropertId });
                    }
                    else
                    {
                        TempData["CreateControllerStatus"] = "saved";
                    }
                }
                else
                {
                    TempData["CreateControllerStatus"] = "error";
                }

                return RedirectToAction("ControllerGridIndex", new { propertyId = createControllerViewModel.PropertyViewModel.PropertId });
            }
            else
            {
                CreateControllerViewModel createControllerVM = new()
                {
                    PropertyViewModel = new PropertyViewModel(),
                    ControllerViewModel = new ControllerDetailsViewModel(),
                    ProgramsListViewModel = new List<ProgramViewModel>(),
                    ControllerZonesList = new List<ZoneViewModel>() { new ZoneViewModel() },
                    ValveSizeList = new List<ValveSizeViewModel>(),
                    SprinklerTypesList = new(),
                    PlantTypeList = new(),
                    SoilTypeList = new(),
                    ManufacturerList = new(),
                    WaterSourceList = new(),
                    ModelsList = new(),
                    ProgramStartTime = new(),
                    ProgramRunTime = new(),
                    SeasonalAdjutMasterViewModels = new(),
                };
                return View("CreateSiteController", createControllerVM);
            }
        }

        /// <summary>
        /// get program runtime data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<ProgramRunTime>> GetProgramRunTimeMasterData()
        {
            List<ProgramRunTime> programRunTimeList = new();
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetProgramRunTimeMasterData}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                programRunTimeList = JsonConvert.DeserializeObject<List<ProgramRunTime>>(responseContent)!;
            }

            return programRunTimeList;
        }

        /// <summary>
        /// get controller details by id to populate data on edit controller page
        /// </summary>
        /// <param name="controllerId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> EditController(int controllerId)
        {
            CreateControllerViewModel createController = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetControllerDetailsById.Replace("[0]", controllerId.ToString())}");
            response.EnsureSuccessStatusCode(); // Throw an exception if the response is not successful
            string controllerDetails = await response.Content.ReadAsStringAsync();
            createController = JsonConvert.DeserializeObject<CreateControllerViewModel>(controllerDetails)!;

            return View("CreateSiteController", createController);
        }
    }
}

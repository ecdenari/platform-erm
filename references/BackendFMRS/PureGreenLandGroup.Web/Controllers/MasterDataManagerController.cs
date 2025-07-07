using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Utility.Enums;
using PureGreenLandGroup.Web.Filter;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;
using PureGreenLandGroup.Models.ViewModel.Inspection;

namespace PureGreenLandGroup.Web.Controllers
{
    [TokenValidator]
    [Authorize]
    public class MasterDataManagerController : Controller
    {
        #region CTOR
        private HttpClient _httpClient;
        private string ApiBaseUrl;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MasterDataManagerController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = new HttpClient();
            _configuration = configuration;
            ApiBaseUrl = configuration.GetSection("BaseUrl")["API"]!.ToString();

            _httpContextAccessor = httpContextAccessor;
        }
        #endregion CTOR

        /// <summary>
        /// admin panel view page
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> AdminPanel()
        {
            AdminPanelStatisticsVM adminPanelStatisticsVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetMasterDataStatistics}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                adminPanelStatisticsVM = JsonConvert.DeserializeObject<AdminPanelStatisticsVM>(responseContent)!;
            }
            return View(adminPanelStatisticsVM);
        }


        #region Manufacturer Management begins
        /// <summary>
        /// manufacturer grid page
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ManufacturerGridIndex()
        {
            List<ManufacturerViewModel> manufacturerListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ManufacturersList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                manufacturerListVM = JsonConvert.DeserializeObject<List<ManufacturerViewModel>>(responseContent)!;
            }

            return View(manufacturerListVM);
        }

        /// <summary>
        /// create new manufacturer
        /// </summary>
        /// <param name="manufacturerVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateManufacturer(ManufacturerViewModel manufacturerVM)
        {
            bool status = false;
            if (manufacturerVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateManufacturer}", manufacturerVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        /// <summary>
        /// get manufacturer detail by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<IActionResult> GetManufacturer(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            ManufacturerViewModel manufacturerViewModel = new ManufacturerViewModel();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.Manufacturer.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                manufacturerViewModel = JsonConvert.DeserializeObject<ManufacturerViewModel>(responseContent)!;
                modelsDetails.Add(manufacturerViewModel.Id);
                modelsDetails.Add(manufacturerViewModel.ManufacturerName!);
                modelsDetails.Add(manufacturerViewModel.IsActive);
            }
            return Json(modelsDetails);
        }

        /// <summary>
        /// generic method to activate/deactivate master entities
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <param name="masterEntityType"></param>
        /// <returns></returns>
        public async Task<IActionResult> ChangeMasterEntityStatus(int id, bool status, MasterEntityType masterEntityType)
        {
            bool isStatusChanged = false;
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ChangeMasterEntityStatus.
                Replace("[0]", id.ToString()).
                Replace("[1]", status.ToString()).
                Replace("[2]", masterEntityType.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                JsonResponse apiResponse = JsonConvert.DeserializeObject<JsonResponse>(responseContent)!;
                if (apiResponse == JsonResponse.RecordModified)
                {
                    isStatusChanged = true;
                }
            }
            return Json(isStatusChanged);
        }

        #endregion Manufacturer Management ends

        #region Models Management begins
        /// <summary>
        /// models grid page
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ModelGridIndex()
        {


            List<ModelGridListVM> modelGridListVMs = new List<ModelGridListVM>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ModelGridList}");
            HttpResponseMessage mnfResponse = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ManufacturersList}");

            if (response.IsSuccessStatusCode && mnfResponse.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                string manfResponseContent = await mnfResponse.Content.ReadAsStringAsync();
                modelGridListVMs = JsonConvert.DeserializeObject<List<ModelGridListVM>>(responseContent)!;
                var manufacturerList = JsonConvert.DeserializeObject<List<ManufacturerViewModel>>(manfResponseContent)!;
                ViewBag.ManufacturerList = manufacturerList.Where(m => m.IsActive).ToList();
            }

            return View(modelGridListVMs);
        }


        /// <summary>
        /// create new model
        /// </summary>
        /// <param name="modelsVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateNewModel(ModelsViewModels modelsVM)
        {
            bool status = false;
            if (modelsVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateModel}", modelsVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        /// <summary>
        /// get model details by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetModel(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.Model.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                ModelsViewModels modelsVM = JsonConvert.DeserializeObject<ModelsViewModels>(responseContent)!;
                modelsDetails.Add(modelsVM.Id);
                modelsDetails.Add(modelsVM.ModelName!);
                modelsDetails.Add(modelsVM.IsActive);
                modelsDetails.Add(modelsVM.ManufacturerId);
            }
            return Json(modelsDetails);
        }

        public async Task<IActionResult> GetModelListByManufacturerId(int manufacturerId)
        {
            List<ModelsViewModels> modelsListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ModelListByManufacturerId.Replace("[0]", manufacturerId.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                modelsListVM = JsonConvert.DeserializeObject<List<ModelsViewModels>>(responseContent)!;
            }
            return Json(modelsListVM);
        }
        #endregion Models Management ends

        #region Plant Type Management begins

        public async Task<IActionResult> PlantsGridIndex()
        {
            List<PlantTypeViewModel> plantsListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.PlantsList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                plantsListVM = JsonConvert.DeserializeObject<List<PlantTypeViewModel>>(responseContent)!;
            }
            return View(plantsListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewPlant(PlantTypeViewModel plantsTypeVM)
        {
            bool status = false;
            if (plantsTypeVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreatePlantType}", plantsTypeVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetPlantsType(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.Plant.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                PlantTypeViewModel plantTypeVM = JsonConvert.DeserializeObject<PlantTypeViewModel>(responseContent)!;
                modelsDetails.Add(plantTypeVM.Id);
                modelsDetails.Add(plantTypeVM.PlantTypeName!);
                modelsDetails.Add(plantTypeVM.IsActive);
            }
            return Json(modelsDetails);
        }

        #endregion Plant Type Management ends

        #region Soil Type Management begins
        public async Task<IActionResult> SoilTypeGridIndex()
        {
            List<SoilTypeViewModel> soilsListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SoilTypeList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                soilsListVM = JsonConvert.DeserializeObject<List<SoilTypeViewModel>>(responseContent)!;
            }
            return View(soilsListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewSoilType(SoilTypeViewModel plantsTypeVM)
        {
            bool status = false;
            if (plantsTypeVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateSoilType}", plantsTypeVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetSoilType(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SoilType.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                SoilTypeViewModel soilTypeVM = JsonConvert.DeserializeObject<SoilTypeViewModel>(responseContent)!;
                modelsDetails.Add(soilTypeVM.Id);
                modelsDetails.Add(soilTypeVM.SoilTypeName!);
                modelsDetails.Add(soilTypeVM.IsActive);
            }
            return Json(modelsDetails);
        }
        #endregion Plant Type Management ends

        #region Sprinklers Management begins
        public async Task<IActionResult> SprinklersGridIndex()
        {
            List<SprinklerTypesViewModel> sprinklerTypeListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SprinklerList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                sprinklerTypeListVM = JsonConvert.DeserializeObject<List<SprinklerTypesViewModel>>(responseContent)!;
            }
            return View(sprinklerTypeListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewSprinkler(SprinklerTypesViewModel sprinklerTypesVM)
        {
            bool status = false;
            if (sprinklerTypesVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateSprinkler}", sprinklerTypesVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetSprinkler(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.Sprinkler.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                SprinklerTypesViewModel sprinklerTypesVM = JsonConvert.DeserializeObject<SprinklerTypesViewModel>(responseContent)!;
                modelsDetails.Add(sprinklerTypesVM.Id);
                modelsDetails.Add(sprinklerTypesVM.SprinklerTypeName!);
                modelsDetails.Add(sprinklerTypesVM.IsActive);
            }
            return Json(modelsDetails);
        }
        #endregion Sprinklers Management ends

        #region Valve sizes Management begins
        public async Task<IActionResult> ValveSizeGridIndex()
        {
            List<ValveSizeViewModel> valveSizeListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ValveSizeList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                valveSizeListVM = JsonConvert.DeserializeObject<List<ValveSizeViewModel>>(responseContent)!;
            }
            return View(valveSizeListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewValveSize(ValveSizeViewModel ValveSizeVM)
        {
            bool status = false;
            if (ValveSizeVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateValveSize}", ValveSizeVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetValveSize(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ValveSize.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                ValveSizeViewModel valveSizeVM = JsonConvert.DeserializeObject<ValveSizeViewModel>(responseContent)!;
                modelsDetails.Add(valveSizeVM.Id);
                modelsDetails.Add(valveSizeVM.ValveSizenames!);
                modelsDetails.Add(valveSizeVM.IsActive);
            }
            return Json(modelsDetails);
        }
        #endregion Valve sizes Management ends

        #region Seasonal Adjust values management begins
        public async Task<IActionResult> SeasonalAdjustMonthGridIndex()
        {
            List<SeasonalAdjustDropdownViewModel> seasonalAdjustDropdownListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SeasonalAdjustMonthList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                seasonalAdjustDropdownListVM = JsonConvert.DeserializeObject<List<SeasonalAdjustDropdownViewModel>>(responseContent)!;
            }
            return View(seasonalAdjustDropdownListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewSeasonalAdjustMonth(SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM)
        {
            bool status = false;
            if (seasonalAdjustDropdownVM != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateSeasonalAdjustMonth}", seasonalAdjustDropdownVM);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetSeasonalAdjustMonth(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SeasonalAdjustMonth.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                SeasonalAdjustDropdownViewModel seasonalAdjustVM = JsonConvert.DeserializeObject<SeasonalAdjustDropdownViewModel>(responseContent)!;
                modelsDetails.Add(seasonalAdjustVM.Id);
                modelsDetails.Add(seasonalAdjustVM.Value!);
                modelsDetails.Add(seasonalAdjustVM.IsActive);
            }
            return Json(modelsDetails);
        }
        #endregion Seasonal Adjust values management ends

        #region Seasonal Adjust values management begins
        public async Task<IActionResult> ZoneRuntimeGridIndex()
        {
            List<ProgramRunTimeViewModel> programRunTimeViewModelListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ProgramRuntimeList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                programRunTimeViewModelListVM = JsonConvert.DeserializeObject<List<ProgramRunTimeViewModel>>(responseContent)!;
            }
            return View(programRunTimeViewModelListVM);
        }

        [HttpPost]
        public async Task<IActionResult> CreateZoneRuntimeValue(ProgramRunTimeViewModel programRunTimeViewModel)
        {
            bool status = false;
            if (programRunTimeViewModel != null)
            {
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateProgramRuntime}", programRunTimeViewModel);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<bool>(responseContent);
                    if (result)
                    {
                        status = true;
                    }
                    else
                    {
                        status = false;
                    }
                }
                else
                {
                    status = false;
                }
            }
            return Json(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetProgramRuntime(int id)
        {
            // Create an array to hold the values
            List<object> modelsDetails = new List<object>();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.ProgramRuntime.Replace("[0]", id.ToString())}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                ProgramRunTimeViewModel programRunTimeVM = JsonConvert.DeserializeObject<ProgramRunTimeViewModel>(responseContent)!;
                modelsDetails.Add(programRunTimeVM.Id);
                modelsDetails.Add(programRunTimeVM.Value!);
                modelsDetails.Add(programRunTimeVM.IsActive);
            }
            return Json(modelsDetails);
        }
        #endregion Seasonal Adjust values management ends

        /// <summary>
        /// to get the data for new dynamically added zone dropdown inputs
        /// </summary>
        /// <returns></returns>
        public async Task<ContollerMasterViewModel> GetMasterDataForNewZone()
        {
            ContollerMasterViewModel controllerMasterVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetMasterDataForDynamicZone}");

            response.EnsureSuccessStatusCode();
            int responseStatus = (int)response.StatusCode;
            if (responseStatus == 200)
            {
                string responseContent = await response.Content.ReadAsStringAsync();

                // Parse the JSON response into a JObject
                JObject jsonObject = JObject.Parse(responseContent);

                // Extract the "valveSizes" property
                JToken valveSizesToken = jsonObject["valveSizes"];

                controllerMasterVM = JsonConvert.DeserializeObject<ContollerMasterViewModel>(responseContent)!;
                // Deserialize the "valveSizes" property into the ValveSizeList
                controllerMasterVM.ValveSizeList = valveSizesToken.ToObject<List<ValveSizeViewModel>>();
            }
            return controllerMasterVM;
        }

        /// <summary>
        /// view page of catalog mapping user input form
        /// </summary>
        /// <returns></returns>
        public IActionResult CatalogMapping()
        {
            CatalogMappingVM catalogMappingVM = new();

            //validate for success message
            if (TempData.ContainsKey("DataStatus"))
            {
                var statusMessage = TempData["DataStatus"]!.ToString();
                JsonResponse jsonResponse = JsonConvert.DeserializeObject<JsonResponse>(statusMessage);
                if (!string.IsNullOrEmpty(statusMessage) && jsonResponse == JsonResponse.RecordSaved)
                {
                    ViewBag.StatusMessage = "1";
                }
                else if (!string.IsNullOrEmpty(statusMessage) && jsonResponse == JsonResponse.RecordModified)
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

            //call API to get the page data
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.MappingPageData}").Result;
            if (response.IsSuccessStatusCode)
            {
                string apiData = response.Content.ReadAsStringAsync().Result;
                catalogMappingVM = JsonConvert.DeserializeObject<CatalogMappingVM>(apiData)!;
            }
            return View(catalogMappingVM);
        }

        [HttpPost]
        public IActionResult CreateUpdateCatalogMapping(CatalogMappingVM catalogMappingVM)
        {
            if (catalogMappingVM != null)
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
                HttpResponseMessage response = _httpClient.PostAsJsonAsync($"{ApiBaseUrl}{ApiUrls.CreateMapping}", catalogMappingVM).Result;
                if (response.IsSuccessStatusCode)
                {
                    var data = response.Content.ReadAsStringAsync().Result;
                    var jsonResponse = JsonConvert.DeserializeObject<JsonResponse>(data)!;
                    TempData["DataStatus"] = jsonResponse;
                }
            }

            return RedirectToAction("CatalogMapping");
        }

        [HttpGet]
        public async Task<List<SeasonalAdjustDropdownViewModel>> GetSeasonalAdjustDropdownList()
        {
            List<SeasonalAdjustDropdownViewModel> seasonalAdjustDropdownListVM = new();
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.SeasonalAdjustMonthList}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                seasonalAdjustDropdownListVM = JsonConvert.DeserializeObject<List<SeasonalAdjustDropdownViewModel>>(responseContent)!;
                seasonalAdjustDropdownListVM = seasonalAdjustDropdownListVM.Where(m => m.IsActive).ToList();
            }
            return seasonalAdjustDropdownListVM;
        }
    }
}

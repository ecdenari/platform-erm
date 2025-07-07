using PureGreenLandGroup.Models.ViewModel.Properties;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Web.Filter;

namespace PureGreenLandGroup.Web.Controllers
{
    [Authorize]
    [TokenValidator]
    public class PropertiesManagerController : Controller
    {
        #region CTOR
        private string ApiBaseUrl = string.Empty;
        private readonly IConfiguration _configuration;
        private HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PropertiesManagerController(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _httpClient = new HttpClient();
            ApiBaseUrl = configuration!.GetSection("BaseUrl")["API"]!.ToString();
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        #endregion CTOR


        /// <summary>
        /// properties grid index page
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> PropertiesGridIndex()
        {
            try 
            {
                List<PropertiesListVM> propertiesList = new List<PropertiesListVM>();
               
                //set authorization
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                string apiEndpointUrl = ApiBaseUrl + ApiUrls.GetPropertiesList;

                HttpResponseMessage response = await _httpClient.GetAsync(apiEndpointUrl);
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    propertiesList = JsonConvert.DeserializeObject<List<PropertiesListVM>>(responseContent);
                    //find logged in user role
                    var userRole = HttpContext.Session.GetString("LoggedUserRole");
                    if (!string.IsNullOrEmpty(userRole))
                    {
                        if (userRole.ToLower() == "technician")
                        {
                            propertiesList = propertiesList.Where(m => m.IsActive).ToList();
                        }
                    }
                }
                return View(propertiesList);
            }
            catch (HttpRequestException ex)
            {
                // Handle the exception, e.g., log the error and return an error view
                return View("Error");
            }
            catch (Exception ex)
            {
                // Handle other exceptions, e.g., log the error and return an error view
                return View("Error");
            }
        }

        /// <summary>
        /// activate/deactivate property
        /// </summary>
        /// <param name="id"></param>
        /// <param name="propertyStatus"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ChangePropertyStatus(int id, bool propertyStatus)
        {

            if (propertyStatus)
            {
                propertyStatus = false;
            }
            else
            {
                propertyStatus = true;
            }
            string apiEndpointUrl = ApiBaseUrl + ApiUrls.ChangePropertyStatus.Replace("[0]", id.ToString()).Replace("[1]", propertyStatus.ToString());
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage response = await _httpClient.GetAsync(apiEndpointUrl);
            if (response.IsSuccessStatusCode)
            {
                int responseStatus = (int)response.StatusCode;
                if (responseStatus == 200)
                {
                    return Json(true);
                }
                else
                {
                    return BadRequest();

                }
            }
            else
            {
                return BadRequest();

            }
        }


        /// <summary>
        /// View page to show properties statistics
        /// and provide option to sync properties
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> SyncPropertiesIndex()
        {
            PropertyCountsVM propertyCountsVM = new();
            //get the properties statistics details
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetPropertyStatistics}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                propertyCountsVM = JsonConvert.DeserializeObject<PropertyCountsVM>(responseContent)!;
            }
            return View(propertyCountsVM);
        }


        /// <summary>
        /// get latest properties
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> RefreshProperties()
        {
            bool actionResponse = false;
            //set authorization
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage response = await _httpClient.GetAsync($"{ApiBaseUrl}{ApiUrls.GetLatestProperties}");
            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                actionResponse = JsonConvert.DeserializeObject<bool>(responseContent)!;
            }
            return Json(actionResponse);
        }
    }
}

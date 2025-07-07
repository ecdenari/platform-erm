using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using PureGreenLandGroup.Models.DTO.WebAuthentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using PureGreenLandGroup.Models.ViewModel.Account;
using PureGreenLandGroup.Models.ViewModel.Reports;
using PureGreenLandGroup.Models.DTO.Account;
using PureGreenLandGroup.Utility.Resources;
using PureGreenLandGroup.Utility.Constants;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Utility.Enums;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using PureGreenLandGroup.Web.Filter;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Newtonsoft.Json;
using System.Text;
using System.Data;

namespace PureGreenLandGroup.Web.Controllers
{
    [Authorize(Roles = $"{UserRole.Admin},{UserRole.Manager}")]
    public class AccountController : Controller
    {
        #region CTOR
        private readonly IConfiguration _configuration;
        private string _apiBaseUrl = string.Empty;
        private readonly IWebHostEnvironment _environment;
        private HttpClient _httpClient = new();
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountController(IConfiguration conf, IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = conf;
            _apiBaseUrl = _configuration.GetSection("BaseUrl")["API"]!.ToString();
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }
        #endregion CTOR

        [AllowAnonymous]
        public IActionResult Login()
        {

            return View();
        }

        /// <summary>
        /// login user
        /// </summary>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        [AllowAnonymous, HttpPost]
        public async Task<IActionResult> Login(LoginUserVM loginUser)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string secretKey = _configuration["JWT:Key"]!;
                    HttpResponseMessage response = await _httpClient.PostAsJsonAsync($"{_apiBaseUrl}{ApiUrls.Login}", loginUser);
                    if (response.IsSuccessStatusCode)
                    {
                        string responseContent = await response.Content.ReadAsStringAsync();
                        ApiAuthResponse authResponse = JsonConvert.DeserializeObject<ApiAuthResponse>(responseContent)!;
                        if (authResponse.AuthStatus == Convert.ToInt32(APICustomResponse.Authorized))
                        {
                            var UserDetails = GetUserDetails(authResponse.Response!, secretKey);
                            var identity = new ClaimsIdentity(IdentityConstants.ApplicationScheme);
                            identity.AddClaim(new Claim(ClaimTypes.Email, UserDetails[UserClaims.Email]));
                            identity.AddClaim(new Claim(ClaimTypes.Name, UserDetails[UserClaims.Username]));
                            identity.AddClaim(new Claim(ClaimTypes.Role, UserDetails[UserClaims.Role]));

                            await HttpContext.SignInAsync(new ClaimsPrincipal(identity));

                            // Set session data
                            HttpContext.Session.SetString(SessionKey.LoggedUserEmail, UserDetails[UserClaims.Email]);
                            HttpContext.Session.SetString(SessionKey.LoggedUserName, UserDetails[UserClaims.Username]);
                            HttpContext.Session.SetString(SessionKey.LoggedUserRole, UserDetails[UserClaims.Role]);
                            HttpContext.Session.SetString(SessionKey.UserId, UserDetails[UserClaims.UserId]);
                            HttpContext.Session.SetString(SessionKey.APIAccessToken, authResponse.Response!.ToString());
                            if (UserDetails["Role"] == UserRole.Admin)
                            {
                                return RedirectToAction("AdminDashboard", "Account");
                            }
                            else if (UserDetails["Role"] == UserRole.Technician)
                            {
                                return RedirectToAction("PropertiesGridIndex", "PropertiesManager");
                            }
                            else if (UserDetails["Role"] == UserRole.Manager)
                            {
                                return RedirectToAction("IrrigationManagerDashboard", "Account");
                            }
                            else
                            {
                                return RedirectToAction("GetPropertiesData", "Dashboard");
                            }
                        }
                        else if (authResponse.AuthStatus == Convert.ToInt32(APICustomResponse.InvalidPassword))
                        {
                            ModelState.AddModelError("Password", Messages.InvalidPassword);
                            return View(loginUser);

                        }
                        else if (authResponse.AuthStatus == Convert.ToInt32(APICustomResponse.InvalidUser))
                        {
                            ModelState.AddModelError("Password", Messages.InvalidEmail);
                            return View(loginUser);
                        }
                        else if (authResponse.AuthStatus == Convert.ToInt32(APICustomResponse.DeactivatedUser))
                        {
                            ModelState.AddModelError("Password", Messages.InactiveUser);
                            return View(loginUser);
                        }
                        else
                        {
                            return View(loginUser);
                        }
                    }
                    else
                    {
                        return View(loginUser);
                    }
                }
                else
                {
                    return View(loginUser);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// extract user details from the JWT token
        /// </summary>
        /// <param name="Token"></param>
        /// <param name="secretKey"></param>
        /// <returns></returns>
        private Dictionary<string, string> GetUserDetails(string Token, string secretKey)
        {
            Dictionary<string, string> userDetails = new Dictionary<string, string>();
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secretKey);

                tokenHandler.ValidateToken(Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                // Retrieve the email claim value
                var email = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtClaims.email)?.Value;
                var role = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtClaims.role)?.Value;
                var userName = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtClaims.unique_name)?.Value;
                var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == JwtClaims.id)?.Value;
                userDetails.Add(UserClaims.Username, userName!);
                userDetails.Add(UserClaims.Email, email!);
                userDetails.Add(UserClaims.Role, role!);
                userDetails.Add(UserClaims.UserId, userId!);
            }
            catch (Exception)
            {

                throw;
            }
            return userDetails;
        }

        /// <summary>
        /// Logout user
        /// </summary>
        /// <returns></returns>
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                HttpContext.Session.Clear();
            }
            catch (Exception)
            {

                throw;
            }
            return RedirectToAction("Login");
        }

        [AllowAnonymous]
        public IActionResult AccessDenied()
        {
            return View();
        }


        /// <summary>
        /// Users grid page view
        /// </summary>
        /// <returns></returns>
        public IActionResult UsersList()
        {
            //validate for success message
            if (TempData.ContainsKey("NewUserStatus"))
            {
                var statusMessage = TempData["NewUserStatus"].ToString();
                if (!string.IsNullOrEmpty(statusMessage) && statusMessage == JsonResponse.RecordSaved.ToString())
                {
                    ViewBag.StatusMessage = "1";
                }
                else if (!string.IsNullOrEmpty(statusMessage) && statusMessage == JsonResponse.RecordModified.ToString())
                {
                    ViewBag.StatusMessage = "2";
                }
                else if (!string.IsNullOrEmpty(statusMessage) && statusMessage == JsonResponse.DuplicateUser.ToString())
                {
                    ViewBag.StatusMessage = "3";
                }
            }
            else
            {
                ViewBag.StatusMessage = "";
            }

            List<UserDetailsVM> users = new();
            try
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                HttpResponseMessage response = _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.GetAllUsers}").Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;
                    users = JsonConvert.DeserializeObject<List<UserDetailsVM>>(responseContent)!;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return View(users);
        }

        /// <summary>
        /// create new user view page
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult CreateNewUser()
        {
            UserRegistrationVM userRegistrationVM = new();
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);


            try
            {
                HttpResponseMessage response = _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.GetAllRoles}").Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseContent = response.Content.ReadAsStringAsync().Result;
                    var roles = JsonConvert.DeserializeObject<List<MstRolesVM>>(responseContent);
                    if (roles.Count > 0)
                    {
                        ViewBag.Roles = roles;
                    }
                }
                else
                {
                    ViewBag.Roles = new List<MstRolesVM>();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return View(userRegistrationVM);
        }

        /// <summary>
        /// create new user server post request
        /// </summary>
        /// <param name="userRegistrationVM"></param>
        /// <returns></returns>
        [HttpPost, ValidateAntiForgeryToken]
        public IActionResult CreateNewUser(UserRegistrationVM userRegistrationVM)
        {
            int status = 0;
            if (userRegistrationVM != null)
            {
                if (userRegistrationVM.Id > 0)
                {
                    userRegistrationVM.Password = "Chetu@123";
                    userRegistrationVM.ConfirmPassword = "Chetu@123";
                }
                try
                {
                    HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                    HttpResponseMessage response = _httpClient.PostAsJsonAsync($"{_apiBaseUrl}{ApiUrls.CreateUser}", userRegistrationVM).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string responseContent = response.Content.ReadAsStringAsync().Result;
                        status = JsonConvert.DeserializeObject<int>(responseContent);
                        if (status == (int)JsonResponse.RecordSaved)
                        {
                            TempData["NewUserStatus"] = JsonResponse.RecordSaved.ToString();
                            return RedirectToAction("UsersList");
                        }
                        else if (status == (int)JsonResponse.RecordModified)
                        {
                            TempData["NewUserStatus"] = JsonResponse.RecordModified.ToString();
                            return RedirectToAction("UsersList");
                        }
                        else if (status == (int)JsonResponse.DuplicateUser)
                        {
                            TempData["NewUserStatus"] = JsonResponse.DuplicateUser.ToString();
                            return RedirectToAction("UsersList");
                        }
                    }
                }
                catch (Exception)
                {

                    throw;
                }
                return View();
            }
            else
            {
                return View(userRegistrationVM);
            }
        }

        /// <summary>
        /// get user details by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> PopulateUserDetails(int userId)
        {
            UserRegistrationVM userRegistrationVM = new();
            if (userId > 0)
            {
                try
                {
                    HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                    HttpResponseMessage rolesResponse = await _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.GetAllRoles}");
                    HttpResponseMessage userResponse = await _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.GetUserDetailById.Replace("[0]", userId.ToString())}");
                    if (rolesResponse.IsSuccessStatusCode && userResponse.IsSuccessStatusCode)
                    {
                        string roleResponseContent = await rolesResponse.Content.ReadAsStringAsync();
                        string userResponseContent = await userResponse.Content.ReadAsStringAsync();
                        var roles = JsonConvert.DeserializeObject<List<MstRolesVM>>(roleResponseContent);
                        userRegistrationVM = JsonConvert.DeserializeObject<UserRegistrationVM>(userResponseContent)!;
                        if (roles.Count > 0)
                        {
                            ViewBag.Roles = roles;
                        }
                    }
                    else
                    {
                        return View("CreateNewUser", new UserRegistrationVM());

                    }
                    return View("CreateNewUser", userRegistrationVM);
                }
                catch (Exception)
                {

                    throw;
                }
            }
            else
            {
                return RedirectToAction("CreateNewUser");
            }
        }

        /// <summary>
        /// delete (soft-delete) user request
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            bool isUserDeleted = false;
            try
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                //// Create the request content
                var content = new StringContent(JsonConvert.SerializeObject(new { userId }), Encoding.UTF8, "application/json");
                HttpResponseMessage apiResponse = await _httpClient.PostAsync($"{_apiBaseUrl}{ApiUrls.DeleteUser.ToString().Replace("[0]", userId.ToString())}", content);
                apiResponse.EnsureSuccessStatusCode();
                string responseContent = await apiResponse.Content.ReadAsStringAsync();
                isUserDeleted = JsonConvert.DeserializeObject<bool>(responseContent);
            }
            catch (Exception)
            {

                throw;
            }

            return Json(isUserDeleted);
        }

        /// <summary>
        /// activate/deactivate user
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SwitchUserStatus(int userId, bool status)
        {

            bool isStatusChanged = false;
            try
            {
                HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

                var content = new StringContent(JsonConvert.SerializeObject(new { userId = userId, status = status }), Encoding.UTF8);
                HttpResponseMessage apiResponse = await _httpClient.PostAsync($"{_apiBaseUrl}{ApiUrls.SwitchUserStatus.Replace("[0]", userId.ToString()).Replace("[1]", status.ToString())}", content);
                apiResponse.EnsureSuccessStatusCode();
                string responseContent = await apiResponse.Content.ReadAsStringAsync();
                isStatusChanged = JsonConvert.DeserializeObject<bool>(responseContent);
            }
            catch (Exception)
            {

                throw;
            }

            return Json(isStatusChanged);
        }
        /// <summary>
        /// admin dashboard page
        /// </summary>
        /// <returns></returns>
        public IActionResult AdminDashboard()
        {
            DashboardViewModel dashboardVM = new() { ControllerTimeDetailsListVM = new() };
            string controllersListEndpointUrl = _apiBaseUrl + ApiUrls.GetControllerRunTimeList.Replace("[1]", "0");
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage dashboardAPIResponse = _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.AdminDashboardDetails}").Result;
            HttpResponseMessage ControllerListAPIResponse = _httpClient.GetAsync(controllersListEndpointUrl).Result;

            if (dashboardAPIResponse.IsSuccessStatusCode && ControllerListAPIResponse.IsSuccessStatusCode)
            {
                string jsonResponse = dashboardAPIResponse.Content.ReadAsStringAsync().Result;
                dashboardVM = JsonConvert.DeserializeObject<DashboardViewModel>(jsonResponse)!;

                // Deserialize the response of controllers
                string responseContent = ControllerListAPIResponse.Content.ReadAsStringAsync().Result;
                dashboardVM.ControllerTimeDetailsListVM = JsonConvert.DeserializeObject<List<ControllerTimeDetailsVM>>(responseContent)!;
            }
            return View(dashboardVM);
        }

        /// <summary>
        /// Dashboard for irrigation manager
        /// </summary>
        /// <returns></returns>
        public IActionResult IrrigationManagerDashboard()
        {
            DashboardViewModel dashboardVM = new() { ControllerTimeDetailsListVM = new() };
            string controllersListEndpointUrl = _apiBaseUrl + ApiUrls.GetControllerRunTimeList.Replace("[1]", "0");
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);

            HttpResponseMessage dashboardAPIResponse = _httpClient.GetAsync($"{_apiBaseUrl}{ApiUrls.AdminDashboardDetails}").Result;
            HttpResponseMessage ControllerListAPIResponse = _httpClient.GetAsync(controllersListEndpointUrl).Result;

            if (dashboardAPIResponse.IsSuccessStatusCode && ControllerListAPIResponse.IsSuccessStatusCode)
            {
                string jsonResponse = dashboardAPIResponse.Content.ReadAsStringAsync().Result;
                dashboardVM = JsonConvert.DeserializeObject<DashboardViewModel>(jsonResponse)!;

                //reports list data
                // Deserialize the response of controllers
                string responseContent = ControllerListAPIResponse.Content.ReadAsStringAsync().Result;
                dashboardVM.ControllerTimeDetailsListVM = JsonConvert.DeserializeObject<List<ControllerTimeDetailsVM>>(responseContent)!;
            }
            return View(dashboardVM);
        }

        /// <summary>
        /// method to filter monthly inspection bar graph data
        /// called by js
        /// </summary>
        /// <param name="year"></param>
        /// <param name="isCompleted"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult FilterMonthlyInspectionGraph(int year, bool isCompleted)
        {
            string inspectionCounts = string.Empty;
            string filterMonthlyInspectionGraphEndpointUrl = _apiBaseUrl + ApiUrls.FilterMonthlyInspectionGraph.Replace("[0]", year.ToString()).Replace("[1]", isCompleted.ToString());
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage aPIResponse = _httpClient.GetAsync(filterMonthlyInspectionGraphEndpointUrl).Result;
            if (aPIResponse.IsSuccessStatusCode)
            {
                inspectionCounts = aPIResponse.Content.ReadAsStringAsync().Result;
            }

            return Json(inspectionCounts);
        }

        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            ResetPasswordVM resetPasswordVM = new ResetPasswordVM();
            return View(resetPasswordVM);
        }

        [HttpPost, AllowAnonymous]
        public IActionResult ForgotPassword(ResetPasswordVM resetPasswordVM)
        {
            string SendResetPasswordLink = _apiBaseUrl + ApiUrls.SendResetPasswordLink.Replace("[0]", resetPasswordVM.Email);
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage aPIResponse = _httpClient.GetAsync(SendResetPasswordLink).Result;
            if (aPIResponse.IsSuccessStatusCode)
            {
                var response = aPIResponse.Content.ReadAsStringAsync().Result;
                APICustomResponse APIResponse = JsonConvert.DeserializeObject<APICustomResponse>(response)!;
                if (APIResponse == APICustomResponse.InvalidUser)
                {
                    ModelState.AddModelError("Email", Messages.UserNotExist);
                    return View(resetPasswordVM);
                }
                else if (APIResponse == APICustomResponse.ResetLinkSent)
                {
                    resetPasswordVM.Message = Messages.ResetPwdLinkSent;
                    return View(resetPasswordVM);
                }
                else if (APIResponse == APICustomResponse.ResetLinkAlreadySent)
                {
                    resetPasswordVM.Message = Messages.ResetPwdLinkSent;
                    return View(resetPasswordVM);
                }
                else
                {
                    ModelState.AddModelError("Email", Messages.ErrorMsg);
                    return View(resetPasswordVM);
                }
            }
            return View();
        }

        [HttpGet, AllowAnonymous]
        public IActionResult ResetPassword(string userEmail, bool passwordFlag)
        {
            ResetPasswordVM resetPasswordVM = new ResetPasswordVM()
            {
                Email = userEmail,
                PasswordResetFlag = passwordFlag
            };

            return View(resetPasswordVM);
        }

        [HttpPost, AllowAnonymous]
        public IActionResult ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            resetPasswordVM.Message = "test";
            string ResetPasswordAPI = _apiBaseUrl + ApiUrls.ResetPassword;
            HttpClientHelper.SetAuthorizationHeader(_httpClient, _httpContextAccessor);
            HttpResponseMessage aPIResponse = _httpClient.PostAsJsonAsync(ResetPasswordAPI, resetPasswordVM).Result;
            if (aPIResponse.IsSuccessStatusCode)
            {
                var response = aPIResponse.Content.ReadAsStringAsync().Result;
                APICustomResponse APIResponse = JsonConvert.DeserializeObject<APICustomResponse>(response)!;
                if (APIResponse == APICustomResponse.PasswordChanged)
                {
                    resetPasswordVM.Message = Messages.PasswordChanged;
                    return View(resetPasswordVM);
                }
                else
                {
                    ModelState.AddModelError("Password", Messages.ErrorMsg);
                    return View(resetPasswordVM);
                }
            }
            return View();
        }
    }
}

using PureGreenLandGroup.Models.DTO.WebAuthentication;
using PureGreenLandGroup.Models.ViewModel.Account;
using PureGreenLandGroup.Domain.UsersResources;
using PureGreenLandGroup.Models.DTO.Account;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Utility.Enums;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Security.Claims;
using System.Data;
using System.Text;
using AutoMapper;
using System;
using PureGreenLandGroup.Utility.Resources;

namespace PureGreenLandGroup.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;


        public UserService(IConfiguration configuration, IUnitOfWork unitOfWork, IUserRepository userRepository, IMapper mapper, IEmailService emailService)
        {
            _configuration = configuration;
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
            //_emailService = emailService;
        }

        /// <summary>
        /// Foe user login and to generate API token
        /// </summary>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        public async Task<ApiAuthResponse> LoginUserAsync(LoginUserVM loginUser)
        {
            ApiAuthResponse apiAuthResponse = new ApiAuthResponse();
            var user = await _userRepository.GetByUsername(loginUser.Email);
            if (user != null)
            {
                if (!user.IsActive || user.IsDeleted)
                {
                    if (user.IsDeleted)
                    {
                        apiAuthResponse.Response = string.Empty;
                        apiAuthResponse.AuthStatus = 3;//Invalid user
                    }
                    else if (!user.IsActive)
                    {
                        apiAuthResponse.Response = string.Empty;
                        apiAuthResponse.AuthStatus = 4;//Deactivate user
                    }
                }
                else
                {
                    if (user.Email == loginUser.Email && user.Password == loginUser.Password)
                    {

                        var userRole = this.FindRoleNameByRoleId(user.RoleId);
                        apiAuthResponse.Response = GenerateJwtToken(user, userRole);
                        apiAuthResponse.AuthStatus = 1; //authorized
                    }
                    else
                    {
                        apiAuthResponse.Response = string.Empty;
                        apiAuthResponse.AuthStatus = 2; //InvalidPassword
                    }
                }
            }
            else
            {
                apiAuthResponse.Response = string.Empty;
                apiAuthResponse.AuthStatus = 3;//InvalidUser
            }
            return apiAuthResponse;
        }

        public string FindRoleNameByRoleId(int roleId)
        {
            string roleName = string.Empty;
            var userRole = _unitOfWork.GetRepository<MstRoles>().List(m => m.RoleId == roleId).FirstOrDefault();
            if (userRole != null)
            {
                roleName = userRole.RoleName;
            }
            return roleName;
        }
        /// <summary>
        /// to generate JWT token
        /// </summary>
        /// <param name="userDetails"></param>
        /// <returns></returns>
        public string GenerateJwtToken(MstUsersDetails userDetails, string roleName)
        {
            string secretKey = _configuration["JWT:Key"];
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, userDetails.Email),
                    new Claim(ClaimTypes.Name, userDetails.FirstName + " " + userDetails.LastName),
                    new Claim(ClaimTypes.Role, roleName),
                    new Claim(ClaimTypes.Sid,userDetails.Id.ToString()
                    )
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public async Task<int> CreateNewUser(UserRegistrationVM userRegistrationVM)
        {
            try
            {
                int status = 0;
                if (userRegistrationVM.Id > 0)
                {
                    var user = await _userRepository.GetById(userRegistrationVM.Id);
                    if (user != null)
                    {
                        user.FirstName = userRegistrationVM.FirstName;
                        user.LastName = userRegistrationVM.LastName;
                        user.PrimaryPhone = userRegistrationVM.Phone;
                        user.MobilePhone = userRegistrationVM.Phone;
                        _userRepository.Update(user);

                        await _unitOfWork.CommitAsync();
                        status = (Int32)JsonResponse.RecordModified;
                    }
                    else
                    {
                        status = (Int32)JsonResponse.RecordNotFound;
                    }
                }
                else
                {
                    MstUsersDetails newUser = new();
                    newUser.FirstName = userRegistrationVM.FirstName;
                    newUser.LastName = userRegistrationVM.LastName;
                    newUser.Email = userRegistrationVM.Email;
                    newUser.CompanyName = "PureGreen";
                    newUser.PrimaryPhone = userRegistrationVM.Phone;
                    newUser.MobilePhone = userRegistrationVM.Phone;
                    newUser.IsActive = true;
                    newUser.ContactTagList = string.Empty;
                    newUser.ContactType = string.Empty;
                    newUser.CreatedByUser = string.Empty;
                    newUser.CreatedDate = DateOnly.FromDateTime(DateTime.UtcNow);
                    newUser.EmployeeNumber = 0;
                    newUser.Title = string.Empty;
                    newUser.Password = userRegistrationVM.Password;
                    newUser.RoleId = userRegistrationVM.RoleId;
                    _userRepository.Add(newUser);
                    await _unitOfWork.CommitAsync();
                    if (newUser.Id > 0)
                    {
                        status = (Int32)JsonResponse.RecordSaved;
                    }
                    else
                    {
                        status = (Int32)JsonResponse.Failed;
                    }
                }
                return status;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<UserDetailsVM>> GetUsers(IConfiguration configuration)
        {
            try
            {
                List<UserDetailsVM> usersList = new();
                var connectionStr = configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection connection = new(connectionStr))
                {
                    using (SqlCommand query = new("[dbo].[usp_GetUsersList]", connection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;

                        // Open the connection
                        connection.Open();
                        // Execute the command
                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())
                            {
                                UserDetailsVM userDetailsVM = new()
                                {
                                    Id = data.GetInt32(data.GetOrdinal("Id")),
                                    FirstName = data.IsDBNull(data.GetOrdinal("FirstName")) ? null : data.GetString(data.GetOrdinal("FirstName")),
                                    LastName = data.IsDBNull(data.GetOrdinal("LastName")) ? null : data.GetString(data.GetOrdinal("LastName")),
                                    Email = data.IsDBNull(data.GetOrdinal("Email")) ? null : data.GetString(data.GetOrdinal("Email")),
                                    Phone = data.IsDBNull(data.GetOrdinal("Phone")) ? null : data.GetString(data.GetOrdinal("Phone")),
                                    IsActive = !data.IsDBNull(data.GetOrdinal("IsActive")) && data.GetBoolean(data.GetOrdinal("IsActive")),
                                    CreatedDate = data.IsDBNull(data.GetOrdinal("CreatedDate")) ? null : DateOnly.FromDateTime(data.GetDateTime(data.GetOrdinal("CreatedDate"))),
                                    Role = data.IsDBNull(data.GetOrdinal("Role")) ? null : data.GetString(data.GetOrdinal("Role")),

                                };
                                usersList.Add(userDetailsVM);
                            }
                        }
                        // Open the connection
                        await connection.CloseAsync();
                    }
                }
                return usersList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<MstRolesVM>> GetMstRoles()
        {
            List<MstRolesVM> roleList = new();
            try
            {
                var roles = _unitOfWork.GetRepository<MstRoles>().List(m => m.RoleId > 0).ToList();
                if (roles.Count > 0)
                {
                    roleList = _mapper.Map<List<MstRolesVM>>(roles);
                }
            }
            catch (Exception)
            {

                throw;
            }
            return roleList;
        }

        public async Task<UserRegistrationVM> GetUserDetails(int userId)
        {
            UserRegistrationVM userRegistrationVM = new();
            try
            {
                var userDetails = await _userRepository.GetById(userId);

                //var userDetails = _context.MstUsersDetails.Where(m => m.Id == userId).FirstOrDefault();
                if (userDetails != null)
                {
                    userRegistrationVM = _mapper.Map<UserRegistrationVM>(userDetails);
                    userRegistrationVM.Phone = userDetails.MobilePhone;
                }
                return userRegistrationVM;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> IsUserExist(string email)
        {
            bool isExist = false;
            try
            {
                var user = await _userRepository.GetByUsername(email);
                //var user = await _context.MstUsersDetails.Where(m => m.Email == email).FirstOrDefaultAsync();
                if (user != null && user.Id > 0)
                {
                    isExist = true;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return isExist;
        }

        public async Task<bool> DeleteUser(int userId)
        {
            bool isDeleted = false;
            try
            {
                var user = await _userRepository.GetById(userId);

                //var user = _context.MstUsersDetails.Where(m => m.Id == userId).FirstOrDefault();
                if (user != null && user.Id > 0)
                {
                    user.IsDeleted = true;
                    _userRepository.Update(user);
                    await _unitOfWork.CommitAsync();
                    isDeleted = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return isDeleted;
        }

        public async Task<bool> SwitchUserStatus(int userId, bool status)
        {
            bool isStatusChanged = false;
            try
            {
                var user = await _userRepository.GetById(userId);
                //var user = _context.MstUsersDetails.Where(m => m.Id == userId).FirstOrDefault();
                if (user != null && user.Id > 0)
                {
                    if (status)
                    {
                        user.IsActive = false;
                    }
                    else
                    {
                        user.IsActive = true;
                    }
                    _userRepository.Update(user);
                    await _unitOfWork.CommitAsync();
                    isStatusChanged = true;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return isStatusChanged;

        }

        public async Task<DashboardViewModel> AdminDashboardDetails(IConfiguration configuration)
        {
            DashboardViewModel dashboardVM = new();
            try
            {
                RuntimeWeekVM runtimeWeekVM = GetRuntimeChartWeeksInterval();

                var connection = configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection sqlConnection = new(connection))
                {
                    using (SqlCommand query = new("[dbo].[usp_AdminDashboardStatistics]", sqlConnection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;

                        // Assuming you have a SqlCommand object named query
                        query.Parameters.AddWithValue("@W1StartDate", runtimeWeekVM.W1StartDate);
                        query.Parameters.AddWithValue("@W1EndDate", runtimeWeekVM.W1EndDate);
                        query.Parameters.AddWithValue("@W2StartDate", runtimeWeekVM.W2StartDate);
                        query.Parameters.AddWithValue("@W2EndDate", runtimeWeekVM.W2EndDate);
                        query.Parameters.AddWithValue("@W3StartDate", runtimeWeekVM.W3StartDate);
                        query.Parameters.AddWithValue("@W3EndDate", runtimeWeekVM.W3EndDate);
                        query.Parameters.AddWithValue("@W4StartDate", runtimeWeekVM.W4StartDate);
                        query.Parameters.AddWithValue("@W4EndDate", runtimeWeekVM.W4EndDate);
                        query.Parameters.AddWithValue("@W5StartDate", runtimeWeekVM.W5StartDate);
                        query.Parameters.AddWithValue("@W5EndDate", runtimeWeekVM.W5EndDate);

                        // Open the connection
                        sqlConnection.Open();
                        // Execute the command
                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())
                            {
                                dashboardVM = new()
                                {
                                    FaultyZone = data.GetInt64(data.GetOrdinal("FaultyZone")),
                                    NonFaultyZone = data.GetInt64(data.GetOrdinal("NonFaultyZone")),
                                    TotalZone = data.GetInt64(data.GetOrdinal("TotalZone")),
                                    TotalProperty = data.GetInt64(data.GetOrdinal("TotalProperty")),
                                    TotalController = data.GetInt64(data.GetOrdinal("TotalController")),
                                    TotalWeeklyRuntimeMinutes = data.GetInt64(data.GetOrdinal("TotalWeeklyRuntimeMinutes")),

                                    TotalInspection = data.GetInt64(data.GetOrdinal("TotalInspection")),
                                    DraftInspection = data.GetInt64(data.GetOrdinal("DraftInspection")),
                                    CompleteInspection = data.GetInt64(data.GetOrdinal("CompleteInspection")),

                                    TotalManufacturer = data.GetInt64(data.GetOrdinal("TotalManufacturer")),
                                    TotalModel = data.GetInt64(data.GetOrdinal("TotalModel")),
                                    TotalPlantType = data.GetInt64(data.GetOrdinal("TotalPlantType")),
                                    TotalSoilType = data.GetInt64(data.GetOrdinal("TotalSoilType")),
                                    TotalSprinklers = data.GetInt64(data.GetOrdinal("TotalSprinklers")),
                                    TotalValveSize = data.GetInt64(data.GetOrdinal("TotalValveSize")),
                                    TotalSeasonalAdjustMonth = data.GetInt64(data.GetOrdinal("TotalSeasonalAdjustMonth")),
                                    TotalProgramRuntime = data.GetInt64(data.GetOrdinal("TotalProgramRuntime")),
                                    CompletedInspectionOfYear = data.IsDBNull(data.GetOrdinal("CompletedInspectionOfYear")) ? null : data.GetString(data.GetOrdinal("CompletedInspectionOfYear")),
                                    WeeklyRuntime = data.IsDBNull(data.GetOrdinal("WeeklyRuntime")) ? null : data.GetString(data.GetOrdinal("WeeklyRuntime")),
                                };
                            }
                        }
                        // Open the connection
                        await sqlConnection.CloseAsync();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return dashboardVM;
        }

        private RuntimeWeekVM GetRuntimeChartWeeksInterval()
        {
            RuntimeWeekVM runtimeWeekVM = new RuntimeWeekVM();
            try
            {
                // Get the current date
                DateTime today = DateTime.Now;

                // Calculate the start and end dates for the current week
                int currentDayOfWeek = (int)today.DayOfWeek;
                runtimeWeekVM.W5StartDate = today.AddDays(-currentDayOfWeek);
                runtimeWeekVM.W5EndDate = runtimeWeekVM.W5StartDate.AddDays(6);

                // Calculate the start and end dates for the previous weeks
                runtimeWeekVM.W4StartDate = runtimeWeekVM.W5StartDate.AddDays(-7);
                runtimeWeekVM.W4EndDate = runtimeWeekVM.W4StartDate.AddDays(6);

                runtimeWeekVM.W3StartDate = runtimeWeekVM.W4StartDate.AddDays(-7);
                runtimeWeekVM.W3EndDate = runtimeWeekVM.W3StartDate.AddDays(6);

                runtimeWeekVM.W2StartDate = runtimeWeekVM.W3StartDate.AddDays(-7);
                runtimeWeekVM.W2EndDate = runtimeWeekVM.W2StartDate.AddDays(6);

                runtimeWeekVM.W1StartDate = runtimeWeekVM.W2StartDate.AddDays(-7);
                runtimeWeekVM.W1EndDate = runtimeWeekVM.W1StartDate.AddDays(6);
            }
            catch (Exception)
            {

                throw;
            }
            return runtimeWeekVM;
        }

        public async Task<string> FilterMonthlyInspectionGraph(IConfiguration configuration, int year, bool isCompleted)
        {
            string output = string.Empty;
            var conncection = configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection connection = new(conncection))
            {
                using (SqlCommand query = new("[dbo].[usp_FilterMonthlyInspectionGraph]", connection))
                {
                    // Set command type to stored procedure
                    query.CommandType = CommandType.StoredProcedure;
                    query.Parameters.AddWithValue("@Year", year);
                    query.Parameters.AddWithValue("@IsCompleted", isCompleted);

                    // Open the connection
                    connection.Open();
                    // Execute the command
                    using (var data = query.ExecuteReader())
                    {
                        while (data.Read())
                        {
                            output = data.IsDBNull(data.GetOrdinal("InspectionCounts")) ? null : data.GetString(data.GetOrdinal("InspectionCounts"));
                        }
                    }
                    // Open the connection
                    await connection.CloseAsync();
                }
            }
            return output;
        }

        public APICustomResponse SendResetPasswordLink(string Email)
        {
            if (!string.IsNullOrEmpty(Email))
            {
                var userRepo = _unitOfWork.GetRepository<MstUsersDetails>();
                var userDetails = userRepo.List(m => m.Email.ToLower() == Email.ToLower()).FirstOrDefault();
                if (userDetails != null)
                {
                    //check if the link is already generated i.e if flag is 1
                    if (userDetails.PasswordResetFlag)
                    {
                        //show user to link is already there
                        return APICustomResponse.ResetLinkAlreadySent;
                    }
                    else
                    {

                        // Path to the HTML email template
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "ResetPasswordTemplate.html");

                        // Read the HTML file as a string
                        string body = File.ReadAllTextAsync(filePath).Result;

                        var resetLink = $"https://localhost:7142/Account/ResetPassword?userEmail={userDetails.Email}&passwordFlag={true}";

                        //add username
                        body = body.Replace("[0]", $"{userDetails.FirstName} {userDetails.LastName}");
                        body = body.Replace("[1]", $"{resetLink}");

                        //sent the reset password email
                        var isEmailSent = _emailService.SendEmailAsync(new List<string>() { Email }, "Reset Password", body, null).Result;
                        if (isEmailSent)
                        {
                            //update the password flag to 1 which indicates password is ready to change
                            userDetails.PasswordResetFlag = true;
                            _unitOfWork.Commit();
                        }
                        return APICustomResponse.ResetLinkSent;
                    }
                }
                else
                {
                    return APICustomResponse.InvalidUser;
                }
            }
            return APICustomResponse.InvalidUser;
        }

        public APICustomResponse ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            if (resetPasswordVM != null)
            {
                var userRepo = _unitOfWork.GetRepository<MstUsersDetails>();
                var userDetails = userRepo.List(m => m.Email.ToLower() == resetPasswordVM.Email.ToLower()).FirstOrDefault();
                if (userDetails != null && userDetails.PasswordResetFlag)
                {
                    userDetails.PasswordResetFlag = false;
                    userDetails.Password = resetPasswordVM.Password;
                    _unitOfWork.Commit();
                    return APICustomResponse.PasswordChanged;
                }
                else
                {
                    return APICustomResponse.Error;
                }
            }
            return APICustomResponse.Error;
        }

        public async Task<bool> UpdateUserRole(int userId, int roleId)
        {
            try
            {
                var user = await _userRepository.GetById(userId);
                if (user != null)
                {
                    user.RoleId = roleId;
                    _userRepository.Update(user);
                    await _unitOfWork.CommitAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> BulkDeleteUsers(List<int> userIds)
        {
            try
            {
                foreach (var userId in userIds)
                {
                    var user = await _userRepository.GetById(userId);
                    if (user != null)
                    {
                        _userRepository.Delete(user);
                    }
                }
                await _unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.DTO.Account;
using PureGreenLandGroup.Models.DTO.WebAuthentication;
using PureGreenLandGroup.Models.ViewModel.Account;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Utility.Enums;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IWebHostEnvironment;
using PureGreenLandGroup.Infrastructure.Repositories;
using PureGreenLandGroup.Domain.UsersResources;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;
        private readonly IUserRepository _userRepository;

        public UserController(
            IUserService userService,
            IConfiguration configuration,
            IHostingEnvironment environment,
            IUserRepository userRepository)
        {
            _userService = userService;
            _configuration = configuration;
            _environment = environment;
            _userRepository = userRepository;
        }

        [HttpGet("AdminDashboardDetails")]
        public async Task<DashboardViewModel> AdminDashboardDetails()
        {
            return await _userService.AdminDashboardDetails(_configuration);
        }

        [HttpGet("FilterMonthlyInspectionGraph")]
        public async Task<string> FilterMonthlyInspectionGraph(int year, bool isCompleted)
        {
            return await _userService.FilterMonthlyInspectionGraph(_configuration, year, isCompleted);
        }

        // ✅ Returns the active user list mapped to frontend view model
        [HttpGet("GetAllActiveUsers")]
        public async Task<ActionResult<List<UserDetailsVM>>> GetAllActiveUsers()
        {
            try
            {
                var users = await _userRepository.GetUsers();

                var result = users.Select(u => new UserDetailsVM
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Phone = u.PrimaryPhone ?? u.MobilePhone,
                    IsActive = u.IsActive,
                    CreatedDate = u.CreatedDate,
                    Role = u.MstRoles?.RoleName
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to fetch users: {ex.Message}");
            }
        }

        [HttpPost("CreateNewUser")]
        public async Task<int> CreateNewUser(UserRegistrationVM userRegistrationVM)
        {
            int status = 0;
            if (userRegistrationVM != null)
            {
                status = await _userService.CreateNewUser(userRegistrationVM);
            }
            return status;
        }

        [HttpGet("GetAllRoles")]
        public async Task<List<MstRolesVM>> GetRoles()
        {
            return await _userService.GetMstRoles();
        }

        [HttpGet("GetUserDetailById")]
        public async Task<UserRegistrationVM> GetUserDetailById(int userId)
        {
            return await _userService.GetUserDetails(userId);
        }

        [HttpGet("IsUserExist")]
        public async Task<bool> CheckUserExistance(string email)
        {
            return await _userService.IsUserExist(email);
        }

        [HttpPost("DeleteUser")]
        public async Task<bool> DeleteUser(int userId)
        {
            return await _userService.DeleteUser(userId);
        }

        [HttpPost("SwitchUserStatus")]
        public async Task<bool> SwitchUserStatus(int userId, bool status)
        {
            return await _userService.SwitchUserStatus(userId, status);
        }

        [AllowAnonymous]
        [HttpGet("SendResetPasswordLink")]
        public APICustomResponse SendResetPasswordLink(string email)
        {
            return _userService.SendResetPasswordLink(email);
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public APICustomResponse ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            return _userService.ResetPassword(resetPasswordVM);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole(int userId, int roleId)
        {
            bool result = await _userService.UpdateUserRole(userId, roleId);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("BulkDeleteUsers")]
        public async Task<IActionResult> BulkDeleteUsers([FromBody] List<int> userIds)
        {
            bool result = await _userService.BulkDeleteUsers(userIds);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}

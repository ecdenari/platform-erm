using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Models.DTO.Account;
using PureGreenLandGroup.Models.DTO.WebAuthentication;
using PureGreenLandGroup.Models.ViewModel.Account;
using PureGreenLandGroup.Utility.Enums;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IUserService
    {
        Task<DashboardViewModel> AdminDashboardDetails(IConfiguration configuration);
        Task<string> FilterMonthlyInspectionGraph(IConfiguration configuration, int year, bool isCompleted);

        Task<ApiAuthResponse> LoginUserAsync(LoginUserVM loginUser);

        Task<List<UserDetailsVM>> GetUsers(IConfiguration configuration);

        Task<int> CreateNewUser(UserRegistrationVM userRegistrationVM);


        Task<List<MstRolesVM>> GetMstRoles();

        Task<UserRegistrationVM> GetUserDetails(int userId);

        Task<bool> IsUserExist(string email);

        Task<bool> DeleteUser(int userId);

        Task<bool> SwitchUserStatus(int userId, bool status);

        string FindRoleNameByRoleId(int roleId);

        APICustomResponse SendResetPasswordLink(string Email);
        APICustomResponse ResetPassword(ResetPasswordVM resetPasswordVM);

        Task<bool> UpdateUserRole(int userId, int roleId);
        Task<bool> BulkDeleteUsers(List<int> userIds);

    }
}

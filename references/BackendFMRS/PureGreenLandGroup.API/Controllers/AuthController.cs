using PureGreenLandGroup.Models.DTO.WebAuthentication;
using PureGreenLandGroup.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUserVM loginUser)
        {
            ApiAuthResponse apiAuthResponse = new ApiAuthResponse();
            try
            {
                apiAuthResponse = await _userService.LoginUserAsync(loginUser);
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(apiAuthResponse);
        }
    }
}



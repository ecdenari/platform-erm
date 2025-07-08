using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.DTO.SP_Models;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ControllersHandler : ControllerBase
    {
        private readonly IControllerService _controllerService;
        private readonly IConfiguration _configuration;
        private readonly IPropertiesService _propertiesService;
        private readonly IMasterDataHandlerService _masterDataHandlerService;

        public ControllersHandler(IControllerService controllerService, IConfiguration configuration, IPropertiesService propertiesService, IMasterDataHandlerService masterDataHandlerService)
        {
            _controllerService = controllerService;
            _configuration = configuration;
            _propertiesService = propertiesService;
            _masterDataHandlerService = masterDataHandlerService;
        }
        [HttpGet("GetControllerList")]
        public async Task<List<ControllerListVM>> GetControllerList(int propertyId, bool isAdminLoggedIn)
        {
            try
            {
                return await _controllerService.ControllerList(_configuration, propertyId, isAdminLoggedIn);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("CreateControllerPageData")]
        public async Task<CreateControllerViewModel> CreateController(int propertyId)
        {
            try
            {
                return await _controllerService.CreateControllerPageData(propertyId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("CreateController")]
        public async Task<int> CreateSiteController([FromBody] CreateControllerViewModel createControllerViewModel)
        {
            return await _controllerService.CreateNewController(createControllerViewModel);
        }

        [HttpPost("ModifyControllerDetails")]
        public async Task<bool> ModifyControllerDetails([FromBody] CreateControllerViewModel createControllerViewModel)
        {
            return await _controllerService.ModifyControllerDetails(createControllerViewModel);
        }


        [HttpGet("GetControllerDetailsById")]
        public async Task<CreateControllerViewModel> GetControllerDetails(int controllerId)
        {
            try
            {
                return await _controllerService.GetControllerDetails(controllerId);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

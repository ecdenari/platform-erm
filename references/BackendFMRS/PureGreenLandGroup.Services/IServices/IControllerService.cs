using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Models.DTO.SP_Models;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IControllerService
    {

        /// <summary>
        /// returns the controller list for the controller grid
        /// </summary>
        /// <returns></returns>
        Task<List<ControllerListVM>> ControllerList(IConfiguration configuration, int propertyId, bool isAdminLoggedIn);

        /// <summary>
        /// get the create controller form master data
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        Task<CreateControllerViewModel> CreateControllerPageData(int propertyId);

        /// <summary>
        /// create new controller data
        /// </summary>
        /// <param name="createControllerViewModel"></param>
        /// <returns></returns>
        Task<int> CreateNewController(CreateControllerViewModel createControllerViewModel);

        /// <summary>
        /// modify the controller data
        /// </summary>
        /// <param name="createControllerViewModel"></param>
        /// <returns></returns>
        Task<bool> ModifyControllerDetails(CreateControllerViewModel createControllerViewModel);

        /// <summary>
        /// get the controller details by the controller id 
        /// to populate the controller data on the edit controller form
        /// </summary>
        /// <param name="controllerId"></param>
        /// <returns></returns>
        Task<CreateControllerViewModel> GetControllerDetails(int controllerId);


    }
}

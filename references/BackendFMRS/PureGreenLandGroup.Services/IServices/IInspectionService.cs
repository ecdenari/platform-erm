using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Utility.Enums;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IInspectionService
    {
        /// <summary>
        /// returns the data for the inspection create page
        /// </summary>
        /// <param name="controllerId"></param>
        /// <returns></returns>
        Task<InspectionMasterViewModel> GetInspectionMasterPageDetails(int controllerId);

        /// <summary>
        /// manage the create and the update inspection event
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        Task<int> InspectionHandler(CreateInspectionViewModel createInspectionViewModel);

        /// <summary>
        /// returns the inspection list data for the inspection grid page
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="inspectionStatus"></param>
        /// <returns></returns>
        Task<List<InspectionList>> GetInspectionList(int userId, int inspectionStatus);

        /// <summary>
        /// returns the zone details by zone id
        /// </summary>
        /// <param name="zoneId"></param>
        /// <returns></returns>
        Task<ZoneIssuesMasterViewModel> GetZoneDetailsByZoneId(int zoneId);

        /// <summary>
        /// returns the inspection all details by inspection id
        /// </summary>
        /// <param name="inspectionId"></param>
        /// <returns></returns>
        Task<InspectionMasterViewModel> GetInspectionDetailsById(int inspectionId);


        /// <summary>
        /// create new inspection
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        Task<bool> CreateNewInspection(CreateInspectionViewModel createInspectionViewModel);

        /// <summary>
        /// update the inspection
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        Task<bool> ModifyInspectionDetails(CreateInspectionViewModel createInspectionViewModel);


        JsonResponse UpdateInspectionSeasonalAdjust(List<SeasionalAdjustViewModel> seasonalAdjustVMList, int controllerId);

    }
}

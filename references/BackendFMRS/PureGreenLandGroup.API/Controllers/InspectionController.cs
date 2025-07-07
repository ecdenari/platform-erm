using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Utility.Enums;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InspectionController : ControllerBase
    {
        private readonly IInspectionService _inspectionService;
        public InspectionController(IInspectionService inspectionService)
        {
            _inspectionService = inspectionService;
        }

        [HttpGet("GetCreateInspectionData")]
        public async Task<InspectionMasterViewModel> GetInspectionMasterPageDetails(int controllerId)
        {
            try
            {
                return await _inspectionService.GetInspectionMasterPageDetails(controllerId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("CreateNewInspection")]
        public async Task<int> CreateInspection([FromBody] CreateInspectionViewModel createInspectionViewModel)
        {
            try
            {
                return await _inspectionService.InspectionHandler(createInspectionViewModel);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("GetUserInspectionList")]
        public async Task<List<InspectionList>> GetInspectionList(int userId, int inspectionStatus = 0)
        {
            return await _inspectionService.GetInspectionList(userId, inspectionStatus);
        }

        [HttpGet("GetZoneDetailsByZoneId")]
        public async Task<ZoneIssuesMasterViewModel> GetZoneDetails(int zoneId)
        {
            return await _inspectionService.GetZoneDetailsByZoneId(zoneId);
        }

        [HttpGet("GetInspectionDetailsToPopulate")]
        public async Task<InspectionMasterViewModel> GetInspectionDetailsById(int inspectionId)
        {
            try
            {
                return await _inspectionService.GetInspectionDetailsById(inspectionId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UpdateInspectionSeasonalAdjust")]
        public JsonResponse UpdateInspectionSeasonalAdjust(List<SeasionalAdjustViewModel> seasonalAdjustVMList, int controllerId)
        {
            return _inspectionService.UpdateInspectionSeasonalAdjust(seasonalAdjustVMList, controllerId);   
        }


    }
}

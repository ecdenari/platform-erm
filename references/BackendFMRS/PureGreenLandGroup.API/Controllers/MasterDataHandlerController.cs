using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using PureGreenLandGroup.Utility.Enums;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace PureGreenLandGroup.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class MasterDataHandlerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public MasterDataHandlerController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }


        /// <summary>
        /// API to get master data of program start time
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetProgramStartTimeMasterData")]
        public List<ProgramStartTimeViewModel> GetProgramStartTimeMasterData()
        {
            return _masterDataHandlerService.GetProgramStartTimeMasterList();
        }


        /// <summary>
        /// API to get master data of plant types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPlantsList")]
        public List<PlantTypeViewModel> GetPlantsMasterData()
        {
            return _masterDataHandlerService.GetPlantsMasterList();
        }

        /// <summary>
        /// API to get master data of water sources  
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetWaterSourceMasterData")]
        public List<WaterSourceViewModel> GetWaterSourceMasterData()
        {
            return _masterDataHandlerService.GetWaterSourceMasterList();
        }



        [HttpGet("GetMasterDataStatistics")]
        public AdminPanelStatisticsVM GetMasterDataStatistics()
        {
            return _masterDataHandlerService.GetMasterDataStatistics();
        }

        [HttpGet("ChangeMasterEntitiesStatus")]
        public JsonResponse ChangeMasterEntitiesStatus(int id, bool status, MasterEntityType masterEntityType)
        {
            var response = _masterDataHandlerService.ChangeMasterEntitiesStatus(id, status, masterEntityType);
            if (response)
            {
                return JsonResponse.RecordModified;
            }
            else
            {
                return JsonResponse.Failed;
            }
        }

        /// <summary>
        /// returns the master data for the controller dynamic new zone
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMasterDataForDynamicZone")]
        public ContollerMasterViewModel GetMasterDataForDynamicZone()
        {
            return _masterDataHandlerService.GetMasterDataForDynamicZone();
        }

        [HttpGet("MappingPageData")]
        public CatalogMappingVM MappingPageData()
        {
            return _masterDataHandlerService.MappingPageData();
        }

        [HttpPost("CreateCatalogInputs")]
        public JsonResponse CreateCatalogInputs(CatalogMappingVM catalogMappingVM)
        {
            return _masterDataHandlerService.CreateUpdateCatalogInputs(catalogMappingVM);
        }

        [HttpPost("UpdateCatalogInputs")]
        public JsonResponse GetSavedMappingData(CatalogMappingVM catalogMappingVM)
        {
            return _masterDataHandlerService.CreateUpdateCatalogInputs(catalogMappingVM);
        }

            }
}

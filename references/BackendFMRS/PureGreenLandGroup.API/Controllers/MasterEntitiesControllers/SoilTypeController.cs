using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoilTypeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public SoilTypeController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }

        /// <summary>
        /// API to get master data of soil types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("SoilTypeList")]
        public List<SoilTypeViewModel> GetSoilTypeMasterData()
        {
            return _masterDataHandlerService.GetSoilTypeMasterList();
        }

        /// <summary>
        /// API to get master data of soil types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("SoilType")]
        public SoilTypeViewModel GetSoilType(int id)
        {
            return _masterDataHandlerService.GetSoilType(id);
        }


        /// <summary>
        /// create new soil type
        /// </summary>
        /// <param name="soilTypeVM"></param>
        /// <returns></returns>
        [HttpPost("CreateSoilType")]
        public IActionResult CreateNewSoilType(SoilTypeViewModel soilTypeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSoilType(soilTypeVM);
            if (modelResponse)
            {
                return Ok(modelResponse);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// create new soil type
        /// </summary>
        /// <param name="soilTypeVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateSoilType")]
        public IActionResult UpdateSoilType(SoilTypeViewModel soilTypeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSoilType(soilTypeVM);
            if (modelResponse)
            {
                return Ok(modelResponse);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

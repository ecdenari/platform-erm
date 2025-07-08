using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantTypeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public PlantTypeController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        /// <summary>
        /// API to get master data of plant types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("PlantTypeList")]
        public List<PlantTypeViewModel> GetPlantsMasterData()
        {
            return _masterDataHandlerService.GetPlantsMasterList();
        }

        /// <summary>
        /// to get plant type details by id
        /// </summary>
        /// <param name="plantId"></param>
        /// <returns></returns>
        [HttpGet("GetPlantType")]
        public PlantTypeViewModel GetPlantType(int id)
        {
            return _masterDataHandlerService.GetPlantType(id);
        }

        /// <summary>
        /// create new plant typee
        /// </summary>
        /// <param name="plantTypeVM"></param>
        /// <returns></returns>
        [HttpPost("CreatePlantType")]
        public IActionResult CreateNewPlant(PlantTypeViewModel plantTypeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdatePlantType(plantTypeVM);
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
        /// update plant type details
        /// </summary>
        /// <param name="plantTypeVM"></param>
        /// <returns></returns>
        [HttpPut("UpdatePlantType")]
        public IActionResult UpdatePlant(PlantTypeViewModel plantTypeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdatePlantType(plantTypeVM);
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

using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SprinklersController : ControllerBase
    {

        #region CTOR
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public SprinklersController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        #endregion CTOR

        /// <summary>
        /// API to get master data of sprinklers types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("SprinklerList")]
        public List<SprinklerTypesViewModel> GetSprinklersMasterData()
        {
            return _masterDataHandlerService.GetSprinklersMasterList();
        }

        /// <summary>
        /// API to get master data of sprinklers types 
        /// </summary>
        /// <returns></returns>
        [HttpGet("Sprinkler")]
        public SprinklerTypesViewModel GetSprinklers(int id)
        {
            return _masterDataHandlerService.GetSprinkler(id);
        }



        /// <summary>
        /// create new sprinkler 
        /// </summary>
        /// <param name="sprinklerTypesVM"></param>
        /// <returns></returns>
        [HttpPost("CreateSprinkler")]
        public IActionResult CreateNewSprinklerType(SprinklerTypesViewModel sprinklerTypesVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSprinklerType(sprinklerTypesVM);
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
        /// create new sprinkler 
        /// </summary>
        /// <param name="sprinklerTypesVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateSprinkler")]
        public IActionResult UpdateSprinklerType(SprinklerTypesViewModel sprinklerTypesVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSprinklerType(sprinklerTypesVM);
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

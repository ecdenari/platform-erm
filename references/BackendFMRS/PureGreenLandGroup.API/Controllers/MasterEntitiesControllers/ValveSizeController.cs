using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValveSizeController : ControllerBase
    {
        #region CTOR
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public ValveSizeController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        #endregion CTOR

        /// <summary>
        /// API to get master data of valve sizes  
        /// </summary>
        /// <returns></returns>
        [HttpGet("ValveSizeList")]
        public List<ValveSizeViewModel> GetValveSizeMasterData()
        {
            return _masterDataHandlerService.GetValveSizeMasterList();
        }

        /// <summary>
        /// get valve size record by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("ValveSize")]
        public ValveSizeViewModel GetValveSize(int id)
        {
            return _masterDataHandlerService.GetValveSize(id);
        }

        /// <summary>
        /// create new valve size
        /// </summary>
        /// <param name="valveSizeVM"></param>
        /// <returns></returns>
        [HttpPost("CreateValveSize")]
        public IActionResult CreateNewValveSize(ValveSizeViewModel valveSizeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateValveSize(valveSizeVM);
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
        /// update new valve size
        /// </summary>
        /// <param name="valveSizeVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateValveSize")]
        public IActionResult UpdateValveSize(ValveSizeViewModel valveSizeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateValveSize(valveSizeVM);
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

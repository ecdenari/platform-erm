using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramRuntimeController : ControllerBase
    {

        #region CTOR
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public ProgramRuntimeController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        #endregion CTOR

        /// <summary>
        /// API to get master data of program run time
        /// </summary>
        /// <returns></returns>
        [HttpGet("ProgramRuntimeList")]
        public List<ProgramRunTimeViewModel> GetProgramRunTimeMasterData()
        {
            return _masterDataHandlerService.GetProgramRunTimeMasterList();
        }

        /// <summary>
        ///get program run time by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("ProgramRuntime")]
        public ProgramRunTimeViewModel GetProgramRuntime(int id)
        {
            return _masterDataHandlerService.GetProgramRuntime(id);
        }

        /// <summary>
        /// create new progrma runtime
        /// </summary>
        /// <param name="ProgramRunTimeVM"></param>
        /// <returns></returns>
        [HttpPost("CreateProgramRuntime")]
        public IActionResult CreateNewProgramRuntime(ProgramRunTimeViewModel ProgramRunTimeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateZoneRunTime(ProgramRunTimeVM);
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
        /// create new progrma runtime
        /// </summary>
        /// <param name="ProgramRunTimeVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateProgramRuntime")]
        public IActionResult UpdateProgramRuntime(ProgramRunTimeViewModel ProgramRunTimeVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateZoneRunTime(ProgramRunTimeVM);
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

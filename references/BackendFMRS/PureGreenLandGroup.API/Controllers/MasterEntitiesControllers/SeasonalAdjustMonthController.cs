using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonalAdjustMonthController : ControllerBase
    {
        #region CTOR
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public SeasonalAdjustMonthController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        #endregion CTOR

        /// <summary>
        /// API to get master data of seasonal adjust dropdown 
        /// </summary>
        /// <returns></returns>
        [HttpGet("SeasonalAdjustMonthList")]
        public List<SeasonalAdjustDropdownViewModel> GetSeasonalAdjustDropdownMasterData()
        {
            return _masterDataHandlerService.GetSeasonalAdjustDropdownMasterList();
        }

        /// <summary>
        /// get seasonal adjust month by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("SeasonalAdjustMonth")]
        public SeasonalAdjustDropdownViewModel GetSeasonalAdjustMonth(int id)
        {
            return _masterDataHandlerService.GetSeasonalAdjustDropdownValue(id);
        }

        /// <summary>
        /// create new seasonal adjust month value
        /// </summary>
        /// <param name="seasonalAdjustDropdownVM"></param>
        /// <returns></returns>
        [HttpPost("CreateSeasonalAdjustMonth")]
        public IActionResult CreateNewSeasonalAdjust(SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSeasonalAdjustValue(seasonalAdjustDropdownVM);
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
        /// updateseasonal adjust month value
        /// </summary>
        /// <param name="seasonalAdjustDropdownVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateSeasonalAdjustMonth")]
        public IActionResult UpdateSeasonalAdjustMonth(SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateSeasonalAdjustValue(seasonalAdjustDropdownVM);
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

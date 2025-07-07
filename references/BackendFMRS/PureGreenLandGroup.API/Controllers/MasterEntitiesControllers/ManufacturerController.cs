using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public ManufacturerController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }
        /// <summary>
        /// API to get master data of manufacturers 
        /// </summary>
        /// <returns></returns>
        [HttpGet("ManufacturersList")]
        public List<ManufacturerViewModel> GetManufacturersMasterData()
        {
            return _masterDataHandlerService.GetManufacturersMasterList();
        }

        /// <summary>
        /// get manufacturer
        /// </summary>
        /// <param name="manufacturerId"></param>
        /// <returns></returns>
        [HttpGet("GetManufacturer")]
        public ManufacturerViewModel GetManufacturer(int id)
        {
            return _masterDataHandlerService.GetManufacturer(id);

        }

        /// <summary>
        /// create new manufacturer
        /// </summary>
        /// <param name="manufacturerVM"></param>
        /// <returns></returns>
        [HttpPost("CreateManufacturer")]
        public IActionResult CreateManufacturer(ManufacturerViewModel manufacturerVM)
        {
            var manufacturerResponse = _masterDataHandlerService.CreateUpdateManufacturer(manufacturerVM);
            if (manufacturerResponse)
            {
                return Ok(manufacturerResponse);
            }
            else
            {
                return BadRequest();
            }
        }


        /// <summary>
        /// create new manufacturer
        /// </summary>
        /// <param name="manufacturerVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateManufacturer")]
        public IActionResult UpdateManufacturer(ManufacturerViewModel manufacturerVM)
        {
            var manufacturerResponse = _masterDataHandlerService.CreateUpdateManufacturer(manufacturerVM);
            if (manufacturerResponse)
            {
                return Ok(manufacturerResponse);
            }
            else
            {
                return BadRequest();
            }
        }
       
    }
}

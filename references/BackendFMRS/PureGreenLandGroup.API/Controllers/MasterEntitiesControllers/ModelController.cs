using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers.MasterEntitiesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public ModelController(IMapper mapper, IMasterDataHandlerService masterDataHandlerService)
        {
            _masterDataHandlerService = masterDataHandlerService;
            _mapper = mapper;
        }

        /// <summary>
        /// API to get master data of models  
        /// </summary>
        /// <returns></returns>
        [HttpGet("ModelList")]
        public List<ModelsViewModels> GetModelsMasterData()
        {
            return _masterDataHandlerService.GetModelsMasterList();
        }

        /// <summary>
        /// API to get master data of models  
        /// </summary>
        /// <returns></returns>
        [HttpGet("ModelGridList")]
        public List<ModelGridListVM> GetModelDetailsList()
        {
            return _masterDataHandlerService.GetModelDetailsList();
        }

        /// <summary>
        /// get model details
        /// </summary>
        /// <param name="modelId"></param>
        /// <returns></returns>
        [HttpGet("GetModel")]
        public ModelsViewModels GetModel(int id)
        {
            return _masterDataHandlerService.GetModel(id);
        }

        /// <summary>
        /// get the list of models for specific manufacturer 
        /// for cascading model dropdown on create controller form
        /// </summary>
        /// <param name="manufacturerId"></param>
        /// <returns></returns>
        [HttpGet("ModelListByManufacturerId")]
        public List<ModelsViewModels> ModelListByManufacturerId(int manufacturerId)
        {
            return _masterDataHandlerService.ModelListByManufacturerId(manufacturerId);
        }

        

        /// <summary>
        /// create new model
        /// </summary>
        /// <param name="modelsVM"></param>
        /// <returns></returns>
        [HttpPost("CreateModel")]
        public IActionResult CreateModel(ModelsViewModels modelsVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateModel(modelsVM);
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
        /// update model
        /// </summary>
        /// <param name="modelsVM"></param>
        /// <returns></returns>
        [HttpPut("UpdateModel")]
        public IActionResult UpdateModel(ModelsViewModels modelsVM)
        {
            var modelResponse = _masterDataHandlerService.CreateUpdateModel(modelsVM);
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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.ViewModel.Reports;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportDataHandlerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IReportService _reportService;

        public ReportDataHandlerController(IConfiguration configuration, IReportService reportService)
        {
            _configuration = configuration;
            _reportService = reportService;
        }

        [HttpGet("GetControllerRunTimeList")]
        public IActionResult GetControllerRunTimeList(int propId)
        {
            var controllerTimeDetailsList = _reportService.ControllerRunTimeList(_configuration, propId);
            return Ok(controllerTimeDetailsList);
        }

        [HttpGet("GetControllerProgramsById")]
        public IActionResult GetControllerProgramsById(int controllerId)
        {
            var controllerTimeDetailsList = _reportService.GetControllerProgramsById(controllerId);
            return Ok(controllerTimeDetailsList);
        }

        [HttpGet("GetProgramsStartTimer")]
        public IActionResult GetProgramsStartTimer(int controllerId, int programId)
        {
            var controllerTimeDetailsList = _reportService.GetProgramsStartTimer(controllerId, programId);
            return Ok(controllerTimeDetailsList);
        }

        /// <summary>
        /// Generate controller runtime report data
        /// </summary>
        /// <param name="controllerTimeDetailsVM"></param>
        /// <returns></returns>
        [HttpPost("GetControllerRuntimeReport")]
        public string ControllerRuntimeReport(ControllerTimeDetailsVM controllerTimeDetailsVM)
        {
            return _reportService.CreateControllerRuntimeReport(controllerTimeDetailsVM).Result;
        }


        [HttpGet("CatalogMappingCSV")]
        public string CatalogMappingCSV( int inspectionId)
        {
            return _reportService.CatalogMappingCSV(inspectionId).Result;

        }


    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Models.DTO.Equipment;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EquipmentSyncController : ControllerBase
    {
        private readonly IEquipmentsService _equipmentsService;
        public EquipmentSyncController(IEquipmentsService equipmentsService)
        {
            _equipmentsService = equipmentsService;
        }

        [HttpPost("CreateSchedulerLog")]
        public async Task<IActionResult> CreateSchedulerLog(EqpSyncLogsVM eqpSyncLogsVM)
        {
            var logResponse = await _equipmentsService.CreateSchedulerLog(eqpSyncLogsVM);
            if (logResponse)
            {
                return Ok("Created");
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("CreateExceptionLog")]
        public async Task<IActionResult> CreateExceptionLog(SchedulerExceptionLogVM exception)
        {
            var logResponse = await _equipmentsService.CreateExceptionLog(exception);
            if (logResponse)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("CreateEquipmentAssetIdLog")]
        public async Task<IActionResult> CreateEquipmentAssetIdLog(EquipmentAssetIdVM schedulerCreatedAssetsVM)
        {
            var logResponse = await _equipmentsService.SaveCreatedAssetIdLog(schedulerCreatedAssetsVM);
            if (logResponse)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("GetEquipmentAssetIdLogList")]
        public async Task<List<EquipmentAssetIdVM>> GetEquipmentAssetIdLogList()
        {
            return await _equipmentsService.GetEquipmentAssetIdLogList();

        }
    }
}

// public class BranchesController : ControllerBase
// private readonly IBranchesService _branchesService;
// public BranchesController(IBranchesService branchesService)
// _branchesService = branchesService;
// public async Task<IActionResult> GetAllBranches()
// var branches = await _branchesService.GetAllBranchesAsync();
// return Ok(branches);

using Microsoft.AspNetCore.Mvc;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Models.DTO.Branches;

namespace PureGreenLandGroup.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        // private readonly IBranchesService _branchesService;

        // public BranchesController(IBranchesService branchesService)
        // {
        //     _branchesService = branchesService;
        // }

        // public async Task<IActionResult> GetAllBranches()
        // {
        //     try
        //     {
        //         var branches = await _branchesService.GetAllBranchesAsync();
        //         return Ok(branches);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Internal server error: {ex.Message}");
        //     }
        // }
    }
} 
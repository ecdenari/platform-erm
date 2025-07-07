using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Models.ViewModel.Reports;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IReportService
    {
        List<ControllerTimeDetailsVM> ControllerRunTimeList(IConfiguration _configuration, int propId);

        List<ProgramViewModel> GetControllerProgramsById(int controllerId);

        ProgramViewModel GetProgramsStartTimer(int controllerId, int programId);
        Task<string> CreateControllerRuntimeReport(ControllerTimeDetailsVM controllerTimeDetailsVM);
        Task<string> CatalogMappingCSV(int inspectionId);

    }
}

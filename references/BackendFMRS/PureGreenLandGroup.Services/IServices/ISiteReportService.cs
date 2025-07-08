using PureGreenLandGroup.Models.ViewModel.SiteManagement;

namespace PureGreenLandGroup.Services.IServices
{
    public interface ISiteReportService
    {
        Task<List<SiteReportListVM>> GetReportsAsync(SiteReportFilterVM filter);
        Task<List<SiteReportListVM>> GetReportsByPropertyIdAsync(int propertyId);
        Task<List<SiteReportListVM>> GetReportsByUserIdAsync(int userId);
        Task<SiteReportVM?> GetReportByIdAsync(int id);
        Task<SiteReportVM> CreateReportAsync(CreateSiteReportVM createReport);
        Task<SiteReportVM?> UpdateReportAsync(UpdateSiteReportVM updateReport);
        Task<bool> DeleteReportAsync(int id);
        Task<bool> UpdateReportStatusAsync(int id, string status);
        Task<bool> CompleteReportAsync(int id);
        Task<object> GetReportStatisticsAsync();
    }
}
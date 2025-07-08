using PureGreenLandGroup.Models.ViewModel.SiteManagement;

namespace PureGreenLandGroup.Services.IServices
{
    public interface ISiteReportTemplateService
    {
        Task<List<SiteReportTemplateListVM>> GetAllTemplatesAsync();
        Task<List<SiteReportTemplateListVM>> GetActiveTemplatesAsync();
        Task<SiteReportTemplateVM?> GetTemplateByIdAsync(int id);
        Task<SiteReportTemplateVM> CreateTemplateAsync(CreateSiteReportTemplateVM createTemplate);
        Task<SiteReportTemplateVM?> UpdateTemplateAsync(UpdateSiteReportTemplateVM updateTemplate);
        Task<bool> DeleteTemplateAsync(int id);
        Task<bool> ToggleTemplateStatusAsync(int id);
    }
}
using Microsoft.AspNetCore.Http;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;

namespace PureGreenLandGroup.Services.IServices
{
    public interface ISiteReportPhotoService
    {
        Task<PhotoUploadResponseVM> UploadPhotoAsync(int reportId, IFormFile file, string? metadata);
        Task<PhotoUploadResponseVM> UploadSectionPhotoAsync(int reportId, int sectionId, IFormFile file, string? metadata);
        Task<List<SiteReportPhotoVM>> GetPhotosByReportIdAsync(int reportId);
        Task<List<SiteReportPhotoVM>> GetPhotosBySectionIdAsync(int sectionId);
        Task<SiteReportPhotoVM?> GetPhotoByIdAsync(int id);
        Task<SiteReportPhotoVM?> UpdatePhotoAsync(UpdateSiteReportPhotoVM updatePhoto);
        Task<bool> DeletePhotoAsync(int id);
        Task<bool> ReorderPhotosAsync(List<int> photoIds);
    }
}
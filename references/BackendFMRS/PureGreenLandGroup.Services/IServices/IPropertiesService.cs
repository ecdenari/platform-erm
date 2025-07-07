using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Models.DTO.Properties;
using PureGreenLandGroup.Models.ViewModel.Properties;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IPropertiesService
    {
        Task<List<PropertiesListVM>> ListAllIrrigationProperties(IConfiguration configuration);

        Task<PropertyCountsVM> GetPropertyCounts();

        Task<bool> GetLatestProperties();


        Task<bool> SwitchPropertyStatus(int id, bool propertyStatus);

        Task<PropertyViewModel> GetPropertyById(int id);

        Task<List<PropertyContactDTO>> GetContactsByPropertyId(int propertyId);

        Task<List<PropertiesListVM>> ListSiteManagementProperties(IConfiguration configuration);

        // Template assignment methods
        Task<bool> AssignDefaultTemplate(int propertyId, int templateId);
        Task<bool> RemoveDefaultTemplate(int propertyId);
        Task<SiteReportTemplate?> GetDefaultTemplate(int propertyId);
    }
}

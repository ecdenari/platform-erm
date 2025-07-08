using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.DTO.Authentication;
using PureGreenLandGroup.Models.DTO.Properties;
using PureGreenLandGroup.Models.ViewModel.Properties;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Utility.Constants;
using System.Configuration;
using System.Data;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;

namespace PureGreenLandGroup.Services.Services
{
    public class PropertiesService : IPropertiesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAspireService _aspireService;
        private readonly AppDbContext _context;
        
        public PropertiesService(IUnitOfWork unitOfWork, IMapper mapper, IAspireService aspireService, AppDbContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _aspireService = aspireService;
            _context = context;
        }

        public async Task<List<PropertiesListVM>> ListAllIrrigationProperties(IConfiguration configuration)
        {
            List<PropertiesListVM> propertiesList = new();
            try
            {
                var conncection = configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection connection = new(conncection))
                {
                    using (SqlCommand query = new("[dbo].[usp_GetAllIrrigationPropertiesList]", connection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;

                        // Open the connection
                        connection.Open();
                        // Execute the command
                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())

                            {
                                PropertiesListVM propertiesListVM = new()
                                {
                                    Id = data.GetInt32(data.GetOrdinal("PropertyID")),
                                    PropertyName = data.IsDBNull(data.GetOrdinal("PropertyName")) ? null : data.GetString(data.GetOrdinal("PropertyName")),
                                    Address = data.IsDBNull(data.GetOrdinal("PropertyAddressLine1")) ? null : $"{data["PropertyAddressLine1"]}, {data["PropertyAddressCity"]}, {data["PropertyAddressStateProvinceCode"]} {data["PropertyAddressZipCode"]}",
                                    ControllerCount = 0, // Column not present in SP result; avoid IndexOutOfRangeException
                                    Faults = data.GetInt32(data.GetOrdinal("Faults")),
                                    TotalInspectionIssues = data.GetInt32(data.GetOrdinal("TotalInspectionIssues")),
                                    IsActive = data.GetBoolean(data.GetOrdinal("IsActive")),
                                };
                                propertiesList.Add(propertiesListVM);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return propertiesList;
        }

        public async Task<bool> SwitchPropertyStatus(int id, bool propertyStatus)
        {
            try
            {
                bool isStatusChnaged = false;
                var propRepository = _unitOfWork.GetRepository<Properties>();
                var property = propRepository.List(m=>m.Id==id).FirstOrDefault();
                if (property != null)
                {
                    property.IsActive = propertyStatus;
                    await _unitOfWork.CommitAsync();
                   
                    isStatusChnaged = true;
                }
                return isStatusChnaged;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private int PropertiesControllersCount(int propertyID)
        {
            int controllersCount = 0;
            var controllerRepository = _unitOfWork.GetRepository<Controllers>();
            var controllers = controllerRepository.List(m => m.PropertyId == propertyID);
            if (controllers != null)
            {
                controllersCount = controllers.ToList().Count();
            }
            return controllersCount;
        }

        public async Task<PropertyCountsVM> GetPropertyCounts()
        {
            try
            {
                PropertyCountsVM propertyCountsVM = new();
                var propRepository = _unitOfWork.GetRepository<Properties>();
                var propertiesList = propRepository.List(m => m.Id > 0); //using negative expression to get all the list
                propertyCountsVM.TotalPropertiesCount = propertiesList.Count();
                propertyCountsVM.ActivePropertiesCount = propertiesList.Where(m => m.IsActive).Count();
                propertyCountsVM.InactivePropertiesCount = propertiesList.Where(m => !m.IsActive).Count();
                return propertyCountsVM;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> GetLatestProperties()
        {
            bool isModified = false;
            try
            {
                var token = await _aspireService.GetAspireAPIToken();
                HttpClient httpClient = new HttpClient
                {
                    DefaultRequestHeaders = { Authorization = new AuthenticationHeaderValue("Bearer", token.Token) }
                };


                using (var propertiesResponse = await httpClient.GetAsync(ApiUrls.GetAspireProperties))
                {
                    // Check if request was successful
                    if (propertiesResponse.IsSuccessStatusCode)
                    {
                        var responseBody = await propertiesResponse.Content.ReadAsStringAsync();
                        List<ProppertiesAPIResponseVM> propertiesList = JsonConvert.DeserializeObject<List<ProppertiesAPIResponseVM>>(responseBody!)!;
                        //List<Properties> propertiesList = JsonConvert.DeserializeObject<List<Properties>>(responseBody!)!;
                        if (propertiesList != null && propertiesList.Any())
                        {
                            //filter properties based on required type i.e. we only need properties of Maintenance type
                            propertiesList = propertiesList.Where(m => m.PropertyType == "Maintenance").ToList();

                            var propRepository = _unitOfWork.GetRepository<Properties>();
                            foreach (var propertyVM in propertiesList)
                            {
                                var savedProp = propRepository.List(m => m.PropertyID == propertyVM.PropertyID).FirstOrDefault();
                                if (savedProp != null)
                                {
                                    //update the record
                                    // savedProp.PropertyID = property.PropertyID;
                                    savedProp.PropertyStatusID = propertyVM.PropertyStatusID;
                                    savedProp.PropertyStatusName = propertyVM.PropertyStatusName;
                                    savedProp.BranchID = propertyVM.BranchID;
                                    savedProp.BranchName = propertyVM.BranchName;
                                    savedProp.BranchCode = propertyVM.BranchCode;
                                    savedProp.AccountOwnerContactID = propertyVM.AccountOwnerContactID;
                                    savedProp.AccountOwnerContactName = propertyVM.AccountOwnerContactName;
                                    savedProp.ProductionManagerContactID = propertyVM.ProductionManagerContactID;
                                    savedProp.ProductionManagerContactName = propertyVM.ProductionManagerContactName;
                                    savedProp.PropertyAddressID = propertyVM.PropertyAddressID;
                                    savedProp.CountyID = propertyVM.CountyID;
                                    savedProp.PropertyAddressLine1 = propertyVM.PropertyAddressLine1;
                                    savedProp.PropertyAddressLine2 = propertyVM.PropertyAddressLine2;
                                    savedProp.PropertyAddressCity = propertyVM.PropertyAddressCity;
                                    savedProp.PropertyAddressStateProvinceCode = propertyVM.PropertyAddressStateProvinceCode;
                                    savedProp.PropertyAddressZipCode = propertyVM.PropertyAddressZipCode;
                                    savedProp.LocalityID = propertyVM.LocalityID;
                                    savedProp.LocalityName = propertyVM.LocalityName;
                                    savedProp.IndustryID = propertyVM.IndustryID;
                                    savedProp.IndustryName = propertyVM.IndustryName;
                                    savedProp.LeadSourceID = propertyVM.LeadSourceID;
                                    savedProp.LeadSourceName = propertyVM.LeadSourceName;
                                    savedProp.TaxJurisdictionID = propertyVM.TaxJurisdictionID;
                                    savedProp.TaxJurisdictionName = propertyVM.TaxJurisdictionName;
                                    savedProp.PropertyGroupID = propertyVM.PropertyGroupID;
                                    savedProp.ActiveOpportunityID = propertyVM.ActiveOpportunityID;
                                    savedProp.CompetitorID = propertyVM.CompetitorID;
                                    savedProp.PropertyGroupName = propertyVM.PropertyGroupName;
                                    savedProp.PropertyName = propertyVM.PropertyName;
                                    savedProp.PropertyNameAbr = propertyVM.PropertyNameAbr;
                                    savedProp.SequenceNumber = propertyVM.SequenceNumber;
                                    savedProp.ProductionNote = propertyVM.ProductionNote;
                                    savedProp.Active = propertyVM.Active;
                                    savedProp.EmailInvoice = propertyVM.EmailInvoice;
                                    savedProp.Budget = propertyVM.Budget;
                                    savedProp.Note = propertyVM.Note;
                                    savedProp.CreatedByUserID = propertyVM.CreatedByUserID;
                                    savedProp.CreatedByUserName = propertyVM.CreatedByUserName;
                                    savedProp.CreatedDate = propertyVM.CreatedDate;
                                    savedProp.GEOPerimeter = propertyVM.GEOPerimeter;
                                    savedProp.GEOLocationLatitude = propertyVM.GEOLocationLatitude;
                                    savedProp.GEOLocationLongitude = propertyVM.GEOLocationLongitude;
                                    savedProp.PaymentTermsID = propertyVM.PaymentTermsID;
                                    savedProp.PaymentTermsName = propertyVM.PaymentTermsName;
                                    savedProp.SeparateInvoices = propertyVM.SeparateInvoices;
                                    savedProp.Website = propertyVM.Website;
                                    savedProp.ModifiedByUserID = propertyVM.ModifiedByUserID;
                                    savedProp.ModifiedByUserName = propertyVM.ModifiedByUserName;
                                    savedProp.ModifiedDate = propertyVM.ModifiedDate;
                                    savedProp.DragDropGeoLocation = propertyVM.DragDropGeoLocation;
                                    savedProp.GPSUpdated = propertyVM.GPSUpdated;
                                    savedProp.GPSGeofenceID = propertyVM.GPSGeofenceID;
                                    savedProp.SnowNote = propertyVM.SnowNote;
                                    savedProp.EarliestOpportunityWonDate = propertyVM.EarliestOpportunityWonDate;
                                    savedProp.CollectionNotes = propertyVM.CollectionNotes;
                                    savedProp.IntegrationID = propertyVM.IntegrationID;
                                    savedProp.PropertyTypeID = propertyVM.PropertyTypeID;
                                    savedProp.PropertyType = propertyVM.PropertyType;
                                    savedProp.PropertyTypeIntegrationCode = propertyVM.PropertyTypeIntegrationCode;
                                }
                                else
                                {
                                    //add new record
                                    Properties propertyEntity = _mapper.Map<Properties>(propertyVM);
                                    propRepository.Add(propertyEntity);
                                    if (propertyVM.PropertyContacts.Any())
                                    {
                                        var propContactRepository = _unitOfWork.GetRepository<PropertiesContact>();
                                        List<PropertiesContact> propertiesContacts = _mapper.Map<List<PropertiesContact>>(propertyVM.PropertyContacts);
                                        propertiesContacts.ForEach(contact => contact.PropertyId = propertyVM.PropertyID); // Set the same PrpId for each contact
                                                                                                                          
                                        propContactRepository.AddRange(propertiesContacts);
                                    }
                                }
                            }
                            await _unitOfWork.CommitAsync();
                            isModified = true;
                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return isModified;
        }

        public async Task<PropertyViewModel> GetPropertyById(int id)
        {
            PropertyViewModel propertyViewModel = new ();
            try
            {
                var propRepository = _unitOfWork.GetRepository<Properties>();
                var property = propRepository.List(m => m.Id == id).FirstOrDefault();
                if (property != null)
                {
                    propertyViewModel.PropertId = property.Id;
                    propertyViewModel.PropertName = property.PropertyName;
                    propertyViewModel.PropertAddress = property.PropertyAddressLine1 + " " + property.PropertyAddressLine2 + " " + property.PropertyAddressCity + " " + property.PropertyAddressStateProvinceCode + " " + property.PropertyAddressZipCode;

                }
            }
            catch (Exception)
            {

                throw;
            }
            return propertyViewModel;
        }

        public async Task<List<PropertyContactDTO>> GetContactsByPropertyId(int propertyId)
        {
            var propContactRepository = _unitOfWork.GetRepository<PropertiesContact>();
            var contacts = await propContactRepository.List(c => c.PropertyId == propertyId).ToListAsync();
            return _mapper.Map<List<PropertyContactDTO>>(contacts);
        }

        public async Task<List<PropertiesListVM>> ListSiteManagementProperties(IConfiguration configuration)
        {
            List<PropertiesListVM> propertiesList = new();
            try
            {
                var conncection = configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection connection = new(conncection))
                {
                    using (SqlCommand query = new("[dbo].[usp_GetSiteManagementPropertiesList]", connection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;

                        // Open the connection
                        connection.Open();
                        // Execute the command
                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())
                            {
                                PropertiesListVM propertiesListVM = new()
                                {
                                    Id = data.GetInt32(data.GetOrdinal("PropertyID")),
                                    PropertyName = data.IsDBNull(data.GetOrdinal("PropertyName")) ? null : data.GetString(data.GetOrdinal("PropertyName")),
                                    Address = data.IsDBNull(data.GetOrdinal("Address")) ? null : data.GetString(data.GetOrdinal("Address")),
                                    PropertyStatusName = data.IsDBNull(data.GetOrdinal("PropertyStatusName")) ? null : data.GetString(data.GetOrdinal("PropertyStatusName")),
                                    PropertyType = data.IsDBNull(data.GetOrdinal("PropertyType")) ? null : data.GetString(data.GetOrdinal("PropertyType")),
                                    BranchName = data.IsDBNull(data.GetOrdinal("BranchName")) ? null : data.GetString(data.GetOrdinal("BranchName")),
                                    AccountOwnerContactName = data.IsDBNull(data.GetOrdinal("AccountOwnerContactName")) ? null : data.GetString(data.GetOrdinal("AccountOwnerContactName")),
                                    ProductionManagerContactName = data.IsDBNull(data.GetOrdinal("ProductionManagerContactName")) ? null : data.GetString(data.GetOrdinal("ProductionManagerContactName")),
                                    IsActive = data.GetBoolean(data.GetOrdinal("IsActive")),
                                    ControllerCount = 0, // Not relevant for Site Management
                                    Faults = 0, // Not relevant for Site Management  
                                    TotalInspectionIssues = 0, // Not relevant for Site Management
                                };
                                propertiesList.Add(propertiesListVM);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return propertiesList;
        }

        public async Task<bool> AssignDefaultTemplate(int propertyId, int templateId)
        {
            try
            {
                // Get property using AppDbContext
                var property = await _context.Properties.FindAsync(propertyId);
                if (property == null)
                    return false;

                // Verify template exists
                var template = await _context.SiteReportTemplates.FindAsync(templateId);
                if (template == null)
                    return false;

                property.DefaultSiteReportTemplateId = templateId;
                await _context.SaveChangesAsync();
                
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveDefaultTemplate(int propertyId)
        {
            try
            {
                var property = await _context.Properties.FindAsync(propertyId);
                if (property == null)
                    return false;

                property.DefaultSiteReportTemplateId = null;
                await _context.SaveChangesAsync();
                
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<SiteReportTemplate?> GetDefaultTemplate(int propertyId)
        {
            try
            {
                var property = await _context.Properties.FindAsync(propertyId);
                if (property?.DefaultSiteReportTemplateId == null)
                    return null;

                return await _context.SiteReportTemplates.FindAsync(property.DefaultSiteReportTemplateId.Value);
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}

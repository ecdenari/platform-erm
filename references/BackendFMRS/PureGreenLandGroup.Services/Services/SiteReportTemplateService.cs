using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;
using PureGreenLandGroup.Services.IServices;

namespace PureGreenLandGroup.Services.Services
{
    public class SiteReportTemplateService : ISiteReportTemplateService
    {
        private readonly AppDbContext _context;

        public SiteReportTemplateService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SiteReportTemplateListVM>> GetAllTemplatesAsync()
        {
            try
            {
                var templates = await _context.SiteReportTemplates
                    .OrderByDescending(t => t.CreatedDate)
                    .Select(t => new SiteReportTemplateListVM
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserName = t.CreatedByUserName,
                        CreatedDate = t.CreatedDate,
                        Version = t.Version,
                        ReportsCount = t.SiteReports.Count()
                    })
                    .ToListAsync();

                return templates;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving templates: {ex.Message}", ex);
            }
        }

        public async Task<List<SiteReportTemplateListVM>> GetActiveTemplatesAsync()
        {
            try
            {
                var templates = await _context.SiteReportTemplates
                    .Where(t => t.IsActive)
                    .OrderBy(t => t.Name)
                    .Select(t => new SiteReportTemplateListVM
                    {
                        Id = t.Id,
                        Name = t.Name,
                        Description = t.Description,
                        IsActive = t.IsActive,
                        CreatedByUserName = t.CreatedByUserName,
                        CreatedDate = t.CreatedDate,
                        Version = t.Version,
                        ReportsCount = t.SiteReports.Count()
                    })
                    .ToListAsync();

                return templates;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving active templates: {ex.Message}", ex);
            }
        }

        public async Task<SiteReportTemplateVM?> GetTemplateByIdAsync(int id)
        {
            try
            {
                var template = await _context.SiteReportTemplates
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (template == null)
                    return null;

                return new SiteReportTemplateVM
                {
                    Id = template.Id,
                    Name = template.Name,
                    Description = template.Description,
                    Sections = template.Sections,
                    IsActive = template.IsActive,
                    CreatedByUserID = template.CreatedByUserID,
                    CreatedByUserName = template.CreatedByUserName,
                    CreatedDate = template.CreatedDate,
                    ModifiedByUserID = template.ModifiedByUserID,
                    ModifiedByUserName = template.ModifiedByUserName,
                    ModifiedDate = template.ModifiedDate,
                    Version = template.Version
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving template by ID {id}: {ex.Message}", ex);
            }
        }

        public async Task<SiteReportTemplateVM> CreateTemplateAsync(CreateSiteReportTemplateVM createTemplate)
        {
            try
            {
                var template = new SiteReportTemplate
                {
                    Name = createTemplate.Name,
                    Description = createTemplate.Description,
                    Sections = createTemplate.Sections,
                    IsActive = createTemplate.IsActive,
                    CreatedByUserID = 1, // TODO: Get from authenticated user context
                    CreatedByUserName = "System", // TODO: Get from authenticated user context
                    CreatedDate = DateTime.UtcNow,
                    Version = 1
                };

                _context.SiteReportTemplates.Add(template);
                await _context.SaveChangesAsync();

                return new SiteReportTemplateVM
                {
                    Id = template.Id,
                    Name = template.Name,
                    Description = template.Description,
                    Sections = template.Sections,
                    IsActive = template.IsActive,
                    CreatedByUserID = template.CreatedByUserID,
                    CreatedByUserName = template.CreatedByUserName,
                    CreatedDate = template.CreatedDate,
                    ModifiedByUserID = template.ModifiedByUserID,
                    ModifiedByUserName = template.ModifiedByUserName,
                    ModifiedDate = template.ModifiedDate,
                    Version = template.Version
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating template: {ex.Message}", ex);
            }
        }

        public async Task<SiteReportTemplateVM?> UpdateTemplateAsync(UpdateSiteReportTemplateVM updateTemplate)
        {
            try
            {
                var template = await _context.SiteReportTemplates
                    .FirstOrDefaultAsync(t => t.Id == updateTemplate.Id);

                if (template == null)
                    return null;

                template.Name = updateTemplate.Name;
                template.Description = updateTemplate.Description;
                template.Sections = updateTemplate.Sections;
                template.IsActive = updateTemplate.IsActive;
                template.ModifiedByUserID = 1; // TODO: Get from authenticated user context
                template.ModifiedByUserName = "System"; // TODO: Get from authenticated user context
                template.ModifiedDate = DateTime.UtcNow;
                template.Version++;

                await _context.SaveChangesAsync();

                return new SiteReportTemplateVM
                {
                    Id = template.Id,
                    Name = template.Name,
                    Description = template.Description,
                    Sections = template.Sections,
                    IsActive = template.IsActive,
                    CreatedByUserID = template.CreatedByUserID,
                    CreatedByUserName = template.CreatedByUserName,
                    CreatedDate = template.CreatedDate,
                    ModifiedByUserID = template.ModifiedByUserID,
                    ModifiedByUserName = template.ModifiedByUserName,
                    ModifiedDate = template.ModifiedDate,
                    Version = template.Version
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating template: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteTemplateAsync(int id)
        {
            try
            {
                var template = await _context.SiteReportTemplates
                    .Include(t => t.SiteReports)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (template == null)
                    return false;

                // Check if template is being used by any reports
                if (template.SiteReports.Any())
                {
                    throw new InvalidOperationException("Cannot delete template that is being used by existing reports. Deactivate it instead.");
                }

                _context.SiteReportTemplates.Remove(template);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting template: {ex.Message}", ex);
            }
        }

        public async Task<bool> ToggleTemplateStatusAsync(int id)
        {
            try
            {
                var template = await _context.SiteReportTemplates
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (template == null)
                    return false;

                template.IsActive = !template.IsActive;
                template.ModifiedByUserID = 1; // TODO: Get from authenticated user context
                template.ModifiedByUserName = "System"; // TODO: Get from authenticated user context
                template.ModifiedDate = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error toggling template status: {ex.Message}", ex);
            }
        }
    }
}
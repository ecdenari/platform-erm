using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.ViewModel.SiteManagement;
using PureGreenLandGroup.Services.IServices;
using System.Text.Json;

namespace PureGreenLandGroup.Services.Services
{
    public class SiteReportService : ISiteReportService
    {
        private readonly AppDbContext _context;

        public SiteReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SiteReportListVM>> GetReportsAsync(SiteReportFilterVM filter)
        {
            // TODO: Implement actual data retrieval with filtering
            return await Task.FromResult(new List<SiteReportListVM>());
        }

        public async Task<List<SiteReportListVM>> GetReportsByPropertyIdAsync(int propertyId)
        {
            // TODO: Implement actual data retrieval
            return await Task.FromResult(new List<SiteReportListVM>());
        }

        public async Task<List<SiteReportListVM>> GetReportsByUserIdAsync(int userId)
        {
            // TODO: Implement actual data retrieval
            return await Task.FromResult(new List<SiteReportListVM>());
        }

        public async Task<SiteReportVM?> GetReportByIdAsync(int id)
        {
            // TODO: Implement actual data retrieval
            return await Task.FromResult<SiteReportVM?>(null);
        }

        public async Task<SiteReportVM> CreateReportAsync(CreateSiteReportVM createReport)
        {
            try
            {
                // Get property to check for default template
                var property = await _context.Properties.FindAsync(createReport.PropertyID);
                if (property == null)
                {
                    throw new ArgumentException($"Property with ID {createReport.PropertyID} not found");
                }

                // Use provided template ID or property's default template
                int? templateId = createReport.TemplateId ?? property.DefaultSiteReportTemplateId;
                
                // Create the site report entity
                var siteReport = new SiteReport
                {
                    PropertyID = createReport.PropertyID,
                    TemplateId = templateId,
                    Title = createReport.Title,
                    Description = createReport.Description,
                    Status = "Draft",
                    ReportDate = createReport.ReportDate,
                    CreatedByUserID = 1, // TODO: Get from authenticated user context
                    CreatedByUserName = "System", // TODO: Get from authenticated user context
                    CreatedDate = DateTime.UtcNow,
                    Notes = createReport.Notes,
                    GPSLatitude = createReport.GPSLatitude,
                    GPSLongitude = createReport.GPSLongitude,
                    WeatherConditions = createReport.WeatherConditions,
                    Temperature = createReport.Temperature
                };

                // If using a template, create sections from template
                if (templateId.HasValue)
                {
                    await CreateSectionsFromTemplate(siteReport, templateId.Value);
                }

                // Add to database
                _context.SiteReports.Add(siteReport);
                await _context.SaveChangesAsync();

                // Return the created report as ViewModel
                return await MapToSiteReportVM(siteReport);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating site report: {ex.Message}", ex);
            }
        }

        private async Task CreateSectionsFromTemplate(SiteReport siteReport, int templateId)
        {
            var template = await _context.SiteReportTemplates.FindAsync(templateId);
            if (template == null) return;

            try
            {
                // Parse template sections from JSON
                var templateSections = JsonSerializer.Deserialize<List<TemplateSectionData>>(template.Sections);
                if (templateSections == null) return;

                // Create report sections from template
                foreach (var templateSection in templateSections.OrderBy(s => s.Order))
                {
                    var reportSection = new SiteReportSection
                    {
                        ReportId = siteReport.Id,
                        SectionName = templateSection.Name,
                        SectionType = templateSection.Type ?? "",
                        SectionOrder = templateSection.Order,
                        ScoreType = templateSection.ScoreType,
                        MaxScore = templateSection.MaxScore,
                        Score = null, // User will fill this in
                        Notes = "",
                        Status = "Pending",
                        CreatedDate = DateTime.UtcNow
                    };

                    siteReport.Sections.Add(reportSection);
                }
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error parsing template sections: {ex.Message}", ex);
            }
        }

        private async Task<SiteReportVM> MapToSiteReportVM(SiteReport siteReport)
        {
            // Load related data
            await _context.Entry(siteReport)
                .Reference(r => r.Property)
                .LoadAsync();

            if (siteReport.TemplateId.HasValue)
            {
                await _context.Entry(siteReport)
                    .Reference(r => r.Template)
                    .LoadAsync();
            }

            await _context.Entry(siteReport)
                .Collection(r => r.Sections)
                .LoadAsync();

            await _context.Entry(siteReport)
                .Collection(r => r.Photos)
                .LoadAsync();

            await _context.Entry(siteReport)
                .Collection(r => r.Issues)
                .LoadAsync();

            return new SiteReportVM
            {
                Id = siteReport.Id,
                PropertyID = siteReport.PropertyID,
                TemplateId = siteReport.TemplateId,
                Title = siteReport.Title,
                Description = siteReport.Description,
                Status = siteReport.Status,
                ReportDate = siteReport.ReportDate,
                CreatedByUserID = siteReport.CreatedByUserID,
                CreatedByUserName = siteReport.CreatedByUserName,
                CreatedDate = siteReport.CreatedDate,
                CompletedByUserID = siteReport.CompletedByUserID,
                CompletedByUserName = siteReport.CompletedByUserName,
                CompletedDate = siteReport.CompletedDate,
                Notes = siteReport.Notes,
                GPSLatitude = siteReport.GPSLatitude,
                GPSLongitude = siteReport.GPSLongitude,
                WeatherConditions = siteReport.WeatherConditions,
                Temperature = siteReport.Temperature,
                OverallScore = siteReport.OverallScore,
                MaxPossibleScore = siteReport.MaxPossibleScore,
                PropertyName = siteReport.Property?.PropertyName ?? "",
                PropertyAddress = $"{siteReport.Property?.PropertyAddressLine1} {siteReport.Property?.PropertyAddressCity}".Trim(),
                TemplateName = siteReport.Template?.Name,
                SectionCount = siteReport.Sections.Count,
                PhotoCount = siteReport.Photos.Count,
                IssueCount = siteReport.Issues.Count,
                Sections = siteReport.Sections.Select(s => new SiteReportSectionVM
                {
                    Id = s.Id,
                    ReportId = s.ReportId,
                    SectionName = s.SectionName,
                    SectionType = s.SectionType,
                    SectionOrder = s.SectionOrder,
                    ScoreType = s.ScoreType,
                    MaxScore = s.MaxScore,
                    Score = s.Score,
                    Notes = s.Notes,
                    Status = s.Status,
                    CreatedDate = s.CreatedDate,
                    ModifiedDate = s.ModifiedDate
                }).OrderBy(s => s.SectionOrder).ToList(),
                Photos = siteReport.Photos.Select(p => new SiteReportPhotoVM
                {
                    Id = p.Id,
                    ReportId = p.ReportId,
                    SectionId = p.SectionId,
                    FileName = p.FileName,
                    FilePath = p.FilePath,
                    PhotoUrl = $"/uploads/{p.FileName}", // Construct URL from file name
                    Caption = p.Caption,
                    UploadedDate = p.UploadedDate,
                    UploadedByUserName = p.UploadedByUserName,
                    PhotoOrder = p.PhotoOrder
                }).ToList(),
                Issues = siteReport.Issues.Select(i => new SiteReportIssueVM
                {
                    Id = i.Id,
                    ReportId = i.ReportId,
                    SectionId = i.SectionId,
                    Title = i.Title,
                    Description = i.Description,
                    IssueType = i.IssueType,
                    Severity = i.Severity,
                    Status = i.Status,
                    AssignedToUserID = i.AssignedToUserID,
                    AssignedToUserName = i.AssignedToUserName,
                    ReportedByUserName = i.ReportedByUserName,
                    ReportedDate = i.ReportedDate,
                    ResolvedDate = i.ActualResolutionDate
                }).ToList()
            };
        }

        // Helper class for deserializing template sections
        private class TemplateSectionData
        {
            public string Id { get; set; } = default!;
            public string Name { get; set; } = default!;
            public string? Type { get; set; }
            public string ScoreType { get; set; } = default!;
            public int? MaxScore { get; set; }
            public bool Required { get; set; }
            public int Order { get; set; }
            public string? Description { get; set; }
        }

        public async Task<SiteReportVM?> UpdateReportAsync(UpdateSiteReportVM updateReport)
        {
            // TODO: Implement actual data update
            throw new NotImplementedException("Update report functionality not yet implemented");
        }

        public async Task<bool> DeleteReportAsync(int id)
        {
            // TODO: Implement actual data deletion
            return await Task.FromResult(false);
        }

        public async Task<bool> UpdateReportStatusAsync(int id, string status)
        {
            // TODO: Implement actual status update
            return await Task.FromResult(false);
        }

        public async Task<bool> CompleteReportAsync(int id)
        {
            // TODO: Implement actual completion logic
            return await Task.FromResult(false);
        }

        public async Task<object> GetReportStatisticsAsync()
        {
            // Return mock statistics to prevent 500 error
            var statistics = new
            {
                totalReports = 0,
                draftReports = 0,
                inReviewReports = 0,
                completedReports = 0,
                totalProperties = 0,
                averageScore = 0.0,
                recentActivity = new List<object>()
            };

            return await Task.FromResult(statistics);
        }
    }
}
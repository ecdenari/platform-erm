using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models;
using System.Text.Json;

namespace PureGreenLandGroup.Services
{
    public interface ICompanySettingsService
    {
        Task<CompanySettingsDto?> GetCompanySettingsAsync(int companyId);
        Task<CompanySettingsDto> UpdateCompanySettingsAsync(int companyId, CompanySettingsDto settings, int updatedByUserId);
        Task<Company> GetOrCreateDefaultCompanyAsync();
        Task<string> SaveLogoFileAsync(Stream fileStream, string fileName, string logoType, int companyId, string webRootPath);
        Task<bool> DeleteLogoFileAsync(string? logoPath, string webRootPath);
    }

    public class CompanySettingsService : ICompanySettingsService
    {
        private readonly AppDbContext _context;

        public CompanySettingsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CompanySettingsDto?> GetCompanySettingsAsync(int companyId)
        {
            var company = await _context.Companies
                .Include(c => c.Settings)
                .FirstOrDefaultAsync(c => c.Id == companyId);

            if (company == null)
                return null;

            var address = ParseAddress(company.Address);

            return new CompanySettingsDto
            {
                Name = company.Name,
                Phone = company.Phone,
                Email = company.Email,
                Website = company.Website,
                Address = address,
                PrimaryLogoPath = company.Settings?.PrimaryLogoPath,
                LoginLogoPath = company.Settings?.LoginLogoPath,
                DocumentLogoPath = company.Settings?.DocumentLogoPath,
                PrimaryColor = company.Settings?.PrimaryColor ?? "#10b981",
                SupportEmail = company.Settings?.SupportEmail,
                NotificationEmail = company.Settings?.NotificationEmail,
                SessionTimeoutMinutes = company.Settings?.SessionTimeoutMinutes ?? 480,
                PasswordMinLength = company.Settings?.PasswordMinLength ?? 8,
                RequireTwoFactor = company.Settings?.RequireTwoFactor ?? false,
                DocumentTemplateSettings = ParseDocumentSettings(company.Settings?.DocumentTemplateSettings)
            };
        }

        public async Task<CompanySettingsDto> UpdateCompanySettingsAsync(int companyId, CompanySettingsDto settings, int updatedByUserId)
        {
            var company = await _context.Companies
                .Include(c => c.Settings)
                .FirstOrDefaultAsync(c => c.Id == companyId);

            if (company == null)
                throw new ArgumentException($"Company with ID {companyId} not found");

            // Update company information
            company.Name = settings.Name;
            company.Phone = settings.Phone;
            company.Email = settings.Email;
            company.Website = settings.Website;
            company.Address = SerializeAddress(settings.Address);
            company.UpdatedAt = DateTime.UtcNow;

            // Update or create company settings
            if (company.Settings == null)
            {
                company.Settings = new CompanySettings
                {
                    CompanyId = companyId
                };
                _context.CompanySettings.Add(company.Settings);
            }

            // Update logo paths
            company.Settings.PrimaryLogoPath = settings.PrimaryLogoPath;
            company.Settings.LoginLogoPath = settings.LoginLogoPath;
            company.Settings.DocumentLogoPath = settings.DocumentLogoPath;
            
            // Update other settings
            company.Settings.PrimaryColor = settings.PrimaryColor;
            company.Settings.SupportEmail = settings.SupportEmail;
            company.Settings.NotificationEmail = settings.NotificationEmail;
            company.Settings.SessionTimeoutMinutes = settings.SessionTimeoutMinutes;
            company.Settings.PasswordMinLength = settings.PasswordMinLength;
            company.Settings.RequireTwoFactor = settings.RequireTwoFactor;
            company.Settings.DocumentTemplateSettings = SerializeDocumentSettings(settings.DocumentTemplateSettings);
            company.Settings.UpdatedAt = DateTime.UtcNow;
            company.Settings.UpdatedByUserId = updatedByUserId;

            await _context.SaveChangesAsync();

            return await GetCompanySettingsAsync(companyId) ?? settings;
        }

        public async Task<Company> GetOrCreateDefaultCompanyAsync()
        {
            var company = await _context.Companies.FirstOrDefaultAsync();
            
            if (company == null)
            {
                // Create default company if none exists
                company = new Company
                {
                    Name = "PureGreenLandGroup",
                    Email = "info@puregreenlanggroup.com",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                _context.Companies.Add(company);
                await _context.SaveChangesAsync();
            }

            return company;
        }

        public async Task<string> SaveLogoFileAsync(Stream fileStream, string fileName, string logoType, int companyId, string webRootPath)
        {
            // Validate file
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".svg" };
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(extension))
                throw new ArgumentException("Invalid file type. Only JPG, PNG, GIF, and SVG files are allowed.");

            if (fileStream.Length > 5 * 1024 * 1024) // 5MB limit
                throw new ArgumentException("File size cannot exceed 5MB.");

            // Create directory structure
            var uploadDir = Path.Combine(webRootPath, "uploads", "companies", companyId.ToString(), "logos");
            Directory.CreateDirectory(uploadDir);

            // Generate unique filename
            var newFileName = $"{logoType}_{DateTime.UtcNow:yyyyMMddHHmmss}{extension}";
            var filePath = Path.Combine(uploadDir, newFileName);

            // Save file
            using (var outputStream = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.CopyToAsync(outputStream);
            }

            // Return relative path for database storage
            return $"/uploads/companies/{companyId}/logos/{newFileName}";
        }

        public async Task<bool> DeleteLogoFileAsync(string? logoPath, string webRootPath)
        {
            if (string.IsNullOrEmpty(logoPath))
                return true;

            try
            {
                var fullPath = Path.Combine(webRootPath, logoPath.TrimStart('/'));
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        private CompanyAddressDto? ParseAddress(string? addressJson)
        {
            if (string.IsNullOrEmpty(addressJson))
                return null;

            try
            {
                return JsonSerializer.Deserialize<CompanyAddressDto>(addressJson);
            }
            catch
            {
                return null;
            }
        }

        private string? SerializeAddress(CompanyAddressDto? address)
        {
            if (address == null)
                return null;

            try
            {
                return JsonSerializer.Serialize(address);
            }
            catch
            {
                return null;
            }
        }

        private object? ParseDocumentSettings(string? settingsJson)
        {
            if (string.IsNullOrEmpty(settingsJson))
                return null;

            try
            {
                return JsonSerializer.Deserialize<object>(settingsJson);
            }
            catch
            {
                return null;
            }
        }

        private string? SerializeDocumentSettings(object? settings)
        {
            if (settings == null)
                return null;

            try
            {
                return JsonSerializer.Serialize(settings);
            }
            catch
            {
                return null;
            }
        }
    }
}
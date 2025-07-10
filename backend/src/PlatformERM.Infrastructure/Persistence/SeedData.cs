using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlatformERM.Domain.Entities;

namespace PlatformERM.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedDevelopmentData(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Check if we already have companies
        if (await context.Companies.AnyAsync())
        {
            return; // Data already seeded
        }

        // Add test companies
        var companies = new[]
        {
            new Company
            {
                TenantId = "demo",
                Name = "Acme Landscaping Inc.",
                LegalName = "Acme Landscaping Incorporated",
                TaxId = "12-3456789",
                Website = "https://acmelandscaping.com",
                Phone = "(555) 123-4567",
                Email = "info@acmelandscaping.com",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Company
            {
                TenantId = "demo",
                Name = "Green Thumb Commercial Services",
                LegalName = "Green Thumb Commercial Services LLC",
                TaxId = "98-7654321",
                Website = "https://greenthumbcommercial.com",
                Phone = "(555) 987-6543",
                Email = "contact@greenthumbcommercial.com",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        context.Companies.AddRange(companies);
        await context.SaveChangesAsync();
    }
}
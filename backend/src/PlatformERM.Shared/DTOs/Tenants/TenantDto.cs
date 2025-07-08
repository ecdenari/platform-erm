namespace PlatformERM.Shared.DTOs.Tenants;

public class TenantDto
{
    public int Id { get; set; }
    public string Identifier { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public List<string> Features { get; set; } = new();
    public TenantBrandingDto Branding { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class TenantBrandingDto
{
    public string PrimaryColor { get; set; } = "#3b82f6";
    public string? LogoUrl { get; set; }
    public string? FaviconUrl { get; set; }
}

public class CreateTenantDto
{
    public string Identifier { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public List<string> Features { get; set; } = new();
    public TenantBrandingDto Branding { get; set; } = new();
}

public class UpdateTenantDto
{
    public string Name { get; set; } = string.Empty;
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public List<string> Features { get; set; } = new();
    public TenantBrandingDto Branding { get; set; } = new();
    public bool IsActive { get; set; }
}
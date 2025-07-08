using System.Text.Json;

namespace PlatformERM.Domain.Entities;

/// <summary>
/// Represents a tenant in the multi-tenant system
/// </summary>
public class Tenant
{
    public int Id { get; set; }
    
    /// <summary>
    /// Unique identifier for the tenant (e.g., "demo", "acme-corp")
    /// </summary>
    public string Identifier { get; set; } = string.Empty;
    
    /// <summary>
    /// Display name of the tenant
    /// </summary>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Subdomain for the tenant (e.g., "acme" for acme.platform-erm.com)
    /// </summary>
    public string Subdomain { get; set; } = string.Empty;
    
    /// <summary>
    /// API key for external system access
    /// </summary>
    public string ApiKey { get; set; } = Guid.NewGuid().ToString();
    
    /// <summary>
    /// Primary contact email for the tenant
    /// </summary>
    public string? ContactEmail { get; set; }
    
    /// <summary>
    /// Primary contact phone for the tenant
    /// </summary>
    public string? ContactPhone { get; set; }
    
    /// <summary>
    /// JSON settings for the tenant (stored as JSONB in PostgreSQL)
    /// </summary>
    public string Settings { get; set; } = "{}";
    
    /// <summary>
    /// Is the tenant currently active?
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// When the tenant was created
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// When the tenant was last updated
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
    
    /// <summary>
    /// Get tenant settings as TenantSettings object
    /// </summary>
    public TenantSettings GetSettings()
    {
        if (string.IsNullOrEmpty(Settings) || Settings == "{}")
        {
            return new TenantSettings();
        }
        return JsonSerializer.Deserialize<TenantSettings>(Settings) ?? new TenantSettings();
    }
    
    /// <summary>
    /// Set tenant settings from TenantSettings object
    /// </summary>
    public void SetSettings(TenantSettings settings)
    {
        Settings = JsonSerializer.Serialize(settings);
    }
}

/// <summary>
/// Tenant settings stored as JSON
/// </summary>
public class TenantSettings
{
    public List<string> Features { get; set; } = new();
    public TenantBranding Branding { get; set; } = new();
}

/// <summary>
/// Tenant branding configuration
/// </summary>
public class TenantBranding
{
    /// <summary>
    /// Primary brand color (hex format)
    /// </summary>
    public string PrimaryColor { get; set; } = "#3b82f6";
    
    /// <summary>
    /// URL to the tenant's logo
    /// </summary>
    public string? LogoUrl { get; set; }
    
    /// <summary>
    /// Favicon URL
    /// </summary>
    public string? FaviconUrl { get; set; }
}
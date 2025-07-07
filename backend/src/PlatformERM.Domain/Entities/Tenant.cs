namespace PlatformERM.Domain.Entities;

public class Tenant
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string Plan { get; set; } = "starter";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Settings { get; set; } = "{}";
    public string PrimaryColor { get; set; } = "#007bff";
    public string? Logo { get; set; }
}
using PlatformERM.Domain.Common;

namespace PlatformERM.Domain.Entities.Estimates;

/// <summary>
/// Junction entity for kit components
/// Allows bundling multiple items together with quantities
/// </summary>
public class KitItem : BaseEntity
{
    public string KitId { get; set; } = string.Empty;
    public string ComponentItemId { get; set; } = string.Empty;
    
    public decimal Quantity { get; set; } = 1;
    public int SortOrder { get; set; } = 0;
    public bool IsOptional { get; set; } = false;
    
    // Navigation properties
    public virtual ItemCatalog Kit { get; set; } = null!;
    public virtual ItemCatalog ComponentItem { get; set; } = null!;
}
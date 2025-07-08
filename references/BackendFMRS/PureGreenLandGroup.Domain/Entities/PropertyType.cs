using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities
{
    public class PropertyType
    {
        [Key]
        public int Id { get; set; }
        public int PropertyTypeID { get; set; }
        public string? TypeName { get; set; } = default!;
        public string? PropertyTypeIntegrationCode { get; set; } = default!;
        public bool IsActive { get; set; }
        public bool Active { get; set; }
        public int? CreatedByUserID { get; set; }
        public string? CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public int? ModifiedByUserID { get; set; }
        public string? ModifiedByUserName { get; set; } = default!;
        public DateTime ModifiedDate { get; set; }
    }
} 
using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities
{
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Phone { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string? Email { get; set; }

        [StringLength(500)]
        public string? Website { get; set; }

        [StringLength(1000)]
        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public virtual ICollection<MstUsersDetails> Users { get; set; } = new List<MstUsersDetails>();
        public virtual CompanySettings? Settings { get; set; }
    }
}
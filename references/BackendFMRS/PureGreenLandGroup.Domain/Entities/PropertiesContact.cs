using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class PropertiesContact
    {
        [Key]
        public int Id { get; set; }
        public int? ContactID { get; set; }
        public string? ContactName { get; set; } = default!;
        public bool PrimaryContact { get; set; }
        public bool BillingContact { get; set; }
        public bool EmailInvoiceContact { get; set; }
        public bool EmailNotificationsContact { get; set; }
        public int? CompanyID { get; set; }
        public string? CompanyName { get; set; } = default!;
        public bool SMSNotificationsContact { get; set; }
        public int? CreatedByUserID { get; set; }
        public string? CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDateTime { get; set; }
        public string? LastModifiedByUserID { get; set; }
        public string? LastModifiedByUserName { get; set; } = default!;
        public string? LastModifiedDateTime { get; set; }

        [ForeignKey("Properties")] // Specify the foreign key relationship
        public int PropertyId { get; set; }

        // Navigation property to access the related Properties entity
        public virtual Properties Properties { get; set; } = default!;
    }
}

namespace PureGreenLandGroup.Models.DTO.Properties
{
    public class PropertiesContactVM
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
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
    }
}

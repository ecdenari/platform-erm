namespace PureGreenLandGroup.Models.DTO.Properties
{
    public class PropertyContactDTO
    {
        public int Id { get; set; }
        public int? ContactID { get; set; }
        public string? ContactName { get; set; }
        public bool PrimaryContact { get; set; }
        public bool BillingContact { get; set; }
        public bool EmailInvoiceContact { get; set; }
        public bool EmailNotificationsContact { get; set; }
        public int? CompanyID { get; set; }
        public string? CompanyName { get; set; }
        public bool SMSNotificationsContact { get; set; }
        public int PropertyId { get; set; }
    }
} 
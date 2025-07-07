namespace PureGreenLandGroup.Models.DTO.Properties
{
    public class PropertiesVM
    {
        public int Id { get; set; }
        public int PropertyID { get; set; }
        public bool IsActive { get; set; }
        public int? PropertyStatusID { get; set; }
        public string? PropertyStatusName { get; set; } = default!;
        public int? BranchID { get; set; }
        public string? BranchName { get; set; } = default!;
        public string? BranchCode { get; set; } = default!;
        public int? AccountOwnerContactID { get; set; }
        public string? AccountOwnerContactName { get; set; } = default!;
        public int? ProductionManagerContactID { get; set; }
        public string? ProductionManagerContactName { get; set; }
        public int? PropertyAddressID { get; set; }
        public string? CountyID { get; set; }
        public string? PropertyAddressLine1 { get; set; } = default!;
        public string? PropertyAddressLine2 { get; set; } = default!;
        public string? PropertyAddressCity { get; set; } = default!;
        public string? PropertyAddressStateProvinceCode { get; set; } = default!;
        public string? PropertyAddressZipCode { get; set; } = default!;
        public string? LocalityID { get; set; }
        public string? LocalityName { get; set; } = default!;
        public int? IndustryID { get; set; }
        public string? IndustryName { get; set; } = default!;
        public string? LeadSourceID { get; set; }
        public string? LeadSourceName { get; set; } = default!;
        public int? TaxJurisdictionID { get; set; }
        public string? TaxJurisdictionName { get; set; } = default!;
        public int? PropertyGroupID { get; set; }
        public string? ActiveOpportunityID { get; set; }
        public string? CompetitorID { get; set; }
        public string? PropertyGroupName { get; set; } = default!;
        public string? PropertyName { get; set; } = default!;
        public string? PropertyNameAbr { get; set; } = default!;
        public string? SequenceNumber { get; set; } = default!;
        public string? ProductionNote { get; set; } = default!;
        public bool Active { get; set; }
        public string? EmailInvoice { get; set; }
        public string? Budget { get; set; }
        public string? Note { get; set; } = default!;
        public int? CreatedByUserID { get; set; }
        public string? CreatedByUserName { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
        public string? GEOPerimeter { get; set; }
        public string? GEOLocationLatitude { get; set; }
        public string? GEOLocationLongitude { get; set; }
        public int? PaymentTermsID { get; set; }
        public string? PaymentTermsName { get; set; } = default!;
        public string? SeparateInvoices { get; set; }
        public string? Website { get; set; } = default!;
        public int? ModifiedByUserID { get; set; }
        public string? ModifiedByUserName { get; set; } = default!;
        public DateTime ModifiedDate { get; set; }
        public string? DragDropGeoLocation { get; set; } = default!;
        public bool GPSUpdated { get; set; }
        public string? GPSGeofenceID { get; set; }
        public string? SnowNote { get; set; } = default!;
        public string? EarliestOpportunityWonDate { get; set; }
        public string? CollectionNotes { get; set; } = default!;
        public string? IntegrationID { get; set; }
        public int? PropertyTypeID { get; set; }
        public string? PropertyType { get; set; } = default!;
        public string? PropertyTypeIntegrationCode { get; set; }
    }
}

namespace PureGreenLandGroup.Models.DTO.Equipment
{
    public class EquipmentsVM
    {
        public int EquipmentID { get; set; }
        public int EquipmentModelID { get; set; }
        public int BranchID { get; set; }
        public int DivisionID { get; set; }
        public int? PropertyID { get; set; }
        public int? RouteID { get; set; }
        public string Description { get; set; }
        public int ModelYear { get; set; }
        public string AssetNumber { get; set; }
        public DateTime RequestedDate { get; set; }
        public int RequestedUserID { get; set; }
        public DateTime ApprovedDate { get; set; }
        public int ApprovedUserID { get; set; }
        public DateTime PurchasedDate { get; set; }
        public int PurchasedUserID { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime InServiceDate { get; set; }
        public int InServiceUserID { get; set; }
        public DateTime? OutOfServiceDate { get; set; }
        public int? OutOfServiceUserID { get; set; }
        public DateTime? DisposedDate { get; set; }
        public int? DisposedUserID { get; set; }
        public int? EquipmentDisposalReasonID { get; set; }
        public decimal? DisposedPrice { get; set; }
        public string SerialNumber { get; set; }
        public string EngineNumber { get; set; }
        public bool Active { get; set; }
        public int WarrantyDays { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int CreatedByUserID { get; set; }
        public DateTime LastModifiedDateTime { get; set; }
        public int LastModifiedByUserID { get; set; }
        public int EquipmentStatusID { get; set; }
        public string FinancingBank { get; set; }
        public int PaySchedule { get; set; }
        public string PlateNumber { get; set; }
        public DateTime? RenewalDate { get; set; }
        public int GrossVehicleWeight { get; set; }
        public string Dealer { get; set; }
        public int MileageHours { get; set; }
        public decimal EstimatedPurchasePrice { get; set; }
        public string AspireGPSIdentifier { get; set; }
        public string TrackerType { get; set; }
        public string EquipmentModelName { get; set; }
        public string BranchName { get; set; }
        public string DivisionName { get; set; }
        public string PropertyName { get; set; }
        public string RouteName { get; set; }
        public string RequestedUserName { get; set; }
        public string ApprovedUserName { get; set; }
        public string PurchasedUserName { get; set; }
        public string InServiceUserName { get; set; }
        public string OutOfServiceUserName { get; set; }
        public string DisposedUserName { get; set; }
        public string CreatedByUserName { get; set; }
        public string LastModifiedByUserName { get; set; }
        public string EquipmentDisposalReason { get; set; }
        public string EquipmentStatusName { get; set; }
    }
}

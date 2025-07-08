namespace PureGreenLandGroup.Models.DTO.Equipment
{
    public class EqpSyncLogsVM
    {
        public int Id { get; set; }
        public int RecordCreated { get; set; }
        public int RecordUpdated { get; set; }
        public string CreatedAssetDescription { get; set; }
        public string UpdatedAssetDescription { get; set; }
        public bool ExecutionStatus { get; set; }
        public DateTime ExecutionDateTime { get; set; }
    }
}

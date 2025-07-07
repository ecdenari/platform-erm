using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.SchedulerEntities
{
    public class EquipmentSynLog
    {
        [Key]
        public int Id { get; set; }
        public int RecordCreated { get; set; }
        public int RecordUpdated { get; set; }
        public string? CreatedAssetDescription { get; set; }
        public string? UpdatedAssetDescription { get; set; }
        public string? ExecutionStatus { get; set; }
        public DateTime ExecutionDateTime { get; set; }

    }
}

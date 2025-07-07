using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.SchedulerEntities
{
    public class EquipmentAssetIds
    {
        [Key]
        public int Id { get; set; }
        public int MaintainXAssetId { get; set; }
        public int YourAspireEquipmentId { get; set; }
    }
}

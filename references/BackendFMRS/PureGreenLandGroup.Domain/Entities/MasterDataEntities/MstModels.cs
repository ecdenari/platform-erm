#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities.MasterDataEntities
{
    public class MstModels
    {
        [Key]
        public int Id { get; set; }
        public string ModelName { get; set; }
        public bool IsActive { get; set; }

        // Foreign key property
        public int? ManufacturerId { get; set; }

        // Navigation property
        [ForeignKey("ManufacturerId")]
        public virtual MstManufacturer MstManufacturer { get; set; }

    }
}

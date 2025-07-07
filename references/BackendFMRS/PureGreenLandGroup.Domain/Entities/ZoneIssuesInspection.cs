using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PureGreenLandGroup.Domain.Entities
{
    public class ZoneIssuesInspection
    {
        [Key]
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public int InspectionId { get; set; }
        public string? ValveStatus { get; set; }
        public int CloggedNozzle { get; set; } //clogged nozzle = MprCloggedNozzle + VanCloggedNozzle
        //new add on below 2 props for clogged nozzle
        public int MprCloggedNozzle { get; set; }
        public int VanCloggedNozzle { get; set; }
        public int BrokenSpray { get; set; }
        public int BrokenRotor { get; set; }
        public int RaiseLower { get; set; }
        public int Move { get; set; }
        public int Area { get; set; }
        public string? GpmValue { get; set; }
        public string? Comment { get; set; }
        public bool IsSplice { get; set; }
        public int SpliceCount { get; set; }
        public bool IsLinearRepair { get; set; }
        public int? LinearRepairValueId { get; set; }

        // Navigation property
        [ForeignKey("InspectionId")]
        public virtual Inspection Inspection { get; set; }
    }
}

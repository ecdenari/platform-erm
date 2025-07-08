using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Domain.Entities.InspectionEntities
{
    public class CatalogMappingLabel
    {
        [Key]
        public int Id { get; set; }

        public string? ValveIssueValue { get; set; }

        public string? DecoderIssueValue { get; set; }
        public string? SolenoidIssueValue { get; set; }

        public string? MprNozzleValue { get; set; }

        public string? VanNozzleValue { get; set; }

        public string? BrokenSprayValue { get; set; }

        public string? BrokenRotorValue { get; set; }

       // public string? RaiseLowerValue { get; set; }

        public string? BrokenLateralValue { get; set; }

        public string? BrokenMainValue { get; set; }
    }
}

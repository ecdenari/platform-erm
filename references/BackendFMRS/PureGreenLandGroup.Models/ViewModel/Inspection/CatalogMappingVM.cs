using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class CatalogMappingVM
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter valve issue mapping value")]
        public string? ValveIssueValue { get; set; }

        [Required(ErrorMessage = "Please enter decoder issue mapping value")]
        public string? DecoderIssueValue { get; set; }


        [Required(ErrorMessage = "Please enter solenoid issue mapping value")]
        public string? SolenoidIssueValue { get; set; }


        [Required(ErrorMessage = "Please enter mpr nozzle mapping name")]
        public string? MprNozzleValue { get; set; }


        [Required(ErrorMessage = "Please enter VAN nozzle mapping name")]
        public string? VanNozzleValue { get; set; }


        [Required(ErrorMessage = "Please enter broken spray mapping name")]
        public string? BrokenSprayValue { get; set; }


        [Required(ErrorMessage = "Please enter broken rotor mapping name")]
        public string? BrokenRotorValue { get; set; }

        //[Required(ErrorMessage = "Please enter raise/lower mapping name")]
        //public string? RaiseLowerValue { get; set; }


        [Required(ErrorMessage = "Please enter broken lateral mapping name")]
        public string? BrokenLateralValue { get; set; }


        [Required(ErrorMessage = "Please enter broken main mapping name")]
        public string? BrokenMainValue { get; set; }
    }
}

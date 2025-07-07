using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ProgramRunTimeViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Zone runtime value is required!")]
        [RegularExpression(@"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Please enter a valid time in the format 00:00.")]
        public string Value { get; set; }
        public bool IsActive { get; set; }

    }
}

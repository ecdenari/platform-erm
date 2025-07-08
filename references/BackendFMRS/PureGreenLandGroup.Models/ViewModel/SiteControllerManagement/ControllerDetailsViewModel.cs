using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ControllerDetailsViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter controller name!")]
        public string ControllerName { get; set; } = string.Empty;
        public int PropertyId { get; set; }

        [Required(ErrorMessage = "Please select manufacturer!")]
        public int ManufacturerId { get; set; }
        public int ModelId { get; set; }
        public int WaterSourceId { get; set; }
        public string? Location { get; set; }
        public string? Notes { get; set; }
        public long Faults { get; set; }
        public bool IsRainSensor { get; set; }

        [Required(ErrorMessage = "Please select wire type!")]
        public int ControllerType { get; set; } //either conventional or 2 wire system

    }
}

using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ManufacturerViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Manufacturer name is required!")]
        public string? ManufacturerName { get; set; }
        public bool IsActive { get; set; }

    }
}

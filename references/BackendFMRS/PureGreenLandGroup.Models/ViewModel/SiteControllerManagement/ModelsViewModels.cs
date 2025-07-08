using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ModelsViewModels
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Model name is required!")]
        public string? ModelName { get; set; }
        public bool IsActive { get; set; }

        [Required(ErrorMessage = "Please select manufacturer!")]
        public int ManufacturerId { get; set; }


    }
}

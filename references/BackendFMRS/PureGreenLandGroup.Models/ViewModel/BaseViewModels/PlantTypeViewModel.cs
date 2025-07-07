using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.BaseViewModels
{
    public class PlantTypeViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Plant type name is required!")]
        public string PlantTypeName { get; set; }
        public bool IsActive { get; set; }

    }
}

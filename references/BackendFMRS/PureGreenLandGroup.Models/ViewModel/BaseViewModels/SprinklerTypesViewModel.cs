using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.BaseViewModels
{
    public class SprinklerTypesViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Sprinkler type name is required!")]
        public string? SprinklerTypeName { get; set; }
        public bool IsActive { get; set; }

    }
}

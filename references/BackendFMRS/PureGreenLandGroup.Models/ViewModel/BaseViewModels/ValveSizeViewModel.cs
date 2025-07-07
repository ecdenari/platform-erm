using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.BaseViewModels
{
    public class ValveSizeViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Valve size is required!")]
        public string? ValveSizenames { get; set; }
        public bool IsActive { get; set; }

    }
}

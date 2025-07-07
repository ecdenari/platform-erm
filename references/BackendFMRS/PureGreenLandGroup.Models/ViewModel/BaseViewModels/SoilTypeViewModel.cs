using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.BaseViewModels
{
    public class SoilTypeViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Soil type name is required!")]
        public string SoilTypeName { get; set; }
        public bool IsActive { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class SeasonalAdjustDropdownViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Seasonal adjust value is required!")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Please enter only positive numeric values.")]
        public int? Value { get; set; }
        public bool IsActive { get; set; }

    }
}

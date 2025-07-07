
namespace PureGreenLandGroup.Models.ViewModel.BaseViewModels
{
    public class ModelGridListVM
    {
        public int Id { get; set; }
        public string? ModelName { get; set; }
        public bool IsActive { get; set; }
        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }
    }
}

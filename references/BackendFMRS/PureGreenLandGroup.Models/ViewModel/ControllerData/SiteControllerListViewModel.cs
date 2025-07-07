using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.Models.ViewModel.ControllerData
{
    public class SiteControllerListViewModel
    {
        public int PropertyId { get; set; }
        public List<GetControllersListViewModel> ControllersList { get; set; }
    }
}

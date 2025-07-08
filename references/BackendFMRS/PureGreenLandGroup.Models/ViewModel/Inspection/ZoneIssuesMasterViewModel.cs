using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class ZoneIssuesMasterViewModel
    {
        public ZoneViewModel? ZoneViewModel { get; set; }
        public List<ValveSizeViewModel>? ValveSizeList { get; set; }
        public List<SprinklerTypesViewModel>? SprinklerTypesList { get; set; }
        public List<PlantTypeViewModel>? PlantTypeList { get; set; }
        public List<SoilTypeViewModel>? SoilTypeList { get; set; }
        public List<SlopeViewModel>? SlopeList { get; set; }
        public List<ZoneAreaDropDownViewModel>? ZoneAreaDropDown { get; set; }
    }
}

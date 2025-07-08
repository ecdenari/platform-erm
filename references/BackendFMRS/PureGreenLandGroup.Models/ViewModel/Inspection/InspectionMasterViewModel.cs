using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;

namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectionMasterViewModel
    {
        public GetControllersListViewModel GetControllersViewModel { get; set; }

        public IList<ProgramViewModel>? ProgramDetailsList { get; set; }

        public IList<SeasionalAdjustViewModel>? SeasionalAdjustList { get; set; }
        public IList<ZoneViewModel>? ZonesList { get; set; }

        public CreateInspectionViewModel CreateInspectionViewModel { get; set; }


        /*--------------------Master data props----------------------------*/
        public List<ZoneIssuesDropDownViewModel>? ZoneIssuesDropDown { get; set; }
        public List<BrokenLateralDropdownViewModel>? BrokenLateralDropdown { get; set; }

        public List<ValveSizeViewModel>? ValveSizeList { get; set; }
        public List<SprinklerTypesViewModel>? SprinklerTypesList { get; set; }
        public List<PlantTypeViewModel>? PlantTypeList { get; set; }
        public List<SoilTypeViewModel>? SoilTypeList { get; set; }
        public List<ModelsViewModels>? ModelsList { get; set; }
        public List<ZoneAreaDropDownViewModel>? ZoneAreaDropDown { get; set; }
        public List<ManufacturerViewModel>? ManufacturerList { get; set; }

    }
}

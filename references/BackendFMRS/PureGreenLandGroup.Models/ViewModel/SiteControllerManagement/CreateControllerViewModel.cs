using PureGreenLandGroup.Models.ViewModel.BaseViewModels;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class CreateControllerViewModel
    {
        public PropertyViewModel PropertyViewModel { get; set; }

        public ControllerDetailsViewModel ControllerViewModel { get; set; }

        public IList<ProgramViewModel> ProgramsListViewModel { get; set; }

        public IList<ZoneViewModel> ControllerZonesList { get; set; }

        public List<ValveSizeViewModel>? ValveSizeList { get; set; }
        public List<SprinklerTypesViewModel>? SprinklerTypesList { get; set; }
        public List<PlantTypeViewModel>? PlantTypeList { get; set; }
        public List<SoilTypeViewModel>? SoilTypeList { get; set; }
        public List<WaterSourceViewModel>? WaterSourceList { get; set; }
        public List<ModelsViewModels>? ModelsList { get; set; }
        public List<ManufacturerViewModel>? ManufacturerList { get; set; }

        public List<ProgramRunTimeViewModel> ProgramRunTime { get; set; }
        public List<ProgramStartTimeViewModel> ProgramStartTime { get; set; }

        public SeasonalAdjutMasterViewModel SeasonalAdjutMasterViewModels { get; set; }

    }
}

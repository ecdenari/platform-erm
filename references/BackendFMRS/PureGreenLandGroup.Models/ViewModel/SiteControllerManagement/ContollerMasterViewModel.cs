using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using System.Text.Json.Serialization;

namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ContollerMasterViewModel
    {
        
        public ControllerDetailsViewModel? ControllerDetailsViewModel { get; set; }
        public List<ControllerProgramsDetailsViewModel>? ProgramDetailsList { get; set; }

        [JsonPropertyName("valveSizes")]
        public List<ValveSizeViewModel>? ValveSizeList { get; set; }
        public List<SprinklerTypesViewModel>? SprinklerTypesList { get; set; }
        public List<PlantTypeViewModel>? PlantTypeList { get; set; }
        public List<SoilTypeViewModel>? SoilTypeList { get; set; }
        public List<SlopeViewModel>? SlopeList { get; set; }
        public List<MoreOrLessViewModel>? MoreOrLessList { get; set; }
        public List<WeekDaysViewModel>? WeekDaysList { get; set; }
        public List<ProgramRunTimeViewModel>? ProgramRunTimeList { get; set; }
        public List<ManufacturerViewModel>? ManufacturerList { get; set; }


    }
}

using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;

namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class ZoneIssuesInspectionViewModel
    {
        public int Id { get; set; }
        public int InspectionId { get; set; }
        public int ZoneId { get; set; }
        public string? ValveStatus { get; set; }
        public int CloggedNozzle { get; set; } //clogged nozzle = MprCloggedNozzle + VanCloggedNozzle
        //new add on below 2 props for clogged nozzle
        public int MprCloggedNozzle { get; set; }
        public int VanCloggedNozzle { get; set; }

        public bool IsSplice { get; set; }
        public int SpliceCount { get; set; }
        public bool IsLinearRepair { get; set; }
        public int? LinearRepairValueId { get; set; }

        public int BrokenSpray { get; set; }
        public int BrokenRotor { get; set; }
        public int RaiseLower { get; set; }
        public int Move { get; set; }
        public int Area { get; set; }
        public string? GpmValue { get; set; }
        public string? Comment { get; set; }
        public ZoneViewModel? ZoneViewModel { get; set; }
        public IList<InspectedZoneBrokenLateralViewModel>? InspectedZoneBrokenLateralList { get; set; }
        public IList<InspectedZoneBrokenMainViewModel>? InspectedZoneBrokenMainViewModel { get; set; }
        public IList<InspectedZoneImagesViewModel>? InspectedZoneImagesList { get; set; }
        //public InspectedCloggedNozzleVM InspectedCloggedNozzleVM { get; set; }
        public IList<InspectedMoveHeadVM>? InspectedMoveHeadList { get; set; }
        public InspectedValveFailVM? InspectedValveFailVM { get; set; }
    }
}

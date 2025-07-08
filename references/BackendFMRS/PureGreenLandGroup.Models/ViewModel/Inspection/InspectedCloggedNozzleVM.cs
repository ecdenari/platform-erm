namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectedCloggedNozzleVM
    {
        public int Id { get; set; }

        public int ZoneIssuesInspectionId { get; set; }

        public int MrpNozzle { get; set; }
        public int VanNozzle { get; set; }
    }
}

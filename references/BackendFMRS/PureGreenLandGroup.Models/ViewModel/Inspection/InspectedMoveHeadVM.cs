namespace PureGreenLandGroup.Models.ViewModel.Inspection
{
    public class InspectedMoveHeadVM
    {
        public int Id { get; set; }

        public int ZoneIssuesInspectionId { get; set; }

        public int MoveHeadId { get; set; }//only two value are there for move head [Move<3, Move>3]
    }
}

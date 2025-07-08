namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class InspectionViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ControllerId { get; set; }
        public int PropertyId { get; set; }
        public DateTime InspectionDate { get; set; }
        public int UserId { get; set; }
        public ControllerDetailsViewModel ControllerDetailsViewModel { get; set; }
        public PropertyViewModel PropertyViewModel { get; set; }

    }
}

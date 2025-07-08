namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class GetControllersListViewModel
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public string? ControllerName { get; set; }
        public string? ControllerLocation { get; set; }
        public int TotalZones { get; set; }
        public string? PropertyName { get; set; }
        public string? PropertyAddress { get; set; }
        public string? Model { get; set; }
        public string? Manufacturer { get; set; }
        //public int ManufacturerId { get; set; }
        public long Faults { get; set; }



        /******  these props needed for inspection details for pdf ********/
        public bool RainSensor { get; set; }
        public int ControllerType { get; set; }
        //public string IsRainSesnorFunctioning { get; set; }
        public string? WaterSource { get; set; }
        public string? InspectorName { get; set; }
        public string? InspectionType { get; set; }
        public string? WaterPressure { get; set; }
        public string? InspectionComment { get; set; }
        public DateTime InspectionDate { get; set; }
    }
}

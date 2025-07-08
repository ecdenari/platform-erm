namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ZoneViewModel
    {
        public int Id { get; set; }
        public int? ControllerId { get; set; }
        public string? ZoneLocationName { get; set; }
        public string? Description { get; set; }

        public string? ProgramA { get; set; }
        public string? ProgramB { get; set; }
        public string? ProgramC { get; set; }
        public string? ProgramD { get; set; }
        public int? ValveSizeId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? FlowRate { get; set; }
        public int? SprinkleTypeId { get; set; }
        public int? PlantTypeId { get; set; }
        public int? SoilTypeId { get; set; }
      
        public bool IsDeleted { get; set; }

    }
}

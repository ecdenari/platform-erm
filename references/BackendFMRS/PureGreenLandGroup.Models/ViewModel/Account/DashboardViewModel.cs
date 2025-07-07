using PureGreenLandGroup.Models.ViewModel.Reports;

namespace PureGreenLandGroup.Models.ViewModel.Account
{
    public class DashboardViewModel
    {
        //for first section - graph + statistics
        public long FaultyZone { get; set; }
        public long NonFaultyZone { get; set; }
        public long TotalZone { get; set; }
        public long TotalWeeklyRuntimeMinutes { get; set; }
        public long TotalProperty { get; set; }

        public long TotalController { get; set; }



        //for Inspection statistics
        public long TotalInspection { get; set; }
        public long DraftInspection { get; set; }
        public long CompleteInspection { get; set; }

        //for Administration statistics
        public long TotalManufacturer { get; set; }
        public long TotalModel { get; set; }
        public long TotalPlantType { get; set; }
        public long TotalSoilType { get; set; }
        public long TotalSprinklers { get; set; }
        public long TotalValveSize { get; set; }
        public long TotalSeasonalAdjustMonth { get; set; }
        public long TotalProgramRuntime { get; set; }

        //Monthly Inspection bar graph data
        public string CompletedInspectionOfYear { get; set; }

        //Yearly Inspection bar graph data
        public string WeeklyRuntime { get; set; }


        //reports prop
        public List<ControllerTimeDetailsVM> ControllerTimeDetailsListVM { get; set; }




    }
}

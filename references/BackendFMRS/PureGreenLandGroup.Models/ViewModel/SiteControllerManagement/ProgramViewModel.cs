namespace PureGreenLandGroup.Models.ViewModel.SiteControllerManagement
{
    public class ProgramViewModel
    {
        public int Id { get; set; }
        public string? ProgramName { get; set; }
        public int? ControllerId { get; set; }

        public bool IsSunEnable { get; set; }
        public bool IsMonEnable { get; set; }
        public bool IsTueEnabled { get; set; }
        public bool IsWedEnabled { get; set; }
        public bool IsThuEnabled { get; set; }
        public bool IsFriEnabled { get; set; }
        public bool IsSatEnabled { get; set; }


        //timer 1
        public string ProgramTimer1 { get; set; }
        public string Timer1Median { get; set; }

        //timer 2
        public string ProgramTimer2 { get; set; }
        public string Timer2Median { get; set; }

        //timer 3
        public string ProgramTimer3 { get; set; }
        public string Timer3Median { get; set; }

    }
}

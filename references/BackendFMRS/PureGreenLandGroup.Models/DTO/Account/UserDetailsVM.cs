namespace PureGreenLandGroup.Models.DTO.Account
{
    public class UserDetailsVM
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public bool IsActive { get; set; }
        public DateOnly? CreatedDate { get; set; }
        public string? Role { get; set; }
    }
}

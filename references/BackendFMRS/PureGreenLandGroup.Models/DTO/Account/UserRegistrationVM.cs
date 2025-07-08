using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.DTO.Account
{
    public class UserRegistrationVM
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        public string? LastName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email address is required.")]
        public string? Email { get; set; }

        [StringLength(12, MinimumLength = 12, ErrorMessage = "Phone number must be 10 digit")]
        [DataType(DataType.PhoneNumber)]
        public string? Phone { get; set; }
        public bool Active { get; set; }
        public string? CreatedByUser { get; set; }
        public DateOnly? CreatedDate { get; set; }

        [RegularExpression(@"^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$", ErrorMessage = "Password should contain one uppercase, lowercase alphabet, numeric and special symbol")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }

        [RegularExpression(@"^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$", ErrorMessage = "Password should contain one uppercase, lowercase Alphabet, numeric and special symbol")]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Confirm Password is required.")]
        [Compare("Password", ErrorMessage = "Password doesn't match.")]
        public string? ConfirmPassword { get; set; }

        public int RoleId { get; set; }
    }
}

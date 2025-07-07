using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.Models.DTO.WebAuthentication
{
    public class LoginUserVM
    {
        [EmailAddress]
        [Required(ErrorMessage = "The email address is required")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [RegularExpression(@"^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$", ErrorMessage = "Password should contain one uppercase, lowercase alphabet, numeric and special symbol")]
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}

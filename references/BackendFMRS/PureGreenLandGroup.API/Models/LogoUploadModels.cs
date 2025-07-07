using System.ComponentModel.DataAnnotations;

namespace PureGreenLandGroup.API.Models
{
    public class LogoUploadRequest
    {
        [Required]
        public IFormFile File { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string LogoType { get; set; } = string.Empty; // "primary", "login", "document"
    }

    public class LogoUploadResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? LogoPath { get; set; }
    }
}
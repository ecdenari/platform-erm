using System.Net.Mail;

namespace PureGreenLandGroup.Services.IServices
{
    /// <summary>
    /// instantiated for web so it wont work for API
    /// </summary>
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(List<string> receivers, string subject, string body, Attachment attachment);

    }
}

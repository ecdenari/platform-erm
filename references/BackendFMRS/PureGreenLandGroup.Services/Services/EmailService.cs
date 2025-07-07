using PureGreenLandGroup.Services.IServices;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using System.Net;

namespace PureGreenLandGroup.Services.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //general method to send  email
        public async Task<bool> SendEmailAsync(List<string> receivers, string subject, string body, Attachment attachment)
        {
            try
            {
                bool isEmailSent = false;
                var mailSettings = "MailSettings";
                var systemEmail = _configuration.GetSection(mailSettings)["Mail"]!.ToString();
                var appPassword = _configuration.GetSection(mailSettings)["AppPassword"]!.ToString();
                var host = _configuration.GetSection(mailSettings)["Host"]!.ToString();
                var DisplayName = _configuration.GetSection(mailSettings)["DisplayName"]!.ToString();
                var port = Convert.ToInt32(_configuration.GetSection(mailSettings)["Port"]);

                if (!string.IsNullOrEmpty(systemEmail) && !string.IsNullOrEmpty(appPassword) && !string.IsNullOrEmpty(host) && port > 0)
                {
                    MailAddress from = new(systemEmail.Trim(), DisplayName);

                    // Create MailMessage object
                    MailMessage mm = new();
                    mm.From = from;

                    // Add multiple receiver addresses
                    foreach (var receiverEmail in receivers)
                    {
                        if (!string.IsNullOrWhiteSpace(receiverEmail))
                        {
                            mm.To.Add(new MailAddress(receiverEmail.Trim()));
                        }
                    }

                    //create receiver address
                    MailAddress receiver = new(receivers.FirstOrDefault().Trim());

                    mm.Subject = subject;
                    mm.Body = body;
                    mm.IsBodyHtml = true;
                   
                    if (attachment != null)
                    {
                        mm.Attachments.Add(attachment);
                    }

                    using (SmtpClient smtp = new(host, port))
                    {
                        smtp.EnableSsl = true;
                        NetworkCredential credential = new(systemEmail, appPassword);
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = credential;
                        await smtp.SendMailAsync(mm);
                        isEmailSent = true;
                    }
                }
                return isEmailSent;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //method to send email with attatchments
    }
}

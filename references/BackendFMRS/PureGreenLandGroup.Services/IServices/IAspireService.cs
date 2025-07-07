using Microsoft.AspNetCore.Http;
using PureGreenLandGroup.Models.DTO.Authentication;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IAspireService
    {
        /// <summary>
        /// To get API auth token for third party API (Your aspire)
        /// </summary>
        /// <returns></returns>
        public Task<AspireToken> GetAspireAPIToken();

        /// <summary>
        /// import users in our database
        /// </summary>
        /// <param name="usersFile"></param>
        /// <returns></returns>

        Task<string> SaveApplicationUser(IFormFile usersFile);

        /// <summary>
        /// fetch properties data from aspire api and save in db
        /// </summary>
        /// <returns></returns>

        Task<string> SaveProperties();

        /// <summary>
        /// fetch branches data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        Task<string> SaveBranches();

        /// <summary>
        /// fetch property statuses data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        // Task<string> SavePropertyStatuses();

        /// <summary>
        /// fetch property types data from aspire api and save in db
        /// </summary>
        /// <returns></returns>
        // Task<string> SavePropertyTypes();
    }
}

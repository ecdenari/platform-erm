using System.Net.Http.Headers;

namespace PureGreenLandGroup.Web.Filter
{
    public static class HttpClientHelper 
    {
        /// <summary>
        /// generic method to set the jwt token in the api request
        /// </summary>
        /// <param name="httpClient"></param>
        /// <param name="httpContextAccessor"></param>
        public static void SetAuthorizationHeader(HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
        {
            var token = httpContextAccessor.HttpContext!.Session.GetString("APIAccessToken");
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
        }
    }
}

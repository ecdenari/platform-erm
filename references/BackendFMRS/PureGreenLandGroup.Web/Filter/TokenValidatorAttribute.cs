using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace PureGreenLandGroup.Web.Filter
{
    public class TokenValidatorAttribute: ActionFilterAttribute
    {
        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            var httpContextAccessor = (IHttpContextAccessor)httpContext.RequestServices.GetService(typeof(IHttpContextAccessor));
            var session = httpContextAccessor.HttpContext.Session;
            var token = session.GetString("APIAccessToken");

            if (string.IsNullOrEmpty(token))
            {
                context.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "Account" }, { "action", "Login" } });
                return;
            }
            await next();
        }

    }
}

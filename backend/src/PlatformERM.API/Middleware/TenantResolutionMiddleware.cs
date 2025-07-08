using PlatformERM.Application.Common.Interfaces;

namespace PlatformERM.API.Middleware;

public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TenantResolutionMiddleware> _logger;

    public TenantResolutionMiddleware(RequestDelegate next, ILogger<TenantResolutionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, ITenantService tenantService)
    {
        try
        {
            // Resolution strategy 1: Header (for API calls)
            if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var tenantId))
            {
                await tenantService.SetTenantAsync(tenantId.ToString());
                _logger.LogInformation("Tenant resolved from header: {TenantId}", tenantId);
            }
            // Resolution strategy 2: JWT claim
            else if (context.User.Identity?.IsAuthenticated == true)
            {
                var tenantClaim = context.User.FindFirst("tenant_id")?.Value;
                if (!string.IsNullOrEmpty(tenantClaim))
                {
                    await tenantService.SetTenantAsync(tenantClaim);
                    _logger.LogInformation("Tenant resolved from JWT: {TenantId}", tenantClaim);
                }
            }
            // Resolution strategy 3: Subdomain
            else if (context.Request.Host.HasValue)
            {
                var host = context.Request.Host.Value;
                var subdomain = host.Split('.')[0];
                
                // Development bypass for localhost
                if (subdomain == "localhost" || host.StartsWith("localhost:"))
                {
                    await tenantService.SetTenantAsync("demo");
                    _logger.LogInformation("Tenant set to 'demo' for localhost development");
                }
                else if (!string.IsNullOrEmpty(subdomain) && subdomain != "app" && subdomain != "api")
                {
                    await tenantService.SetTenantBySubdomainAsync(subdomain);
                    _logger.LogInformation("Tenant resolved from subdomain: {Subdomain}", subdomain);
                }
            }
            // Resolution strategy 4: API Key (for public API)
            else if (context.Request.Headers.TryGetValue("X-API-Key", out var apiKey))
            {
                // This will be handled by the API key authentication filter
                _logger.LogInformation("API Key provided, tenant will be resolved by auth filter");
            }
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Unauthorized tenant access attempt");
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized tenant access");
            return;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resolving tenant");
        }

        await _next(context);
    }
}
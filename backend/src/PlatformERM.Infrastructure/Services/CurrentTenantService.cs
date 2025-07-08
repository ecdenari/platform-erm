using Microsoft.AspNetCore.Http;
using PlatformERM.Application.Common.Interfaces;

namespace PlatformERM.Infrastructure.Services;

public class CurrentTenantService : ICurrentTenantService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentTenantService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? TenantId
    {
        get
        {
            var tenantIdHeader = _httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].FirstOrDefault();
            if (int.TryParse(tenantIdHeader, out var tenantId))
            {
                return tenantId;
            }
            return null;
        }
    }

    public string? TenantIdentifier
    {
        get
        {
            return _httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Identifier"].FirstOrDefault();
        }
    }
}
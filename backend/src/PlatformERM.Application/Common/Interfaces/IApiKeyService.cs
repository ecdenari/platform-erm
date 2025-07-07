using PlatformERM.Domain.Entities;

namespace PlatformERM.Application.Common.Interfaces;

public interface IApiKeyService
{
    Task<Tenant?> ValidateApiKeyAsync(string apiKey);
    Task<string> GenerateApiKeyAsync(string tenantId);
    Task RevokeApiKeyAsync(string tenantId);
}
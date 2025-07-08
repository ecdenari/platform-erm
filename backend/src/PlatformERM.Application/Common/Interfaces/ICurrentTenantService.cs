namespace PlatformERM.Application.Common.Interfaces;

public interface ICurrentTenantService
{
    int? TenantId { get; }
    string? TenantIdentifier { get; }
}
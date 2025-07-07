namespace PlatformERM.Shared.DTOs.Properties;

public class AddressDto
{
    public string Street { get; set; } = string.Empty;
    public string? Suite { get; set; }
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string Country { get; set; } = "US";
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}

public class CreateAddressDto
{
    public string Street { get; set; } = string.Empty;
    public string? Suite { get; set; }
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public string? Country { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
}
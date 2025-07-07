namespace PlatformERM.Domain.ValueObjects;

public class Address : IEquatable<Address>
{
    public string Street { get; private set; } = string.Empty;
    public string? Suite { get; private set; }
    public string City { get; private set; } = string.Empty;
    public string State { get; private set; } = string.Empty;
    public string ZipCode { get; private set; } = string.Empty;
    public string Country { get; private set; } = "US";
    
    // Coordinates stored as separate properties for now
    public double? Latitude { get; private set; }
    public double? Longitude { get; private set; }
    
    private Address() { } // EF Core constructor
    
    public Address(string street, string city, string state, string zipCode, 
                  string? suite = null, string country = "US", double? latitude = null, double? longitude = null)
    {
        Street = street ?? throw new ArgumentNullException(nameof(street));
        City = city ?? throw new ArgumentNullException(nameof(city));
        State = state ?? throw new ArgumentNullException(nameof(state));
        ZipCode = zipCode ?? throw new ArgumentNullException(nameof(zipCode));
        Suite = suite;
        Country = country;
        Latitude = latitude;
        Longitude = longitude;
    }
    
    public static Address Create(string street, string city, string state, string zipCode, 
                               string? suite = null, string country = "US", double? latitude = null, double? longitude = null)
    {
        return new Address(street, city, state, zipCode, suite, country, latitude, longitude);
    }
    
    public string GetFullAddress()
    {
        var address = Street;
        if (!string.IsNullOrEmpty(Suite))
            address += $", {Suite}";
        address += $", {City}, {State} {ZipCode}";
        if (Country != "US")
            address += $", {Country}";
        return address;
    }
    
    public (double? Latitude, double? Longitude) GetCoordinates()
    {
        return (Latitude, Longitude);
    }
    
    public bool Equals(Address? other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;
        
        return Street == other.Street &&
               Suite == other.Suite &&
               City == other.City &&
               State == other.State &&
               ZipCode == other.ZipCode &&
               Country == other.Country &&
               Latitude == other.Latitude &&
               Longitude == other.Longitude;
    }
    
    public override bool Equals(object? obj)
    {
        return Equals(obj as Address);
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(Street, Suite, City, State, ZipCode, Country, Latitude, Longitude);
    }
    
    public static bool operator ==(Address? left, Address? right)
    {
        return Equals(left, right);
    }
    
    public static bool operator !=(Address? left, Address? right)
    {
        return !Equals(left, right);
    }
}
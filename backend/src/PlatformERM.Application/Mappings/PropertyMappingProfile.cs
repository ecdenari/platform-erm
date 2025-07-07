using AutoMapper;
using PlatformERM.Domain.Entities;
using PlatformERM.Domain.ValueObjects;
using PlatformERM.Shared.DTOs.Properties;
using DomainPropertyType = PlatformERM.Domain.Entities.PropertyType;
using DomainPropertyStatus = PlatformERM.Domain.Entities.PropertyStatus;
using DomainContactRole = PlatformERM.Domain.Entities.ContactRole;
using DtoPropertyType = PlatformERM.Shared.DTOs.Properties.PropertyType;
using DtoPropertyStatus = PlatformERM.Shared.DTOs.Properties.PropertyStatus;
using DtoContactRole = PlatformERM.Shared.DTOs.Properties.ContactRole;

namespace PlatformERM.Application.Mappings;

public class PropertyMappingProfile : Profile
{
    public PropertyMappingProfile()
    {
        // Property mappings
        CreateMap<Property, PropertyDto>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
            .ForMember(dest => dest.FullAddress, opt => opt.MapFrom(src => src.FullAddress))
            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Coordinates.Latitude))
            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.Coordinates.Longitude))
            .ForMember(dest => dest.PropertyType, opt => opt.MapFrom(src => (DtoPropertyType)src.PropertyType))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (DtoPropertyStatus)src.Status));

        CreateMap<Property, PropertyDetailDto>()
            .IncludeBase<Property, PropertyDto>()
            .ForMember(dest => dest.PropertyContacts, opt => opt.MapFrom(src => src.PropertyContacts))
            .ForMember(dest => dest.WorkOrders, opt => opt.MapFrom(src => src.WorkOrders))
            .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company));

        CreateMap<Property, PublicPropertyDto>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
            .ForMember(dest => dest.FullAddress, opt => opt.MapFrom(src => src.FullAddress))
            .ForMember(dest => dest.PropertyType, opt => opt.MapFrom(src => (DtoPropertyType)src.PropertyType))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (DtoPropertyStatus)src.Status));

        // Address mappings
        CreateMap<Address, AddressDto>()
            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.GetCoordinates().Latitude))
            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.GetCoordinates().Longitude));

        // PropertyContact mappings
        CreateMap<PropertyContact, PropertyContactDto>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (DtoContactRole)src.Role));

        // Contact mappings
        CreateMap<Contact, ContactSummaryDto>();

        // Company mappings
        CreateMap<Company, CompanyDto>();

        // WorkOrder mappings (basic summary)
        CreateMap<WorkOrder, WorkOrderSummaryDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status ?? "Unknown"));
    }
}
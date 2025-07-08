using AutoMapper;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Models.DTOs;

namespace PureGreenLandGroup.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Branch, BranchDTO>();
        }
    }
} 
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.DTO.Properties;
using PureGreenLandGroup.Models.DTO.Account;
using PureGreenLandGroup.Domain.Entities;
using AutoMapper;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Domain.Entities.SchedulerEntities;
using PureGreenLandGroup.Models.DTO.Equipment;
using PureGreenLandGroup.Domain.Entities.InspectionEntities;

namespace PureGreenLandGroup.Services.MapConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            CreateMap<PropertiesVM, Properties>();
            CreateMap<Properties, PropertiesVM>();

            CreateMap<ProppertiesAPIResponseVM, Properties>();


            CreateMap<PropertiesMasterVM, PropertiesVM>();

            CreateMap<PropertiesContactVM, PropertiesContact>();

            // New Aspire integration mappings
            // CreateMap<BranchVM, Branch>();
            // CreateMap<Branch, BranchVM>();

            // CreateMap<PropertyStatusVM, PropertyStatus>();
            // CreateMap<PropertyStatus, PropertyStatusVM>();

            // CreateMap<PropertyTypeVM, PropertyType>();
            // CreateMap<PropertyType, PropertyTypeVM>();

            CreateMap<MstRoles, MstRolesVM>();
            CreateMap<MstUsersDetails, UserRegistrationVM>();

            //master entities mapping to view models
            CreateMap<MstValveSize, ValveSizeViewModel>();
            CreateMap<MstSprinklerType, SprinklerTypesViewModel>();
            CreateMap<MstPlantType, PlantTypeViewModel>().ForMember(vm => vm.PlantTypeName, entity => entity.MapFrom(src => src.PlantType));
            CreateMap<MstSoilType, SoilTypeViewModel>().ForMember(vm => vm.SoilTypeName, entity => entity.MapFrom(src => src.SoilType));
            CreateMap<MstWaterSource, WaterSourceViewModel>();
            CreateMap<MstModels, ModelsViewModels>();
            CreateMap<MstManufacturer, ManufacturerViewModel>();
            CreateMap<ProgramRunTime, ProgramRunTimeViewModel>();
            CreateMap<ProgramStartTime, ProgramStartTimeViewModel>();
            CreateMap<MstSeasonalAdjustDropdown, SeasonalAdjustDropdownViewModel>();

            CreateMap<SeasionalAdjustViewModel, SeasionalAdjust>();
            CreateMap<MstZoneAreaDropDown, ZoneAreaDropDownViewModel>();
            CreateMap<MstZoneIssuesDropDown, ZoneIssuesDropDownViewModel>();

            CreateMap<MstBrokenLateralDropdown, BrokenLateralDropdownViewModel>();


            //VM to entities to create new entries
            CreateMap<ControllerDetailsViewModel, Controllers>(); 
            CreateMap<ProgramViewModel, ControllerProgrames>();
            CreateMap<ZoneViewModel, ControllerZones>();
            CreateMap<CreateInspectionViewModel, Inspection>();
            CreateMap<ZoneIssuesInspectionViewModel, ZoneIssuesInspection>();
            CreateMap<InspectedZoneBrokenLateralViewModel, InspectedZoneBrokenLateral>();
            CreateMap<InspectedZoneBrokenMainViewModel, InspectedZoneBrokenMain>();
            CreateMap<InspectedZoneImagesViewModel, InspectedZoneImages>();
            CreateMap<InspectedMoveHead, InspectedMoveHeadVM>().ReverseMap();

            //entities to VM to create new entries
            CreateMap<Controllers, ControllerDetailsViewModel>();
            CreateMap<ControllerProgrames, ProgramViewModel>();
            CreateMap<SeasionalAdjust, SeasionalAdjustViewModel>();
            CreateMap<ControllerZones, ZoneViewModel>();
            CreateMap<Inspection, CreateInspectionViewModel>();
            CreateMap<ZoneIssuesInspection, ZoneIssuesInspectionViewModel>();
            CreateMap<InspectedZoneBrokenLateral, InspectedZoneBrokenLateralViewModel>();
            CreateMap<InspectedZoneBrokenMain, InspectedZoneBrokenMainViewModel>();
            CreateMap<InspectedZoneImages, InspectedZoneImagesViewModel>();
            CreateMap<CatalogMappingLabel, CatalogMappingVM>().ReverseMap();
            CreateMap<InspectedValveFail, InspectedValveFailVM>().ReverseMap();

            //CreateMap<MstInspectionLabel, MappingInspectionLabelVM>().ReverseMap();

            //scheduler entity to vm
            CreateMap<EquipmentAssetIds, EquipmentAssetIdVM>().ReverseMap();
            CreateMap<MstLinearRepair, LinearRepairVM>().ReverseMap();

            CreateMap<PropertiesContact, PropertyContactDTO>();
        }
    }
}

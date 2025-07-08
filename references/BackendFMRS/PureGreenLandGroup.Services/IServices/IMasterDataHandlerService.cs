using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Utility.Enums;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IMasterDataHandlerService
    {
        List<WaterSourceViewModel> GetWaterSourceMasterList();
        List<ProgramStartTimeViewModel> GetProgramStartTimeMasterList();
        List<ZoneAreaDropDownViewModel> GetZoneAreaDropdownList();
        List<ZoneIssuesDropDownViewModel> GetZoneIssuesDropdownList();
        List<BrokenLateralDropdownViewModel> GetBrokenLateralDropdownList();
        AdminPanelStatisticsVM GetMasterDataStatistics();

        //manufacturers CRUD
        List<ManufacturerViewModel> GetManufacturersMasterList();
        ManufacturerViewModel GetManufacturer(int manufacturerId);
        bool CreateUpdateManufacturer(ManufacturerViewModel manufacturerVM);

        //generic method to chnage status of master entities
        bool ChangeMasterEntitiesStatus(int id, bool status, MasterEntityType masterEntityType);


        //Models CRUD
        List<ModelsViewModels> GetModelsMasterList();
        List<ModelGridListVM> GetModelDetailsList();
        List<ModelsViewModels> ModelListByManufacturerId(int manufacturerId);
        ModelsViewModels GetModel(int modelId);
        bool CreateUpdateModel(ModelsViewModels modelsVM);

        //Plant Type CRUD
        List<PlantTypeViewModel> GetPlantsMasterList();
        PlantTypeViewModel GetPlantType(int plantTypeId);
        bool CreateUpdatePlantType(PlantTypeViewModel plantTypeVM);

        //Soil type CRUD
        List<SoilTypeViewModel> GetSoilTypeMasterList();
        bool CreateUpdateSoilType(SoilTypeViewModel soilTypeVM);
        SoilTypeViewModel GetSoilType(int soilId);


        //Sprinklers CRUD
        List<SprinklerTypesViewModel> GetSprinklersMasterList();
        bool CreateUpdateSprinklerType(SprinklerTypesViewModel sprinklerTypesVM);
        SprinklerTypesViewModel GetSprinkler(int sprinklerId);


        //ValveSize CRUD
        List<ValveSizeViewModel> GetValveSizeMasterList();
        bool CreateUpdateValveSize(ValveSizeViewModel valveSizeVM);
        ValveSizeViewModel GetValveSize(int valveSizeId);


        //Seasonal adjust CRUD
        List<SeasonalAdjustDropdownViewModel> GetSeasonalAdjustDropdownMasterList();
        bool CreateUpdateSeasonalAdjustValue(SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM);
        SeasonalAdjustDropdownViewModel GetSeasonalAdjustDropdownValue(int seasonalAdjutsId);


        //Program/Zone Runtime CRUD
        List<ProgramRunTimeViewModel> GetProgramRunTimeMasterList();
        bool CreateUpdateZoneRunTime(ProgramRunTimeViewModel programRunTimeVM);
        ProgramRunTimeViewModel GetProgramRuntime(int programRuntimeId);

        ContollerMasterViewModel GetMasterDataForDynamicZone();

        JsonResponse CreateUpdateCatalogInputs(CatalogMappingVM catalogMappingVM);
        CatalogMappingVM MappingPageData();
    }
}

using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Utility.Enums;
using AutoMapper;
using PureGreenLandGroup.Domain.Entities.InspectionEntities;

namespace PureGreenLandGroup.Services.Services
{
    public class MasterDataHandlerService : IMasterDataHandlerService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPropertiesService _propertyService;
        public MasterDataHandlerService(IUnitOfWork unitOfWork, IMapper mapper, IPropertiesService propertyService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _propertyService = propertyService;

        }

        #region VALVE SIZE CRUD

        public List<ValveSizeViewModel> GetValveSizeMasterList()
        {
            List<ValveSizeViewModel> valveSizeListVM = new();
            try
            {
                var valveSizeRepo = _unitOfWork.GetRepository<MstValveSize>();
                var valveSizeList = valveSizeRepo.List().ToList();
                if (valveSizeList.Any())
                {
                    valveSizeListVM = _mapper.Map<List<ValveSizeViewModel>>(valveSizeList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return valveSizeListVM;
        }
        public ValveSizeViewModel GetValveSize(int valveSizeId)
        {
            ValveSizeViewModel valveSizeVM = new ValveSizeViewModel();
            var valveSizeRepo = _unitOfWork.GetRepository<MstValveSize>();
            var valveSizeEntity = valveSizeRepo.List(m => m.Id == valveSizeId).FirstOrDefault();
            if (valveSizeEntity != null)
            {
                valveSizeVM = _mapper.Map<ValveSizeViewModel>(valveSizeEntity);
            }
            return valveSizeVM;
        }
        public bool CreateUpdateValveSize(ValveSizeViewModel valveSizeVM)
        {
            bool status = false;
            try
            {
                var valveSizeRepo = _unitOfWork.GetRepository<MstValveSize>();

                if (valveSizeVM.Id > 0)
                {
                    var valveSizeEntity = valveSizeRepo.List(m => m.Id == valveSizeVM.Id).FirstOrDefault();
                    if (valveSizeEntity != null)
                    {
                        valveSizeEntity.ValveSizenames = valveSizeVM.ValveSizenames!;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new valve size
                    MstValveSize mstValveSize = new() { ValveSizenames = valveSizeVM.ValveSizenames!, IsActive = true };
                    valveSizeRepo.Add(mstValveSize);
                    _unitOfWork.Commit();
                    status = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }

        #endregion VALVE SIZE CRUD

        #region Manufacturer CRUD

        public List<ManufacturerViewModel> GetManufacturersMasterList()
        {
            List<ManufacturerViewModel> manufacturersListVM = new();
            try
            {
                var manufacturerRepo = _unitOfWork.GetRepository<MstManufacturer>();
                var manufacturersList = manufacturerRepo.List().ToList();
                if (manufacturersList.Any())
                {
                    manufacturersListVM = _mapper.Map<List<ManufacturerViewModel>>(manufacturersList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return manufacturersListVM;
        }

        public bool CreateUpdateManufacturer(ManufacturerViewModel manufacturerViewModel)
        {
            bool status = false;
            try
            {
                var manufacturerRepo = _unitOfWork.GetRepository<MstManufacturer>();
                if (manufacturerViewModel.Id > 0)
                {
                    var manufacturer = manufacturerRepo.List(m => m.Id == manufacturerViewModel.Id).FirstOrDefault();
                    if (manufacturer != null)
                    {
                        manufacturer.ManufacturerName = manufacturerViewModel.ManufacturerName;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new manufacturer
                    MstManufacturer mstManufacturer = new MstManufacturer() { ManufacturerName = manufacturerViewModel.ManufacturerName, IsActive = true };
                    manufacturerRepo.Add(mstManufacturer);
                    _unitOfWork.Commit();
                    status = true;

                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }
        public bool ChangeMasterEntitiesStatus(int id, bool status, MasterEntityType masterEntityType)
        {
            bool isStatusChanged = false;
            try
            {
                switch (masterEntityType)
                {
                    case MasterEntityType.manufacturer:
                        var manufRepo = _unitOfWork.GetRepository<MstManufacturer>();
                        var manufacturer = manufRepo.List(m => m.Id == id).FirstOrDefault();
                        if (manufacturer != null)
                        {
                            manufacturer.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.model:
                        var modelRepo = _unitOfWork.GetRepository<MstModels>();
                        var model = modelRepo.List(m => m.Id == id).FirstOrDefault();
                        if (model != null)
                        {
                            model.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.plant_type:
                        var plantTypesRepo = _unitOfWork.GetRepository<MstPlantType>();
                        var plantType = plantTypesRepo.List(m => m.Id == id).FirstOrDefault();
                        if (plantType != null)
                        {
                            plantType.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.soil_type:
                        var soilTypesRepo = _unitOfWork.GetRepository<MstSoilType>();
                        var soilType = soilTypesRepo.List(m => m.Id == id).FirstOrDefault();
                        if (soilType != null)
                        {
                            soilType.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.sprinkler:
                        var sprinklerRepo = _unitOfWork.GetRepository<MstSprinklerType>();
                        var sprinkler = sprinklerRepo.List(m => m.Id == id).FirstOrDefault();
                        if (sprinkler != null)
                        {
                            sprinkler.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.seasonal_adjust_month:
                        var seasonalAdjustRepo = _unitOfWork.GetRepository<MstSeasonalAdjustDropdown>();
                        var seasonalAdjustMonth = seasonalAdjustRepo.List(m => m.Id == id).FirstOrDefault();
                        if (seasonalAdjustMonth != null)
                        {
                            seasonalAdjustMonth.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.valve_size:
                        var valveSizeRepo = _unitOfWork.GetRepository<MstValveSize>();
                        var valveSize = valveSizeRepo.List(m => m.Id == id).FirstOrDefault();
                        if (valveSize != null)
                        {
                            valveSize.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    case MasterEntityType.program_runtime:
                        var programRunTimeRepo = _unitOfWork.GetRepository<ProgramRunTime>();
                        var programRuntime = programRunTimeRepo.List(m => m.Id == id).FirstOrDefault();
                        if (programRuntime != null)
                        {
                            programRuntime.IsActive = status;
                            _unitOfWork.Commit();
                            isStatusChanged = true;
                        }
                        break;
                    default:
                        break;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return isStatusChanged;
        }
        public ManufacturerViewModel GetManufacturer(int manufacturerId)
        {
            ManufacturerViewModel manufacturerViewModel = new();
            try
            {
                var manufacturerRepo = _unitOfWork.GetRepository<MstManufacturer>();
                var manufacturer = manufacturerRepo.List(m => m.Id == manufacturerId).FirstOrDefault();
                if (manufacturer != null)
                {
                    manufacturerViewModel = _mapper.Map<ManufacturerViewModel>(manufacturer);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return manufacturerViewModel;
        }

        #endregion Manufacturer CRUD

        #region Model CRUD

        public List<ModelsViewModels> GetModelsMasterList()
        {
            List<ModelsViewModels> modelsListVM = new();
            try
            {
                var modelRepo = _unitOfWork.GetRepository<MstModels>();
                var modelsList = modelRepo.List().ToList();
                if (modelsList.Any())
                {
                    modelsListVM = _mapper.Map<List<ModelsViewModels>>(modelsList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return modelsListVM;
        }

        public List<ModelGridListVM> GetModelDetailsList()
        {
            List<ModelGridListVM> modelsListVM = new();
            try
            {
                var modelRepo = _unitOfWork.GetRepository<MstModels>();
                var mnfRepo = _unitOfWork.GetRepository<MstManufacturer>();
                var modelsList = modelRepo.List().ToList();
                if (modelsList.Any())
                {

                    foreach (var item in modelsList)
                    {
                        ModelGridListVM modelVM = new ModelGridListVM();
                        modelVM.Id = item.Id;
                        modelVM.ModelName = item.ModelName;
                        modelVM.IsActive = item.IsActive;
                        var manufacturer = mnfRepo.List(m => m.Id == item.ManufacturerId).FirstOrDefault();
                        if (manufacturer != null)
                        {
                            modelVM.ManufacturerId = manufacturer.Id;
                            modelVM.ManufacturerName = manufacturer.ManufacturerName;
                        }
                        else
                        {
                            modelVM.ManufacturerId = 0;
                            modelVM.ManufacturerName = string.Empty;
                        }
                        modelsListVM.Add(modelVM);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return modelsListVM;
        }

        public List<ModelsViewModels> ModelListByManufacturerId(int manufacturerId)
        {
            List<ModelsViewModels> modelsListVM = new();
            try
            {
                var modelRepo = _unitOfWork.GetRepository<MstModels>();
                var modelsList = modelRepo.List(m => m.ManufacturerId == manufacturerId && m.IsActive).ToList();
                if (modelsList.Any())
                {
                    modelsListVM = _mapper.Map<List<ModelsViewModels>>(modelsList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return modelsListVM;
        }

        public bool CreateUpdateModel(ModelsViewModels modelsVM)
        {
            bool status = false;
            try
            {
                var modelRepo = _unitOfWork.GetRepository<MstModels>();

                if (modelsVM.Id > 0)
                {
                    var model = modelRepo.List(m => m.Id == modelsVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.ModelName = modelsVM.ModelName;
                        model.ManufacturerId = modelsVM.ManufacturerId;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new manufacturer
                    MstModels mstModel = new MstModels() { ModelName = modelsVM.ModelName, IsActive = true, ManufacturerId = modelsVM.ManufacturerId };
                    modelRepo.Add(mstModel);
                    _unitOfWork.Commit();
                    status = true;

                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }
        public ModelsViewModels GetModel(int modelId)
        {
            ModelsViewModels modelsViewModels = new ModelsViewModels();
            try
            {
                var modelRepo = _unitOfWork.GetRepository<MstModels>();

                var model = modelRepo.List(m => m.Id == modelId).FirstOrDefault();
                if (model != null)
                {
                    modelsViewModels = _mapper.Map<ModelsViewModels>(model);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return modelsViewModels;
        }

        #endregion Model CRUD

        #region Plant Type CRUD

        public List<PlantTypeViewModel> GetPlantsMasterList()
        {
            List<PlantTypeViewModel> plantListVM = new();
            try
            {
                var plantsRepo = _unitOfWork.GetRepository<MstPlantType>();

                var plantList = plantsRepo.List().ToList();
                if (plantList.Any())
                {
                    plantListVM = _mapper.Map<List<PlantTypeViewModel>>(plantList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return plantListVM;
        }
        public PlantTypeViewModel GetPlantType(int plantTypeId)
        {
            PlantTypeViewModel plantTypeVM = new PlantTypeViewModel();
            var plantsRepo = _unitOfWork.GetRepository<MstPlantType>();

            var plantEntity = plantsRepo.List(m => m.Id == plantTypeId).FirstOrDefault();
            if (plantEntity != null)
            {
                plantTypeVM = _mapper.Map<PlantTypeViewModel>(plantEntity);
            }
            return plantTypeVM;
        }
        public bool CreateUpdatePlantType(PlantTypeViewModel plantTypeVM)
        {
            bool status = false;
            try
            {
                var plantsRepo = _unitOfWork.GetRepository<MstPlantType>();

                if (plantTypeVM.Id > 0)
                {
                    var model = plantsRepo.List(m => m.Id == plantTypeVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.PlantType = plantTypeVM.PlantTypeName;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new manufacturer
                    MstPlantType mstPlantType = new MstPlantType() { PlantType = plantTypeVM.PlantTypeName, IsActive = true };
                    plantsRepo.Add(mstPlantType);
                    _unitOfWork.Commit();
                    status = true;

                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }
        #endregion Plant Type CRUD

        #region Program Runtime CRUD
        public ProgramRunTimeViewModel GetProgramRuntime(int programRuntimeId)
        {
            ProgramRunTimeViewModel programRunTimeVM = new ProgramRunTimeViewModel();
            var progrmaRuntimeRepo = _unitOfWork.GetRepository<ProgramRunTime>();
            var progrmaRuntimeEntity = progrmaRuntimeRepo.List(m => m.Id == programRuntimeId).FirstOrDefault();
            if (progrmaRuntimeEntity != null)
            {
                programRunTimeVM = _mapper.Map<ProgramRunTimeViewModel>(progrmaRuntimeEntity);
            }
            return programRunTimeVM;

        }
        public List<ProgramRunTimeViewModel> GetProgramRunTimeMasterList()
        {
            List<ProgramRunTimeViewModel> programRunTimeListVM = new();
            try
            {
                var progrmaRuntimeRepo = _unitOfWork.GetRepository<ProgramRunTime>();
                var programRunTimeList = progrmaRuntimeRepo.List().ToList();
                if (programRunTimeList.Any())
                {
                    programRunTimeListVM = _mapper.Map<List<ProgramRunTimeViewModel>>(programRunTimeList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return programRunTimeListVM;
        }
        public bool CreateUpdateZoneRunTime(ProgramRunTimeViewModel programRunTimeVM)
        {
            bool status = false;
            try
            {
                var progrmaRuntimeRepo = _unitOfWork.GetRepository<ProgramRunTime>();

                if (programRunTimeVM.Id > 0)
                {
                    var model = progrmaRuntimeRepo.List(m => m.Id == programRunTimeVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.Value = programRunTimeVM.Value!;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new Seasonal Adjust Dropdown value
                    ProgramRunTime programRunTime = new() { Value = programRunTimeVM.Value!, IsActive = true };
                    progrmaRuntimeRepo.Add(programRunTime);
                    _unitOfWork.Commit();
                    status = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }

        #endregion Program Runtime CRUD

        #region Soil Type CRUD

        public List<SoilTypeViewModel> GetSoilTypeMasterList()
        {
            List<SoilTypeViewModel> soilListVM = new();
            try
            {
                var soilTypeRepo = _unitOfWork.GetRepository<MstSoilType>();
                var soilList = soilTypeRepo.List().ToList();
                if (soilList.Any())
                {
                    soilListVM = _mapper.Map<List<SoilTypeViewModel>>(soilList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return soilListVM;
        }
        public SoilTypeViewModel GetSoilType(int soilId)
        {
            SoilTypeViewModel soilTypeVM = new SoilTypeViewModel();
            var soilTypeRepo = _unitOfWork.GetRepository<MstSoilType>();
            var soilEntity = soilTypeRepo.List(m => m.Id == soilId).FirstOrDefault();
            if (soilEntity != null)
            {
                soilTypeVM = _mapper.Map<SoilTypeViewModel>(soilEntity);
            }
            return soilTypeVM;
        }
        public bool CreateUpdateSoilType(SoilTypeViewModel soilTypeVM)
        {
            bool status = false;
            try
            {
                var soilTypeRepo = _unitOfWork.GetRepository<MstSoilType>();
                if (soilTypeVM.Id > 0)
                {
                    var model = soilTypeRepo.List(m => m.Id == soilTypeVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.SoilType = soilTypeVM.SoilTypeName;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new manufacturer
                    MstSoilType mstSoilType = new MstSoilType() { SoilType = soilTypeVM.SoilTypeName, IsActive = true };
                    soilTypeRepo.Add(mstSoilType);
                    _unitOfWork.Commit();
                    status = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }


        #endregion Soil Type CRUD

        #region Sprinkler Type CRUD

        public List<SprinklerTypesViewModel> GetSprinklersMasterList()
        {
            List<SprinklerTypesViewModel> sprinklerListVM = new();
            try
            {
                var sprinklerRepo = _unitOfWork.GetRepository<MstSprinklerType>();
                var sprinklerList = sprinklerRepo.List().ToList();
                if (sprinklerList.Any())
                {
                    sprinklerListVM = _mapper.Map<List<SprinklerTypesViewModel>>(sprinklerList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return sprinklerListVM;
        }
        public SprinklerTypesViewModel GetSprinkler(int sprinklerId)
        {
            SprinklerTypesViewModel sprinklerTypesVM = new SprinklerTypesViewModel();
            var sprinklerRepo = _unitOfWork.GetRepository<MstSprinklerType>();
            var sprinklerEntity = sprinklerRepo.List(m => m.Id == sprinklerId).FirstOrDefault();
            if (sprinklerEntity != null)
            {
                sprinklerTypesVM = _mapper.Map<SprinklerTypesViewModel>(sprinklerEntity);
            }
            return sprinklerTypesVM;
        }
        public bool CreateUpdateSprinklerType(SprinklerTypesViewModel sprinklerTypesVM)
        {
            bool status = false;
            try
            {
                var sprinklerRepo = _unitOfWork.GetRepository<MstSprinklerType>();
                if (sprinklerTypesVM.Id > 0)
                {
                    var model = sprinklerRepo.List(m => m.Id == sprinklerTypesVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.SprinklerTypeName = sprinklerTypesVM.SprinklerTypeName!;
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new manufacturer
                    MstSprinklerType mstSprinklerType = new() { SprinklerTypeName = sprinklerTypesVM.SprinklerTypeName!, IsActive = true };
                    sprinklerRepo.Add(mstSprinklerType);
                    _unitOfWork.Commit();
                    status = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }

        #endregion Sprinkler Type CRUD

        #region SeasonalAdjust Dropdown Type CRUD
        public List<SeasonalAdjustDropdownViewModel> GetSeasonalAdjustDropdownMasterList()
        {
            List<SeasonalAdjustDropdownViewModel> seasonalAdjustDDListVM = new();
            try
            {
                var seasonalAdjustRepo = _unitOfWork.GetRepository<MstSeasonalAdjustDropdown>();
                var seasonalAdjustDDList = seasonalAdjustRepo.List().ToList();
                if (seasonalAdjustDDList.Any())
                {
                    seasonalAdjustDDListVM = _mapper.Map<List<SeasonalAdjustDropdownViewModel>>(seasonalAdjustDDList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return seasonalAdjustDDListVM;
        }
        public SeasonalAdjustDropdownViewModel GetSeasonalAdjustDropdownValue(int seasonalAdjutsId)
        {
            SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM = new();
            var seasonalAdjustRepo = _unitOfWork.GetRepository<MstSeasonalAdjustDropdown>();
            var seasnalAdjustDDEntity = seasonalAdjustRepo.List(m => m.Id == seasonalAdjutsId).FirstOrDefault();
            if (seasnalAdjustDDEntity != null)
            {
                seasonalAdjustDropdownVM = _mapper.Map<SeasonalAdjustDropdownViewModel>(seasnalAdjustDDEntity);
            }
            return seasonalAdjustDropdownVM;
        }
        public bool CreateUpdateSeasonalAdjustValue(SeasonalAdjustDropdownViewModel seasonalAdjustDropdownVM)
        {
            bool status = false;
            try
            {
                var seasonalAdjustRepo = _unitOfWork.GetRepository<MstSeasonalAdjustDropdown>();
                if (seasonalAdjustDropdownVM.Id > 0)
                {
                    var model = seasonalAdjustRepo.List(m => m.Id == seasonalAdjustDropdownVM.Id).FirstOrDefault();
                    if (model != null)
                    {
                        model.Value = Convert.ToInt32(seasonalAdjustDropdownVM.Value);
                        _unitOfWork.Commit();
                        status = true;
                    }
                }
                else
                {
                    //create new Seasonal Adjust Dropdown value
                    MstSeasonalAdjustDropdown mstSeasonalAdjustDropdown = new() { Value = Convert.ToInt32(seasonalAdjustDropdownVM.Value), IsActive = true };
                    seasonalAdjustRepo.Add(mstSeasonalAdjustDropdown);
                    _unitOfWork.Commit();
                    status = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return status;
        }

        #endregion SeasonalAdjust Dropdown Type CRUD

        public List<ProgramStartTimeViewModel> GetProgramStartTimeMasterList()
        {
            List<ProgramStartTimeViewModel> programStartTimeListVM = new();
            try
            {
                var programStartTimeRepo = _unitOfWork.GetRepository<ProgramStartTime>();
                var programStartTimeList = programStartTimeRepo.List().ToList();
                if (programStartTimeList.Any())
                {
                    programStartTimeListVM = _mapper.Map<List<ProgramStartTimeViewModel>>(programStartTimeList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return programStartTimeListVM;
        }

        public List<WaterSourceViewModel> GetWaterSourceMasterList()
        {
            List<WaterSourceViewModel> waterSourcesListVM = new();
            try
            {
                var waterSourcesRepo = _unitOfWork.GetRepository<MstWaterSource>();
                var waterSourcesList = waterSourcesRepo.List().ToList();
                if (waterSourcesList.Any())
                {
                    waterSourcesListVM = _mapper.Map<List<WaterSourceViewModel>>(waterSourcesList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return waterSourcesListVM;
        }

        public List<ZoneAreaDropDownViewModel> GetZoneAreaDropdownList()
        {
            List<ZoneAreaDropDownViewModel> zoneAreaDDList = new();
            try
            {
                var zoneAreaRepo = _unitOfWork.GetRepository<MstZoneAreaDropDown>();
                var zoneAreaList = zoneAreaRepo.List().ToList();
                if (zoneAreaList.Any())
                {
                    zoneAreaDDList = _mapper.Map<List<ZoneAreaDropDownViewModel>>(zoneAreaList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return zoneAreaDDList;
        }

        public List<ZoneIssuesDropDownViewModel> GetZoneIssuesDropdownList()
        {
            List<ZoneIssuesDropDownViewModel> zoneIssuesDDListVM = new();
            try
            {
                var zoneAreaRepo = _unitOfWork.GetRepository<MstZoneIssuesDropDown>();
                var mstZoneIssuesDropdownList = zoneAreaRepo.List().ToList();
                if (mstZoneIssuesDropdownList.Any())
                {
                    zoneIssuesDDListVM = _mapper.Map<List<ZoneIssuesDropDownViewModel>>(mstZoneIssuesDropdownList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return zoneIssuesDDListVM;
        }

        public List<BrokenLateralDropdownViewModel> GetBrokenLateralDropdownList()
        {
            List<BrokenLateralDropdownViewModel> brokenLateralDDListVM = new();
            try
            {
                var brokenLateralRepo = _unitOfWork.GetRepository<MstBrokenLateralDropdown>();
                var mstBrokenLateralDropdownList = brokenLateralRepo.List().ToList();
                if (mstBrokenLateralDropdownList.Any())
                {
                    brokenLateralDDListVM = _mapper.Map<List<BrokenLateralDropdownViewModel>>(mstBrokenLateralDropdownList);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return brokenLateralDDListVM;
        }

        public AdminPanelStatisticsVM GetMasterDataStatistics()
        {
            AdminPanelStatisticsVM adminPanelStatisticsVMs = new();

            var manufacturerList = this.GetManufacturersMasterList();
            var modelsList = this.GetModelsMasterList();
            var plantsList = this.GetPlantsMasterList();
            var soilList = this.GetSoilTypeMasterList();
            var sprinklersList = this.GetSprinklersMasterList();
            var valveSizeList = this.GetValveSizeMasterList();
            var seasionalAdjustList = this.GetSeasonalAdjustDropdownMasterList();
            var zoneRuntimeList = this.GetProgramRunTimeMasterList();
            var propertyCount = _propertyService.GetPropertyCounts().Result;

            adminPanelStatisticsVMs.TotalProperties = propertyCount.TotalPropertiesCount;
            adminPanelStatisticsVMs.ActiveProperties = propertyCount.ActivePropertiesCount;
            adminPanelStatisticsVMs.TotalManufacturers = manufacturerList.Count;
            adminPanelStatisticsVMs.ActiveManufacturers = manufacturerList.Where(m => m.IsActive).Count();
            adminPanelStatisticsVMs.TotalModels = modelsList.Count;
            adminPanelStatisticsVMs.ActiveModels = modelsList.Where(m => m.IsActive).Count();
            adminPanelStatisticsVMs.TotalPlants = plantsList.Count;
            adminPanelStatisticsVMs.ActivePlants = plantsList.Where(p => p.IsActive).Count();
            adminPanelStatisticsVMs.TotalSoilTypes = soilList.Count;
            adminPanelStatisticsVMs.ActiveSoilTypes = soilList.Where(s => s.IsActive).Count();
            adminPanelStatisticsVMs.TotalSprinklers = sprinklersList.Count;
            adminPanelStatisticsVMs.ActiveSprinklers = sprinklersList.Where(s => s.IsActive).Count();
            adminPanelStatisticsVMs.TotalValveSize = valveSizeList.Count;
            adminPanelStatisticsVMs.ActiveValveSize = valveSizeList.Where(v => v.IsActive).Count();
            adminPanelStatisticsVMs.TotalSeasionalAdjust = seasionalAdjustList.Count;
            adminPanelStatisticsVMs.ActiveSeasionalAdjust = seasionalAdjustList.Where(s => s.IsActive).Count();
            adminPanelStatisticsVMs.TotalRuntime = zoneRuntimeList.Count;
            adminPanelStatisticsVMs.ActiveRuntime = zoneRuntimeList.Where(r => r.IsActive).Count();
            return adminPanelStatisticsVMs;
        }

        /// <summary>
        /// returns the master data for the controller dynamic new zone
        /// </summary>
        /// <returns></returns>
        public ContollerMasterViewModel GetMasterDataForDynamicZone()
        {
            ContollerMasterViewModel controllerMasterViewModel = new();
            try
            {
                var programRuntimeRepo = _unitOfWork.GetRepository<ProgramRunTime>();
                var valveSizeRepo = _unitOfWork.GetRepository<MstValveSize>();
                var sprinklerRepo = _unitOfWork.GetRepository<MstSprinklerType>();
                var plantTypeRepo = _unitOfWork.GetRepository<MstPlantType>();
                var soiltypeRepo = _unitOfWork.GetRepository<MstSoilType>();
                var manufacturerRepo = _unitOfWork.GetRepository<MstManufacturer>();

                var programRuntime = programRuntimeRepo.List(m => m.IsActive).ToList();
                var valveSizeList = valveSizeRepo.List(m => m.IsActive).ToList();
                var sprinklerList = sprinklerRepo.List(m => m.IsActive).ToList();
                var plantList = plantTypeRepo.List(m => m.IsActive).ToList();
                var soilList = soiltypeRepo.List(m => m.IsActive).ToList();
                var manufacturerList = manufacturerRepo.List(m => m.IsActive).ToList();

                controllerMasterViewModel.ProgramRunTimeList = _mapper.Map<List<ProgramRunTimeViewModel>>(programRuntime);
                controllerMasterViewModel.ValveSizeList = _mapper.Map<List<ValveSizeViewModel>>(valveSizeList);
                controllerMasterViewModel.SprinklerTypesList = _mapper.Map<List<SprinklerTypesViewModel>>(sprinklerList);
                controllerMasterViewModel.PlantTypeList = _mapper.Map<List<PlantTypeViewModel>>(plantList);
                controllerMasterViewModel.SoilTypeList = _mapper.Map<List<SoilTypeViewModel>>(soilList);
                controllerMasterViewModel.ManufacturerList = _mapper.Map<List<ManufacturerViewModel>>(manufacturerList);
            }
            catch (Exception)
            {

                throw;
            }
            return controllerMasterViewModel;
        }

        public JsonResponse CreateUpdateCatalogInputs(CatalogMappingVM catalogMappingVM)
        {
            var catalogMappingRepository = _unitOfWork.GetRepository<CatalogMappingLabel>();

            if (catalogMappingVM.Id > 0)
            {
                var savedRecord = catalogMappingRepository.List(m => m.Id == catalogMappingVM.Id).FirstOrDefault();
                if (savedRecord != null)
                {
                    savedRecord.ValveIssueValue = catalogMappingVM.ValveIssueValue;
                    savedRecord.DecoderIssueValue = catalogMappingVM.DecoderIssueValue;
                    savedRecord.SolenoidIssueValue = catalogMappingVM.SolenoidIssueValue;
                    savedRecord.BrokenMainValue = catalogMappingVM.BrokenMainValue;
                    savedRecord.BrokenLateralValue = catalogMappingVM.BrokenLateralValue;
                    savedRecord.BrokenRotorValue = catalogMappingVM.BrokenRotorValue;
                    savedRecord.BrokenSprayValue = catalogMappingVM.BrokenSprayValue;
                    savedRecord.MprNozzleValue = catalogMappingVM.MprNozzleValue;
                    savedRecord.VanNozzleValue = catalogMappingVM.VanNozzleValue;
                    //savedRecord.RaiseLowerValue = catalogMappingVM.RaiseLowerValue;
                    catalogMappingRepository.Update(savedRecord);
                    _unitOfWork.Commit();
                }
                return JsonResponse.RecordModified;
            }
            else
            {
                //savedRecord new record
                CatalogMappingLabel catalogMappingLabel = new();
                catalogMappingLabel = _mapper.Map<CatalogMappingLabel>(catalogMappingVM);
                catalogMappingRepository.Add(catalogMappingLabel);
                _unitOfWork.Commit();
                return JsonResponse.RecordSaved;

            }
        }

        public CatalogMappingVM MappingPageData()
        {
            CatalogMappingVM catalogMappingVM = new();
            try
            {
                var catalogMappingRepository = _unitOfWork.GetRepository<CatalogMappingLabel>();
                var inspectionLabel = catalogMappingRepository.List().FirstOrDefault();
                if (inspectionLabel != null)
                {
                    catalogMappingVM = _mapper.Map<CatalogMappingVM>(inspectionLabel);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return catalogMappingVM;
        }



    }
}


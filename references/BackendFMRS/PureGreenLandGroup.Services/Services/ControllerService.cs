using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Models.DTO.SP_Models;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Domain.Entities;
using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Utility.Enums;
using Microsoft.Data.SqlClient;
using System.Data;
using AutoMapper;

namespace PureGreenLandGroup.Services.Services
{
    public class ControllerService : IControllerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        private readonly IPropertiesService _propertiesService;
        public ControllerService(IUnitOfWork unitOfWork, IMapper mapper, IMasterDataHandlerService masterDataHandlerService, IPropertiesService propertiesService)
        {
            _unitOfWork = unitOfWork;

            _mapper = mapper;
             _masterDataHandlerService = masterDataHandlerService;
            _propertiesService = propertiesService; 
        }

        public async Task<CreateControllerViewModel> CreateControllerPageData(int propertyId)
        {
            try
            {
                CreateControllerViewModel createControllerViewModel = new();
                createControllerViewModel.PropertyViewModel = await _propertiesService.GetPropertyById(propertyId);
                createControllerViewModel.ControllerViewModel = new ControllerDetailsViewModel();

                //initialize 4 program by default
                List<ProgramViewModel> controllerPrograms = new List<ProgramViewModel>();
                for (int i = 0; i < 4; i++)
                {
                    ProgramViewModel programViewModel = new ProgramViewModel();
                    controllerPrograms.Add(programViewModel);
                }
                createControllerViewModel.ProgramsListViewModel = controllerPrograms;
                createControllerViewModel.ControllerZonesList = new List<ZoneViewModel>() { new ZoneViewModel() };
                createControllerViewModel.ValveSizeList = _masterDataHandlerService.GetValveSizeMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.SprinklerTypesList = _masterDataHandlerService.GetSprinklersMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.PlantTypeList = _masterDataHandlerService.GetPlantsMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.SoilTypeList = _masterDataHandlerService.GetSoilTypeMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.WaterSourceList = _masterDataHandlerService.GetWaterSourceMasterList();
                createControllerViewModel.ModelsList = _masterDataHandlerService.GetModelsMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.ManufacturerList = _masterDataHandlerService.GetManufacturersMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.ProgramRunTime = _masterDataHandlerService.GetProgramRunTimeMasterList().Where(m => m.IsActive).ToList();
                createControllerViewModel.ProgramStartTime = _masterDataHandlerService.GetProgramStartTimeMasterList();

                //setting up seasonal adjust data
                List<SeasionalAdjustViewModel> seasonalAdjustList = new();
                for (int month = 1; month <= 12; month++)
                {
                    seasonalAdjustList.Add(new SeasionalAdjustViewModel() { ControllerId = 0, MonthId = month });
                }
                SeasonalAdjutMasterViewModel seasonalAdjustMasterViewModel = new()
                {
                    SeasionalAdjustViewModel = seasonalAdjustList,
                    seasonalAdjustDropdownData = _masterDataHandlerService.GetSeasonalAdjustDropdownMasterList()
                };
                createControllerViewModel.SeasonalAdjutMasterViewModels = seasonalAdjustMasterViewModel;

                return createControllerViewModel;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<ControllerListVM>> ControllerList(IConfiguration configuration, int propertyId, bool isAdminLoggedIn)
        {
            List<ControllerListVM> controllerListVMs = new();
            try
            {
                var conncection = configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection connection = new(conncection))
                {
                    using (SqlCommand query = new("[dbo].[usp_GetControllersList]", connection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;
                        query.Parameters.AddWithValue("@PropertyId", propertyId);
                        query.Parameters.AddWithValue("@isUserAdmin", isAdminLoggedIn);
                        // Open the connection
                        connection.Open();
                        // Execute the command

                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())
                            {
                                ControllerListVM controllerDTO = new()
                                {
                                    Id = data.GetInt32(data.GetOrdinal("Id")),
                                    ControllerName = data.IsDBNull(data.GetOrdinal("ControllerName")) ? null : data.GetString(data.GetOrdinal("ControllerName")),
                                    ZoneCount = data.GetInt32(data.GetOrdinal("ZoneCount")),
                                    PropertyName = data.IsDBNull(data.GetOrdinal("PropertyName")) ? null : data.GetString(data.GetOrdinal("PropertyName")),
                                    Address = data.IsDBNull(data.GetOrdinal("Address")) ? null : data.GetString(data.GetOrdinal("Address")),
                                    ModelName = data.IsDBNull(data.GetOrdinal("ModelName")) ? null : data.GetString(data.GetOrdinal("ModelName")),
                                    ManufacturerName = data.IsDBNull(data.GetOrdinal("ManufacturerName")) ? null : data.GetString(data.GetOrdinal("ManufacturerName")),
                                    IsRainSensor = data.GetBoolean(data.GetOrdinal("IsRainSensor")),
                                    FaultCount = (int)data.GetInt64(data.GetOrdinal("FaultCount")),
                                    TotalInspectionIssues = (int)data.GetInt64(data.GetOrdinal("TotalInspectionIssues")),
                                };
                                controllerListVMs.Add(controllerDTO);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return controllerListVMs;
        }

        public async Task<int> CreateNewController(CreateControllerViewModel createControllerViewModel)
        {
            int controllerStatusCode = 0;
            try
            {
                //save controller in db
                var controllerRepo = _unitOfWork.GetRepository<Controllers>();
                var controllerZonesRepo = _unitOfWork.GetRepository<ControllerZones>();
                var controllerProgramRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                var seasonalAdjustRepo = _unitOfWork.GetRepository<SeasionalAdjust>();
                Controllers controller = new();
                controller = _mapper.Map<Controllers>(createControllerViewModel.ControllerViewModel);
                controller.PropertyId = createControllerViewModel.PropertyViewModel.PropertId;
                controller.CreatedDate = DateTime.Now;
                controller.ModifiedDate = DateTime.Now;
                controllerRepo.Add(controller);
                await _unitOfWork.CommitAsync();


                // Now you can get the ID of the saved entity
                int controllerId = controller.Id;

                //save programs in database
                if (createControllerViewModel.ProgramsListViewModel.Count > 0)
                {
                    foreach (var programVM in createControllerViewModel.ProgramsListViewModel)
                    {
                        programVM.ControllerId = controllerId;
                        ControllerProgrames program = new();
                        program = _mapper.Map<ControllerProgrames>(programVM);
                        controllerProgramRepo.Add(program);
                    }
                }
                await _unitOfWork.CommitAsync();

                //save controller zones
                if (createControllerViewModel.ControllerZonesList.Count > 0)
                {
                    foreach (var zoneVM in createControllerViewModel.ControllerZonesList)
                    {
                        zoneVM.ControllerId = controllerId;
                        ControllerZones controllerZone = new();
                        controllerZone = _mapper.Map<ControllerZones>(zoneVM);
                        controllerZone.IsDeleted = false;
                        controllerZonesRepo.Add(controllerZone);
                    }
                }
                await _unitOfWork.CommitAsync();

                //save seasonal adjust
                //saving new records for seasonal adjust
                if (controllerId > 0 && createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel != null)
                {
                    foreach (var seasionalAdjustVM in createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel)
                    {
                        SeasionalAdjust seasionalAdjust = new();
                        seasionalAdjust = _mapper.Map<SeasionalAdjust>(seasionalAdjustVM);
                        seasionalAdjust.ControllerId = controllerId;
                        seasonalAdjustRepo.Add(seasionalAdjust);
                    }
                }
                await _unitOfWork.CommitAsync();
                controllerStatusCode = (int)JsonResponse.RecordSaved;
            }
            catch (Exception)
            {
                controllerStatusCode = (int)JsonResponse.Failed;
                throw;
            }
            return controllerStatusCode;
        }

        public async Task<bool> ModifyControllerDetails(CreateControllerViewModel createControllerViewModel)
        {
            bool isControllerModified = false;
            try
            {
                //update the existing record
                if (createControllerViewModel.ControllerViewModel != null && createControllerViewModel.ControllerViewModel.Id > 0)
                {
                    //first find the existing controller to update
                    var controllerRepo = _unitOfWork.GetRepository<Controllers>();
                    var controllerZonesRepo = _unitOfWork.GetRepository<ControllerZones>();
                    var controllerProgramRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                    var seasionalAdjustRepo = _unitOfWork.GetRepository<SeasionalAdjust>();

                    var controller = controllerRepo.List(m => m.Id == createControllerViewModel.ControllerViewModel.Id).FirstOrDefault();
                    if (controller != null)
                    {   
                        controller.ControllerName = createControllerViewModel.ControllerViewModel.ControllerName;
                        controller.ManufacturerId = createControllerViewModel.ControllerViewModel.ManufacturerId;
                        controller.ModelId = createControllerViewModel.ControllerViewModel.ModelId;
                        controller.WaterSourceId = createControllerViewModel.ControllerViewModel.WaterSourceId;
                        controller.Location = createControllerViewModel.ControllerViewModel.Location;
                        controller.Notes = createControllerViewModel.ControllerViewModel.Notes;
                        controller.IsRainSensor = createControllerViewModel.ControllerViewModel.IsRainSensor;
                        controller.ModifiedDate = DateTime.Now;
                        controller.ManufacturerId = createControllerViewModel.ControllerViewModel.ManufacturerId;
                        controller.ControllerType = createControllerViewModel.ControllerViewModel.ControllerType;
                        controllerRepo.Update(controller);
                        await _unitOfWork.CommitAsync();

                        //UPDATE PROGRAMS
                        var programsList = controllerProgramRepo.List(m => m.ControllerId == createControllerViewModel.ControllerViewModel.Id).ToList();
                        foreach (var program in programsList)
                        {
                            var progrmViewModel = createControllerViewModel.ProgramsListViewModel.Where(m => m.Id == program.Id).FirstOrDefault();
                            program.ProgramName = progrmViewModel.ProgramName;
                            program.ProgramTimer1 = progrmViewModel.ProgramTimer1;
                            program.ProgramTimer2 = progrmViewModel.ProgramTimer2;
                            program.ProgramTimer3 = progrmViewModel.ProgramTimer3;
                            program.Timer1Median = progrmViewModel.Timer1Median;
                            program.Timer2Median = progrmViewModel.Timer2Median;
                            program.Timer3Median = progrmViewModel.Timer3Median;
                            program.IsFriEnabled = progrmViewModel.IsFriEnabled;
                            program.IsThuEnabled = progrmViewModel.IsThuEnabled;
                            program.IsTueEnabled = progrmViewModel.IsTueEnabled;
                            program.IsWedEnabled = progrmViewModel.IsWedEnabled;
                            program.IsSatEnabled = progrmViewModel.IsSatEnabled;
                            program.IsSunEnable = progrmViewModel.IsSunEnable;
                            program.IsMonEnable = progrmViewModel.IsMonEnable;
                            controllerProgramRepo.Update(program);
                            await _unitOfWork.CommitAsync();
                        }

                        //UPDATE zones
                        var savedZoneRecordsList = controllerZonesRepo.List(m => m.ControllerId == createControllerViewModel.ControllerViewModel.Id).ToList();
                        foreach (var zoneEntity in savedZoneRecordsList)
                        {
                            var zoneViewModel = createControllerViewModel.ControllerZonesList.Where(m => m.Id == zoneEntity.Id).FirstOrDefault();
                            //update existing zones
                            if (zoneViewModel != null && zoneViewModel.Id > 0)
                            {
                                //check if zone is deleted
                                if (zoneViewModel.IsDeleted)
                                {
                                    zoneEntity.IsDeleted = zoneViewModel.IsDeleted;
                                    await _unitOfWork.CommitAsync();
                                }
                                else
                                {
                                    zoneEntity.ZoneLocationName = zoneViewModel.ZoneLocationName;
                                    zoneEntity.Description = zoneViewModel.Description;
                                    zoneEntity.ProgramA = zoneViewModel.ProgramA;
                                    zoneEntity.ProgramB = zoneViewModel.ProgramB;
                                    zoneEntity.ProgramC = zoneViewModel.ProgramC;
                                    zoneEntity.ProgramD = zoneViewModel.ProgramD;
                                    zoneEntity.ValveSizeId = zoneViewModel.ValveSizeId;
                                    zoneEntity.FlowRate = zoneViewModel.FlowRate;
                                    zoneEntity.SprinkleTypeId = zoneViewModel.SprinkleTypeId;
                                    zoneEntity.PlantTypeId = zoneViewModel.PlantTypeId;
                                    zoneEntity.SoilTypeId = zoneViewModel.SoilTypeId;
                                    zoneEntity.ManufacturerId = zoneViewModel.ManufacturerId;
                                    controllerZonesRepo.Update(zoneEntity);
                                    await _unitOfWork.CommitAsync();
                                }
                            }
                        }

                        //check if there is new zone added, if yes create new record for that
                        var newAddedZonesList = createControllerViewModel.ControllerZonesList.Where(m => m.Id == 0).ToList();
                        if (newAddedZonesList.Count > 0)
                        {
                            foreach (var zoneItem in newAddedZonesList)
                            {
                                zoneItem.ControllerId = createControllerViewModel.ControllerViewModel.Id;
                                ControllerZones newAddedControllerZoneEntity = new();
                                newAddedControllerZoneEntity = _mapper.Map<ControllerZones>(zoneItem);
                                controllerZonesRepo.Add(newAddedControllerZoneEntity);
                                await _unitOfWork.CommitAsync();
                            }
                        }

                        //update seasonal records
                        var seasonalAdjustExistingData = seasionalAdjustRepo.List(m => m.ControllerId == createControllerViewModel.ControllerViewModel.Id).ToList();
                        //update saved records
                        if (createControllerViewModel.SeasonalAdjutMasterViewModels != null && createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel != null)
                        {
                            int i = 0;
                            foreach (var seasonalAdjustEntity in seasonalAdjustExistingData)
                            {
                                seasonalAdjustEntity.ProgramA = createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel[i].ProgramA;
                                seasonalAdjustEntity.ProgramB = createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel[i].ProgramB;
                                seasonalAdjustEntity.ProgramC = createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel[i].ProgramC;
                                seasonalAdjustEntity.ProgramD = createControllerViewModel.SeasonalAdjutMasterViewModels.SeasionalAdjustViewModel[i].ProgramD;
                                seasionalAdjustRepo.Update(seasonalAdjustEntity);
                                i++;
                            }
                            await _unitOfWork.CommitAsync();
                        }
                        isControllerModified = true;
                    }
                }
                else
                {

                }
            }
            catch (Exception)
            {

                throw;
            }
            return isControllerModified;
        }

        public async Task<CreateControllerViewModel> GetControllerDetails(int controllerId)
        {
            try
            {
                CreateControllerViewModel createControllerViewModel;
                //get controller details
                var controllerRepo = _unitOfWork.GetRepository<Controllers>();
                var propertiesRepo = _unitOfWork.GetRepository<Properties>();
                var controllerProgramRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                var controllerZonesRepo = _unitOfWork.GetRepository<ControllerZones>();
                var seasonalAdjustRepo = _unitOfWork.GetRepository<SeasionalAdjust>();
                var controllerDetails = controllerRepo.List(m => m.Id == controllerId).FirstOrDefault();
                if (controllerDetails != null)
                {
                    var propertyDetails = propertiesRepo.List(m => m.Id == controllerDetails.PropertyId).FirstOrDefault();
                    var controllerProgramsList = controllerProgramRepo.List(m => m.ControllerId == controllerId).ToList();
                    var controllerZonesList = controllerZonesRepo.List(m => m.ControllerId == controllerId).ToList();
                    var seasonalAdjustList = seasonalAdjustRepo.List(m => m.ControllerId == controllerId).ToList();

                    PropertyViewModel propertyViewModel = new PropertyViewModel()
                    {
                        PropertId = propertyDetails.Id,
                        PropertName = propertyDetails.PropertyName,
                        PropertAddress = propertyDetails.PropertyAddressLine1 + " " + propertyDetails.PropertyAddressLine2 + " " + propertyDetails.PropertyAddressCity + " " + propertyDetails.PropertyAddressStateProvinceCode + " " + propertyDetails.PropertyAddressZipCode
                    };

                    SeasonalAdjutMasterViewModel seasonalAdjutMasterViewModel = new()
                    {
                        SeasionalAdjustViewModel = _mapper.Map<List<SeasionalAdjustViewModel>>(seasonalAdjustList),
                        seasonalAdjustDropdownData =  _masterDataHandlerService.GetSeasonalAdjustDropdownMasterList()
                    };

                    var modelList = new List<ModelsViewModels>(); 
                    if (controllerDetails.ManufacturerId > 0)
                    {
                        modelList = _masterDataHandlerService.GetModelsMasterList().Where(m => m.IsActive).ToList();
                        modelList = modelList.Where(m=>m.ManufacturerId== controllerDetails.ManufacturerId).ToList();   
                    }
                    
                    //get master data
                    createControllerViewModel = new()
                    {
                        ControllerViewModel = _mapper.Map<ControllerDetailsViewModel>(controllerDetails),
                        ProgramsListViewModel = _mapper.Map<IList<ProgramViewModel>>(controllerProgramsList),
                        ControllerZonesList = _mapper.Map<List<ZoneViewModel>>(controllerZonesList),
                        ValveSizeList =  _masterDataHandlerService.GetValveSizeMasterList().Where(m => m.IsActive).ToList(),
                        SprinklerTypesList =  _masterDataHandlerService.GetSprinklersMasterList().Where(m => m.IsActive).ToList(),
                        PlantTypeList =  _masterDataHandlerService.GetPlantsMasterList().Where(m => m.IsActive).ToList(),
                        SoilTypeList =  _masterDataHandlerService.GetSoilTypeMasterList().Where(m => m.IsActive).ToList(),
                        WaterSourceList =  _masterDataHandlerService.GetWaterSourceMasterList(),
                        ModelsList = modelList,
                        ManufacturerList =  _masterDataHandlerService.GetManufacturersMasterList().Where(m=>m.IsActive).ToList(),
                        ProgramRunTime =  _masterDataHandlerService.GetProgramRunTimeMasterList().Where(m => m.IsActive).ToList(),
                        ProgramStartTime =  _masterDataHandlerService.GetProgramStartTimeMasterList(),
                        SeasonalAdjutMasterViewModels = seasonalAdjutMasterViewModel,
                        PropertyViewModel = propertyViewModel
                    };

                }
                else
                {
                    //initialize 4 program by default
                    List<ProgramViewModel> controllerPrograms = new List<ProgramViewModel>();
                    for (int i = 0; i < 4; i++)
                    {
                        ProgramViewModel programViewModel = new ProgramViewModel();
                        controllerPrograms.Add(programViewModel);
                    }
                    //setting up seasonal adjust data
                    List<SeasionalAdjustViewModel> seasonalAdjustList = new();
                    for (int month = 1; month <= 12; month++)
                    {
                        seasonalAdjustList.Add(new SeasionalAdjustViewModel() { ControllerId = 0, MonthId = month });
                    }
                    SeasonalAdjutMasterViewModel seasonalAdjustMasterViewModel = new()
                    {
                        SeasionalAdjustViewModel = seasonalAdjustList,
                        seasonalAdjustDropdownData =  _masterDataHandlerService.GetSeasonalAdjustDropdownMasterList()
                    };
                    createControllerViewModel = new CreateControllerViewModel()
                    {
                        ControllerViewModel = new ControllerDetailsViewModel(),
                        ProgramsListViewModel = controllerPrograms,
                        ControllerZonesList = new List<ZoneViewModel>(),
                        ValveSizeList =  _masterDataHandlerService.GetValveSizeMasterList(),
                        SprinklerTypesList =  _masterDataHandlerService.GetSprinklersMasterList(),
                        PlantTypeList =  _masterDataHandlerService.GetPlantsMasterList(),
                        SoilTypeList =  _masterDataHandlerService.GetSoilTypeMasterList(),
                        WaterSourceList =  _masterDataHandlerService.GetWaterSourceMasterList(),
                        ModelsList =  _masterDataHandlerService.GetModelsMasterList(),
                        ManufacturerList =  _masterDataHandlerService.GetManufacturersMasterList(),
                        ProgramRunTime =  _masterDataHandlerService.GetProgramRunTimeMasterList(),
                        ProgramStartTime =  _masterDataHandlerService.GetProgramStartTimeMasterList(),
                        SeasonalAdjutMasterViewModels = seasonalAdjustMasterViewModel,
                        PropertyViewModel = new PropertyViewModel()
                    };

                }
                return createControllerViewModel;
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}

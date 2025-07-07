using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Domain.Entities.InspectionEntities;
using PureGreenLandGroup.Models.ViewModel.BaseViewModels;
using PureGreenLandGroup.Models.ViewModel.Inspection;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Domain.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using AutoMapper;
using PureGreenLandGroup.Utility.Enums;

namespace PureGreenLandGroup.Services.Services
{
    public class InspectionService : IInspectionService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string _connection = string.Empty;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMasterDataHandlerService _masterDataHandlerService;
        public InspectionService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration, IUnitOfWork unitOfWork, IMasterDataHandlerService masterDataHandlerService)
        {
            _connection = configuration.GetConnectionString("DefaultConnection")!;
            _dbContext = dbContext;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _masterDataHandlerService = masterDataHandlerService;
        }

        /// <summary>
        /// returns the data for the inspection create page
        /// </summary>
        /// <param name="controllerId"></param>
        /// <returns></returns>
        public async Task<InspectionMasterViewModel> GetInspectionMasterPageDetails(int controllerId)
        {
            try
            {
                InspectionMasterViewModel inspectionMasterViewModel = new();
                var controllerRepo = _unitOfWork.GetRepository<Controllers>();
                var propertiesRepo = _unitOfWork.GetRepository<Properties>();
                var controllerProgramRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                var controllerZonesRepo = _unitOfWork.GetRepository<ControllerZones>();
                var seasonalAdjustRepo = _unitOfWork.GetRepository<SeasionalAdjust>();
                var modelsRepo = _unitOfWork.GetRepository<MstModels>();
                var manufacturersRepo = _unitOfWork.GetRepository<MstManufacturer>();
                var brokenLateralDropdownRepo = _unitOfWork.GetRepository<MstBrokenLateralDropdown>();
                var zoneIssuesDropDownRepo = _unitOfWork.GetRepository<MstZoneIssuesDropDown>();
                var seasonalAdjustDropDownRepo = _unitOfWork.GetRepository<MstSeasonalAdjustDropdown>();

                var controller = controllerRepo.List(m => m.Id == controllerId).FirstOrDefault();
                var property = propertiesRepo.List(m => m.Id == controller.PropertyId).FirstOrDefault();
                //controller/property details

                string modelName = string.Empty;
                string manufacturerName = string.Empty;
                string waterSrc = string.Empty;
                var model = modelsRepo.List(m => m.Id == controller.ModelId).FirstOrDefault();
                var manufacturerList = manufacturersRepo.List();
                var manufacturer = manufacturerList.Where(m => m.Id == controller.ManufacturerId).FirstOrDefault();
                var zoneList = controllerZonesRepo.List(m => m.ControllerId == controllerId && !m.IsDeleted).ToList();

                if (model != null)
                {
                    modelName = model.ModelName;
                }
                if (manufacturer != null)
                {
                    manufacturerName = manufacturer.ManufacturerName;
                }

                GetControllersListViewModel getControllersListViewModel = new()
                {
                    Id = controller.Id,
                    PropertyId = controller.PropertyId,
                    ControllerName = controller.ControllerName,
                    ControllerLocation = controller.Location,
                    TotalZones = zoneList.Where(m => !m.IsDeleted).Count(),
                    PropertyName = property.PropertyName,
                    PropertyAddress = property.PropertyAddressLine1 + " " + property.PropertyAddressLine2 + " " + property.PropertyAddressCity + " " + property.PropertyAddressStateProvinceCode + " " + property.PropertyAddressZipCode,
                    Model = modelName,
                    Manufacturer = manufacturerName,
                    RainSensor = false,
                    ControllerType = controller.ControllerType
                };

                //controller programs list
                var controllerProgramsList = controllerProgramRepo.List(m => m.ControllerId == controllerId).ToList();

                //controller seasonal adjust list
                var seasonalAdjustList = seasonalAdjustRepo.List(m => m.ControllerId == controllerId).ToList();

                // broken Lateral Data  list  list
                var brokenLateralList = brokenLateralDropdownRepo.List();
                // zone Issues dropdown list  
                var zoneIssuesDropdown = _masterDataHandlerService.GetZoneIssuesDropdownList();

                inspectionMasterViewModel.GetControllersViewModel = getControllersListViewModel;
                inspectionMasterViewModel.ProgramDetailsList = _mapper.Map<IList<ProgramViewModel>>(controllerProgramsList);
                inspectionMasterViewModel.ZoneIssuesDropDown = zoneIssuesDropdown;
                //master data
                inspectionMasterViewModel.BrokenLateralDropdown = _mapper.Map<List<BrokenLateralDropdownViewModel>>(brokenLateralList);
                inspectionMasterViewModel.PlantTypeList = _masterDataHandlerService.GetPlantsMasterList().Where(m => m.IsActive).ToList();
                inspectionMasterViewModel.SoilTypeList = _masterDataHandlerService.GetSoilTypeMasterList().Where(m => m.IsActive).ToList();
                inspectionMasterViewModel.ModelsList = _masterDataHandlerService.GetModelsMasterList().Where(m => m.IsActive).ToList();
                inspectionMasterViewModel.ValveSizeList = _masterDataHandlerService.GetValveSizeMasterList().Where(m => m.IsActive).ToList();
                inspectionMasterViewModel.SprinklerTypesList = _masterDataHandlerService.GetSprinklersMasterList().Where(m => m.IsActive).ToList();
                inspectionMasterViewModel.ZoneAreaDropDown = _masterDataHandlerService.GetZoneAreaDropdownList();
                inspectionMasterViewModel.ManufacturerList = _masterDataHandlerService.GetManufacturersMasterList().Where(m => m.IsActive).ToList();

                inspectionMasterViewModel.CreateInspectionViewModel = new CreateInspectionViewModel();
                if (seasonalAdjustList.Any() )
                {
                    var seasonalAdjustMstList = seasonalAdjustDropDownRepo.List();
                    var seasonalAdjustVMList = new List<SeasionalAdjustViewModel>();
                    foreach (var item in seasonalAdjustList)
                    {
                        SeasionalAdjustViewModel seasonalAdjustViewModel = new SeasionalAdjustViewModel();
                        seasonalAdjustViewModel.ControllerId = item.ControllerId;
                        seasonalAdjustViewModel.MonthId = item.MonthId;
                        seasonalAdjustViewModel.ProgramA = seasonalAdjustMstList.Where(m=>m.Id== item.ProgramA).FirstOrDefault()!.Value;
                        seasonalAdjustViewModel.ProgramB = seasonalAdjustMstList.Where(m=>m.Id== item.ProgramB).FirstOrDefault()!.Value;
                        seasonalAdjustViewModel.ProgramC = seasonalAdjustMstList.Where(m=>m.Id== item.ProgramC).FirstOrDefault()!.Value;
                        seasonalAdjustViewModel.ProgramD = seasonalAdjustMstList.Where(m=>m.Id== item.ProgramD).FirstOrDefault()!.Value;
                        seasonalAdjustVMList.Add(seasonalAdjustViewModel);
                    }
                    inspectionMasterViewModel.SeasionalAdjustList = seasonalAdjustVMList;

                }
                else
                {
                    inspectionMasterViewModel.SeasionalAdjustList = new List<SeasionalAdjustViewModel>();
                }
                //zones data
                if (zoneList.Count > 0)
                {
                    inspectionMasterViewModel.ZonesList = _mapper.Map<List<ZoneViewModel>>(zoneList);
                    inspectionMasterViewModel.CreateInspectionViewModel.ZoneIssuesInspectionViewModel = new List<ZoneIssuesInspectionViewModel>();
                    foreach (var item in inspectionMasterViewModel.ZonesList)
                    {
                        inspectionMasterViewModel.CreateInspectionViewModel.ZoneIssuesInspectionViewModel.Add(new ZoneIssuesInspectionViewModel() { ZoneViewModel = new ZoneViewModel(), InspectedZoneBrokenLateralList = new List<InspectedZoneBrokenLateralViewModel>(), InspectedZoneBrokenMainViewModel = new List<InspectedZoneBrokenMainViewModel>(), InspectedZoneImagesList = new List<InspectedZoneImagesViewModel>() });
                    }
                }
                else
                {
                    inspectionMasterViewModel.ZonesList = new List<ZoneViewModel>();
                }
                return inspectionMasterViewModel;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// manage the create and the update inspection event
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        public async Task<int> InspectionHandler(CreateInspectionViewModel createInspectionViewModel)
        {
            int statusCode = 0;
            try
            {
                if (createInspectionViewModel.Id > 0)
                {
                    //update the inspection
                    bool isInspectionCreated = await this.ModifyInspectionDetails(createInspectionViewModel);
                    if (isInspectionCreated)
                    {
                        statusCode = 200;
                    }
                    else
                    {
                        statusCode = 400;
                    }
                }
                else
                {
                    //create new inspection
                    bool isInspectionCreated = await this.CreateNewInspection(createInspectionViewModel);
                    if (isInspectionCreated)
                    {
                        statusCode = 200;
                    }
                    else
                    {
                        statusCode = 400;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return statusCode;
        }

        /// <summary>
        /// create new inspection
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        public async Task<bool> CreateNewInspection(CreateInspectionViewModel createInspectionViewModel)
        {
            bool status = false;
            //save inspection details
            var inspectionRepo = _unitOfWork.GetRepository<Inspection>();
            var zoneIssuesRepo = _unitOfWork.GetRepository<ZoneIssuesInspection>();
            var controllerZonesRepo = _unitOfWork.GetRepository<ControllerZones>();
            var draftIrrigationSettingsRepo = _unitOfWork.GetRepository<DraftIrrigationSettings>();
            var inspectedZoneBrokenLateralRepo = _unitOfWork.GetRepository<InspectedZoneBrokenLateral>();
            var inspectedZoneBrokenMainRepo = _unitOfWork.GetRepository<InspectedZoneBrokenMain>();
            var inspectedZoneImagesRepo = _unitOfWork.GetRepository<InspectedZoneImages>();
            var inspectedValveFailRepo = _unitOfWork.GetRepository<InspectedValveFail>();
            var inspectedMoveHeadRepo = _unitOfWork.GetRepository<InspectedMoveHead>();
            Inspection inspection = new();
            inspection = _mapper.Map<Inspection>(createInspectionViewModel);
            inspection.InspectionDate = DateTime.Now;
            inspection.InspectionModifiedDate = DateTime.Now;
            inspection.IsActive = true;
            inspectionRepo.Add(inspection);
            //var savedInspection = _dbContext.Inspection.Add(inspection);
            _unitOfWork.Commit();

            //get inspection id
            int inspectionId = inspection.Id;

            //save zone issue for inspection
            if (createInspectionViewModel.ZoneIssuesInspectionViewModel!.Count > 0)
            {
                int counter = 0;
                foreach (var item in createInspectionViewModel.ZoneIssuesInspectionViewModel)
                {
                    ZoneIssuesInspection zoneIssuesInspection = new ZoneIssuesInspection();
                    zoneIssuesInspection = _mapper.Map<ZoneIssuesInspection>(item);
                    zoneIssuesInspection.InspectionId = inspectionId;
                    zoneIssuesInspection.ZoneId = item.ZoneViewModel!.Id;
                    zoneIssuesInspection.CloggedNozzle = item.MprCloggedNozzle + item.VanCloggedNozzle;
                    zoneIssuesRepo.Add(zoneIssuesInspection);
                    _unitOfWork.Commit();
                    //update zone irrigation settings only if inspection is completed
                    //update zone details from irrigation settings popup
                    if (createInspectionViewModel.IsInspectionCompleted)
                    {
                        var zone = controllerZonesRepo.List(m => m.Id == createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Id).FirstOrDefault();
                        if (zone != null)
                        {
                            zone.Description = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Description;
                            zone.SprinkleTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SprinkleTypeId;
                            zone.ValveSizeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.ValveSizeId;
                            zone.PlantTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.PlantTypeId;
                            zone.SoilTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SoilTypeId;
                            controllerZonesRepo.Update(zone);
                        }
                    }
                    else
                    {
                        //for draft inspection irrigation settings will be saved in different table
                        //cause we can not update irrigation settings when inspection is drafted
                        DraftIrrigationSettings draftIrrigationSettings = new();
                        draftIrrigationSettings.ZoneIssuesInspectionId = zoneIssuesInspection.Id;
                        draftIrrigationSettings.ZoneDescription = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Description;
                        draftIrrigationSettings.SprinkleTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SprinkleTypeId;
                        draftIrrigationSettings.ValveSizeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.ValveSizeId;
                        draftIrrigationSettings.PlantTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.PlantTypeId;
                        draftIrrigationSettings.SoilTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SoilTypeId;
                        draftIrrigationSettingsRepo.Add(draftIrrigationSettings);
                    }

                    _unitOfWork.Commit();
                    int inspectedZoneId = zoneIssuesInspection.Id;

                    //save broken lateral of inspected zone
                    if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenLateralList != null)
                    {
                        foreach (var brokenLateral in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenLateralList!)
                        {
                            brokenLateral.ZoneIssuesInspectionId = inspectedZoneId;
                            InspectedZoneBrokenLateral inspectedZoneBrokenLateral = new InspectedZoneBrokenLateral();
                            inspectedZoneBrokenLateral = _mapper.Map<InspectedZoneBrokenLateral>(brokenLateral);
                            inspectedZoneBrokenLateralRepo.Add(inspectedZoneBrokenLateral);
                        }
                        _unitOfWork.Commit();
                    }
                    //save broken Main of inspected zone
                    if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenMainViewModel != null)
                    {
                        foreach (var brokenMain in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenMainViewModel!)
                        {
                            brokenMain.ZoneIssuesInspectionId = inspectedZoneId;
                            InspectedZoneBrokenMain inspectedZoneBrokenMain = new InspectedZoneBrokenMain();
                            inspectedZoneBrokenMain = _mapper.Map<InspectedZoneBrokenMain>(brokenMain);
                            inspectedZoneBrokenMainRepo.Add(inspectedZoneBrokenMain);
                        }
                        _unitOfWork.Commit();
                    }
                    //save images of inspected zone
                    if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneImagesList != null)
                    {
                        foreach (var zoneImage in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneImagesList!)
                        {
                            zoneImage.ZoneIssuesInspectionId = inspectedZoneId;
                            InspectedZoneImages inspectedZoneImages = new InspectedZoneImages();
                            inspectedZoneImages = _mapper.Map<InspectedZoneImages>(zoneImage);
                            inspectedZoneImagesRepo.Add(inspectedZoneImages);
                        }
                        _unitOfWork.Commit();
                    }

                    //save valve fail details 
                    if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ValveStatus!.ToLower() == "fail" && createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedValveFailVM != null)
                    {
                        var valveFailDetailsVM = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedValveFailVM;
                        var inspectionValveFailEntity = new InspectedValveFail
                        {
                            ZoneIssuesInspectionId = inspectedZoneId,
                            ManufacturerId = valveFailDetailsVM!.ManufacturerId,
                            ValveSizeId = valveFailDetailsVM.ValveSizeId,
                            IsDecoderIssue = valveFailDetailsVM.IsDecoderIssue,
                            IsSolenoidIssue = valveFailDetailsVM.IsSolenoidIssue,
                            IsValveIssue = valveFailDetailsVM.IsValveIssue,
                            DecoderModelId = valveFailDetailsVM.DecoderModelId,
                        };
                        inspectedValveFailRepo.Add(inspectionValveFailEntity);

                        //update controller zone details(Valve size) for valve status
                        int zoneId = item.ZoneViewModel!.Id;
                        var savedZoneDetails = controllerZonesRepo.List(x => x.Id == zoneId).FirstOrDefault();
                        if (savedZoneDetails != null && savedZoneDetails.ValveSizeId != valveFailDetailsVM.ValveSizeId)
                        {
                            savedZoneDetails.ValveSizeId = valveFailDetailsVM.ValveSizeId;
                        }
                        if (savedZoneDetails != null && savedZoneDetails.ManufacturerId != valveFailDetailsVM.ManufacturerId)
                        {
                            savedZoneDetails.ManufacturerId = valveFailDetailsVM.ManufacturerId;
                        }
                        _unitOfWork.Commit();
                    }
                    //save move head
                    if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedMoveHeadList != null)
                    {
                        foreach (var moveHeadVM in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedMoveHeadList!)
                        {
                            moveHeadVM.ZoneIssuesInspectionId = inspectedZoneId;
                            InspectedMoveHead inspectedMoveHead = new();
                            inspectedMoveHead = _mapper.Map<InspectedMoveHead>(moveHeadVM);
                            inspectedMoveHeadRepo.Add(inspectedMoveHead);
                        }
                        _unitOfWork.Commit();
                    }
                    counter++;
                }
                status = true;
                //calculate faults
                await this.CalculateInspectionFaults(createInspectionViewModel, true);
            }
            return status;
        }





        /// <summary>
        /// update the inspection
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <returns></returns>
        public async Task<bool> ModifyInspectionDetails(CreateInspectionViewModel createInspectionViewModel)
        {
            bool status = false;
            //find inspection record to update 
            var inspectionRecord = _dbContext.Inspection.Where(m => m.Id == createInspectionViewModel.Id).FirstOrDefault();
            if (inspectionRecord != null)
            {
                inspectionRecord.Title = createInspectionViewModel.Title;
                inspectionRecord.Type = createInspectionViewModel.Type.ToString();
                inspectionRecord.PriorEquipment = createInspectionViewModel.PriorEquipment;
                inspectionRecord.Compliant = createInspectionViewModel.Compliant;
                inspectionRecord.RainSensor = createInspectionViewModel.RainSensor;
                inspectionRecord.WaterPressure = createInspectionViewModel.WaterPressure;
                inspectionRecord.WaterPressureUnit = createInspectionViewModel.WaterPressureUnit;
                inspectionRecord.Comment = createInspectionViewModel.Comment;
                inspectionRecord.IsInspectionCompleted = createInspectionViewModel.IsInspectionCompleted;
                inspectionRecord.IsInspectionDraft = createInspectionViewModel.IsInspectionDraft;
                inspectionRecord.InspectionModifiedDate = DateTime.Now;
                var response = _dbContext.Inspection.Update(inspectionRecord);
                await _unitOfWork.CommitAsync();
                //update zone issues 
                if (createInspectionViewModel.ZoneIssuesInspectionViewModel != null && createInspectionViewModel.ZoneIssuesInspectionViewModel.Count > 0)
                {
                    //calculate faults
                    //await this.CalculateInspectionFaults(createInspectionViewModel, false);

                    var zoneIssuesList = _dbContext.ZoneIssuesInspection.Where(m => m.InspectionId == createInspectionViewModel.Id).ToList();
                    int counter = 0;
                    foreach (var zoneIssueRecord in zoneIssuesList)
                    {
                        #region UPDATE ZONE ISSUES
                        var newZoneIssues = createInspectionViewModel.ZoneIssuesInspectionViewModel.Where(m => m.Id == zoneIssueRecord.Id).FirstOrDefault();

                        zoneIssueRecord.ValveStatus = newZoneIssues!.ValveStatus;
                        zoneIssueRecord.CloggedNozzle = newZoneIssues.MprCloggedNozzle + newZoneIssues.VanCloggedNozzle;
                        zoneIssueRecord.MprCloggedNozzle = newZoneIssues.MprCloggedNozzle;
                        zoneIssueRecord.VanCloggedNozzle = newZoneIssues.VanCloggedNozzle;
                        zoneIssueRecord.BrokenSpray = newZoneIssues.BrokenSpray;
                        zoneIssueRecord.BrokenRotor = newZoneIssues.BrokenRotor;
                        zoneIssueRecord.RaiseLower = newZoneIssues.RaiseLower;
                        zoneIssueRecord.Move = newZoneIssues.Move;
                        zoneIssueRecord.Area = newZoneIssues.Area;
                        zoneIssueRecord.GpmValue = newZoneIssues.GpmValue;
                        zoneIssueRecord.Comment = newZoneIssues.Comment;
                        _dbContext.ZoneIssuesInspection.Update(zoneIssueRecord);
                        await _unitOfWork.CommitAsync();
                        // _dbContext.SaveChanges();
                        #endregion UPDATE ZONE ISSUES

                        //update zone irrigation settings only if inspection is completed
                        //update zone details from irrigation settings popup

                        #region UPDATED IRRIGATION SETTINGS OF INSPECTED ZONE BEGINS

                        if (inspectionRecord.IsInspectionCompleted)
                        {
                            var zone = _dbContext.ControllerZones.Where(m => m.Id == createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Id).FirstOrDefault();
                            if (zone != null)
                            {
                                zone.Description = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Description;
                                zone.SprinkleTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SprinkleTypeId;
                                zone.ValveSizeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.ValveSizeId;
                                zone.PlantTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.PlantTypeId;
                                zone.SoilTypeId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.SoilTypeId;
                                _dbContext.ControllerZones.Update(zone);
                            }
                            await _unitOfWork.CommitAsync();
                            //_dbContext.SaveChanges();
                        }

                        #endregion  UPDATED IRRIGATION SETTINGS OF INSPECTED ZONE ENDS

                        #region UPDATE BROKEN LATERAL HEAD OF INSPECTED ZONE BEGINS

                        //find saved broken lateral head of current zone issues
                        var savedBrokenLateralList = _dbContext.InspectedZoneBrokenLateral.Where(m => m.ZoneIssuesInspectionId == zoneIssueRecord.Id).ToList();
                        //remove saved zone issues
                        _dbContext.InspectedZoneBrokenLateral.RemoveRange(savedBrokenLateralList);

                        //create new records as data posted
                        if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenLateralList.Count > 0)
                        {
                            foreach (var brokenLateral in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenLateralList!)
                            {
                                //brokenLateral.ZoneIssuesInspectionId = zoneIssueRecord.Id;
                                InspectedZoneBrokenLateral inspectedZoneBrokenLateral = new()
                                {
                                    Value = brokenLateral.Value.ToString(),
                                    ZoneIssuesInspectionId = zoneIssueRecord.Id
                                };

                                //inspectedZoneBrokenLateral = _mapper.Map<InspectedZoneBrokenLateral>(brokenLateral);
                                _dbContext.InspectedZoneBrokenLateral.Add(inspectedZoneBrokenLateral);
                            }
                            await _unitOfWork.CommitAsync();
                            // _dbContext.SaveChanges();
                        }


                        #endregion UPDATE BROKEN LATERAL HEAD OF INSPECTED ZONE ENDS

                        #region UPDATE BROKEN MAIN HEAD OF INSPECTED ZONE BEGINS

                        //find saved broken main head of current zone issues
                        var savedBrokenMainList = _dbContext.InspectedZoneBrokenMain.Where(m => m.ZoneIssuesInspectionId == zoneIssueRecord.Id).ToList();
                        //remove saved zone issues
                        _dbContext.InspectedZoneBrokenMain.RemoveRange(savedBrokenMainList);

                        //create new records as data posted
                        if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenMainViewModel.Count > 0)
                        {
                            foreach (var brokenMain in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneBrokenMainViewModel!)
                            {
                                InspectedZoneBrokenMain inspectedZoneBrokenMain = new()
                                {
                                    Value = brokenMain.Value.ToString(),
                                    ZoneIssuesInspectionId = zoneIssueRecord.Id
                                };
                                _dbContext.InspectedZoneBrokenMain.Add(inspectedZoneBrokenMain);
                            }
                            await _unitOfWork.CommitAsync();
                        }

                        #endregion UPDATE BROKEN MAIN HEAD OF INSPECTED ZONE ENDS

                        #region UPDATE IMAGES OF INSPECTED ZONE BEGINS
                        int zoneIssueId = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].Id;
                        var savedZoneImagesList = _dbContext.InspectedZoneImages.Where(m => m.ZoneIssuesInspectionId == zoneIssueId).ToList();
                        var postedZoneImagesList = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneImagesList;

                        int imageCounter = 0;

                        //update existing images records id there is any changes
                        var listOfIdsToCheck = postedZoneImagesList!.Select(m => m.Id).ToList();

                        foreach (var savedImages in savedZoneImagesList)
                        {
                            if (listOfIdsToCheck.Contains(savedImages.Id))
                            {
                                savedImages.ImageCaption = postedZoneImagesList![imageCounter].ImageCaption;
                                savedImages.ImageIssueStatus = postedZoneImagesList[imageCounter].ImageIssueStatus;
                                _dbContext.InspectedZoneImages.Update(savedImages);
                            }
                            imageCounter++;
                        }
                        await _unitOfWork.CommitAsync();

                        //check for new added images
                        var newUploadedImages = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedZoneImagesList!.Where(m => m.Id == 0).ToList();
                        if (newUploadedImages.Count > 0)
                        {
                            foreach (var newImage in newUploadedImages)
                            {
                                newImage.ZoneIssuesInspectionId = zoneIssueId;
                                InspectedZoneImages inspectedZoneImages = new InspectedZoneImages();
                                inspectedZoneImages = _mapper.Map<InspectedZoneImages>(newImage);
                                _dbContext.InspectedZoneImages.Add(inspectedZoneImages);
                            }
                            await _unitOfWork.CommitAsync();
                        }

                        #endregion UPDATE IMAGES OF INSPECTED ZONE ENDS

                        #region UPDATE MOVE HEAD BEGINS
                        //find saved move head of current zone issues
                        var savedMoveHeadList = _dbContext.InspectedMoveHead.Where(m => m.ZoneIssuesInspectionId == zoneIssueRecord.Id).ToList();
                        //remove saved zone issues
                        _dbContext.InspectedMoveHead.RemoveRange(savedMoveHeadList);

                        //create new records as data posted
                        if (createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedMoveHeadList!.Count > 0)
                        {
                            foreach (var moveHead in createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedMoveHeadList!)
                            {
                                InspectedMoveHead inspectedMoveHead = new()
                                {
                                    MoveHeadId = moveHead.MoveHeadId,
                                    ZoneIssuesInspectionId = zoneIssueRecord.Id
                                };
                                _dbContext.InspectedMoveHead.Add(inspectedMoveHead);
                            }
                            await _unitOfWork.CommitAsync();
                        }

                        #endregion UPDATE MOVE HEAD ENDS

                        //update the valve Fail details
                        if (!string.IsNullOrEmpty(createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ValveStatus) && createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ValveStatus!.ToLower() == "fail")
                        {
                            var valveFailVM = createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].InspectedValveFailVM;
                            var valveFailDetails = _dbContext.InspectedValveFail.Where(m => m.Id == valveFailVM.Id).FirstOrDefault();
                            if (valveFailDetails != null)
                            {
                                valveFailDetails.IsValveIssue = valveFailVM.IsValveIssue;
                                valveFailDetails.IsDecoderIssue = valveFailVM.IsDecoderIssue;
                                valveFailDetails.IsSolenoidIssue = valveFailVM.IsSolenoidIssue;
                                //update the decoder model only if decoder issue is checked
                                if (valveFailVM.IsDecoderIssue)
                                {
                                    valveFailDetails.DecoderModelId = valveFailVM.DecoderModelId;
                                }
                                _dbContext.InspectedValveFail.Update(valveFailDetails);
                                //update the valve size of controller zone if changed on the edit inspection
                                if (valveFailDetails.ValveSizeId != valveFailVM.ValveSizeId)
                                {
                                    var zone = _dbContext.ControllerZones.Where(m => m.Id == createInspectionViewModel.ZoneIssuesInspectionViewModel[counter].ZoneViewModel!.Id).FirstOrDefault();
                                    if (zone != null)
                                    {
                                        zone.ValveSizeId = valveFailVM.ValveSizeId;
                                        _dbContext.ControllerZones.Update(zone);
                                    }
                                }
                            }
                            _unitOfWork.Commit();
                        }
                        counter++;
                    }

                }
            }
            return status;
        }

        /// <summary>
        /// returns the inspection list data for the inspection grid page
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="inspectionStatus"></param>
        /// <returns></returns>
        public async Task<List<InspectionList>> GetInspectionList(int userId, int inspectionStatus)
        {
            List<InspectionList> inspectionList = new();
            try
            {
                if (userId > 0)
                {
                    var userInspection = _dbContext.Inspection.Where(m => m.UserId == userId && m.IsActive).ToList();
                    if (userId == 1)
                    {
                        userInspection = _dbContext.Inspection.Where(m => m.IsActive).ToList();
                    }
                    //filter inspection based on status as all/completed/drafted
                    if (inspectionStatus > 0)
                    {
                        if (inspectionStatus == 1)
                        {
                            userInspection = userInspection.Where(m => m.IsInspectionDraft).ToList();
                        }
                        if (inspectionStatus == 2)
                        {
                            userInspection = userInspection.Where(m => m.IsInspectionCompleted).ToList();
                        }
                    }

                    foreach (var inspection in userInspection)
                    {
                        InspectionList inspectionModel = new();
                        inspectionModel.InspectionId = inspection.Id;
                        inspectionModel.InspectionName = inspection.Title;
                        inspectionModel.IsInspectionCompleted = inspection.IsInspectionCompleted;
                        inspectionModel.IsInspectionDraft = inspection.IsInspectionDraft;
                        inspectionModel.InspectionDate = inspection.InspectionModifiedDate;

                        var controller = _dbContext.Controllers.Where(m => m.Id == inspection.ControllerId).FirstOrDefault();
                        if (controller != null)
                        {
                            var property = _dbContext.Properties.Where(m => m.Id == controller.PropertyId).FirstOrDefault();
                            inspectionModel.ControllerId = controller.Id;
                            inspectionModel.ControllerName = controller.ControllerName;
                            if (property != null)
                            {
                                inspectionModel.PropertyId = property.Id;
                                inspectionModel.PropertyName = property.PropertyName;
                                //filter inspections for active property for technician
                                if (userId > 1 && !property.IsActive)
                                {
                                    continue;
                                }
                            }
                        }
                        var user = _dbContext.MstUsersDetails.Where(m => m.Id == inspection.UserId).FirstOrDefault();
                        inspectionModel.Inspector = user!.FirstName + " " + user.LastName;
                        inspectionList.Add(inspectionModel);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return inspectionList;
        }

        /// <summary>
        /// returns the zone details by zone id
        /// </summary>
        /// <param name="zoneId"></param>
        /// <returns></returns>
        public async Task<ZoneIssuesMasterViewModel> GetZoneDetailsByZoneId(int zoneId)
        {
            ZoneIssuesMasterViewModel zoneIssuesMasterViewModel = new();
            if (zoneId > 0)
            {
                var zoneDetails = _dbContext.ControllerZones.Where(m => m.Id == zoneId).FirstOrDefault();
                // Plant list  list
                var plantList = _dbContext.MstPlantType.ToList();
                // sprinklers list  list
                var sprinklersList = _dbContext.MstSprinklerType.ToList();
                // soil list  list
                var soilList = _dbContext.MstSoilType.ToList();
                // valve size list  list
                var valveSizeList = _dbContext.MstValveSize.ToList();
                // slopes  list  list
                var slopeList = _dbContext.MstSlope.ToList();

                // zone area dropdown list  
                var zoneAreaDropdown = _dbContext.MstZoneAreaDropDown.ToList();

                zoneIssuesMasterViewModel.PlantTypeList = _mapper.Map<List<PlantTypeViewModel>>(plantList);
                zoneIssuesMasterViewModel.SoilTypeList = _mapper.Map<List<SoilTypeViewModel>>(soilList);
                zoneIssuesMasterViewModel.SlopeList = _mapper.Map<List<SlopeViewModel>>(slopeList);
                zoneIssuesMasterViewModel.ValveSizeList = _mapper.Map<List<ValveSizeViewModel>>(valveSizeList);
                zoneIssuesMasterViewModel.SprinklerTypesList = _mapper.Map<List<SprinklerTypesViewModel>>(sprinklersList);
                zoneIssuesMasterViewModel.ZoneAreaDropDown = _mapper.Map<List<ZoneAreaDropDownViewModel>>(zoneAreaDropdown);
                zoneIssuesMasterViewModel.ZoneViewModel = _mapper.Map<ZoneViewModel>(zoneDetails);
            }

            return zoneIssuesMasterViewModel;
        }

        /// <summary>
        /// returns the inspection all details by inspection id
        /// </summary>
        /// <param name="inspectionId"></param>
        /// <returns></returns>

        public async Task<InspectionMasterViewModel> GetInspectionDetailsById(int inspectionId)
        {
            InspectionMasterViewModel inspectionMasterViewModel = new();
            try
            {
                var inspectionDetails = _dbContext.Inspection.Where(m => m.Id == inspectionId).FirstOrDefault();
                if (inspectionDetails != null)
                {
                    var controller = _dbContext.Controllers.Where(m => m.Id == inspectionDetails.ControllerId).FirstOrDefault();
                    var property = _dbContext.Properties.Where(m => m.Id == controller.PropertyId).FirstOrDefault();
                    var userDetail = _dbContext.MstUsersDetails.Where(m => m.Id == inspectionDetails.UserId).FirstOrDefault();

                    string modelName = string.Empty;
                    string manufacturerName = string.Empty;
                    string waterSrc = string.Empty;
                    var model = _dbContext.MstModels.Where(m => m.Id == controller.ModelId).FirstOrDefault();
                    var manufacturerList = _dbContext.MstManufacturer.ToList();
                    var manufacturer = manufacturerList.Where(m => m.Id == controller.ManufacturerId).FirstOrDefault();
                    var waterSrcObj = _dbContext.MstWaterSource.Where(m => m.Id == controller.WaterSourceId).FirstOrDefault();
                    if (model != null)
                    {
                        modelName = model.ModelName;
                    }
                    if (manufacturer != null)
                    {
                        manufacturerName = manufacturer.ManufacturerName;
                    }
                    if (waterSrcObj != null)
                    {
                        waterSrc = waterSrcObj.WaterSourceName;
                    }
                    //controller/property details
                    GetControllersListViewModel getControllersListViewModel = new()
                    {
                        Id = controller.Id,
                        PropertyId = controller.PropertyId,
                        ControllerName = controller.ControllerName,
                        ControllerLocation = controller.Location,
                        RainSensor = controller.IsRainSensor,
                        TotalZones = _dbContext.ControllerZones.Where(m => m.ControllerId == inspectionDetails.ControllerId).Count(),
                        PropertyName = property.PropertyName,
                        PropertyAddress = property.PropertyAddressLine1 + " " + property.PropertyAddressLine2 + " " + property.PropertyAddressCity + " " + property.PropertyAddressStateProvinceCode + " " + property.PropertyAddressZipCode,
                        Model = modelName,
                        Manufacturer = manufacturerName,
                        InspectorName = userDetail.FirstName + " " + userDetail.LastName,
                        InspectionType = inspectionDetails.Type,
                        WaterSource = waterSrc,
                        WaterPressure = inspectionDetails.WaterPressure + " " + inspectionDetails.WaterPressureUnit,
                        InspectionComment = inspectionDetails.Comment,
                        InspectionDate = inspectionDetails.InspectionDate,
                        ControllerType = controller.ControllerType
                    };

                    //controller programs list
                    var programs = _dbContext.ControllerProgrames.Where(m => m.ControllerId == inspectionDetails.ControllerId).ToList();
                    //controller seasonal adjust list
                    var seasonalAdjustList = _dbContext.SeasionalAdjust.Where(m => m.ControllerId == inspectionDetails.ControllerId).ToList();
                    //controller zones  list
                    var zoneList = _dbContext.ControllerZones.Where(m => m.ControllerId == inspectionDetails.ControllerId).ToList();

                    // broken Lateral Data  list  list
                    var brokenLateralList = _dbContext.MstBrokenLateralDropdown.ToList();
                    // zone Issues dropdown list  
                    var zoneIssuesDropdown = _dbContext.MstZoneIssuesDropDown.ToList();
                    // Plant list  list
                    var plantList = _dbContext.MstPlantType.Where(m => m.IsActive).ToList();
                    // sprinklers list  list
                    var sprinklersList = _dbContext.MstSprinklerType.Where(m => m.IsActive).ToList();
                    // soil list  list
                    var soilList = _dbContext.MstSoilType.Where(m => m.IsActive).ToList();
                    // valve size list  list
                    var valveSizeList = _dbContext.MstValveSize.Where(m => m.IsActive).ToList();
                    // slopes  list  list
                    //var slopeList = _dbContext.MstSlope.ToList();

                    // zone area dropdown list  
                    var zoneAreaDropdown = _dbContext.MstZoneAreaDropDown.ToList();

                    //get inspection issues
                    var inspectionIssues = _dbContext.ZoneIssuesInspection.Where(m => m.InspectionId == inspectionId).ToList();


                    CreateInspectionViewModel createInspectionViewModel = _mapper.Map<CreateInspectionViewModel>(inspectionDetails);
                    List<ZoneIssuesInspectionViewModel> zoneIssuesList = new();
                    int counter = 0;
                    foreach (var savedZoneIssue in inspectionIssues)
                    {
                        ZoneIssuesInspectionViewModel zoneIssuesVM = _mapper.Map<ZoneIssuesInspectionViewModel>(savedZoneIssue);

                        //insert zone irrigation detials
                        zoneIssuesVM.ZoneViewModel = _mapper.Map<ZoneViewModel>(zoneList[counter]);

                        //insert inspected zone broken lateral list for current zone issues
                        var inspectedBrokenLateralList = _dbContext.InspectedZoneBrokenLateral.Where(m => m.ZoneIssuesInspectionId == savedZoneIssue.Id).ToList();
                        zoneIssuesVM.InspectedZoneBrokenLateralList = _mapper.Map<List<InspectedZoneBrokenLateralViewModel>>(inspectedBrokenLateralList);

                        //insert inspected zone broken main list for current zone issues
                        var inspectedBrokenMainList = _dbContext.InspectedZoneBrokenMain.Where(m => m.ZoneIssuesInspectionId == savedZoneIssue.Id).ToList();
                        zoneIssuesVM.InspectedZoneBrokenMainViewModel = _mapper.Map<List<InspectedZoneBrokenMainViewModel>>(inspectedBrokenMainList);

                        //insert inspected zone images list for current zone issues
                        var inspectedZoneImagesList = _dbContext.InspectedZoneImages.Where(m => m.ZoneIssuesInspectionId == savedZoneIssue.Id).ToList();
                        zoneIssuesVM.InspectedZoneImagesList = _mapper.Map<List<InspectedZoneImagesViewModel>>(inspectedZoneImagesList);

                        //insert move head
                        var moveHeadList = _dbContext.InspectedMoveHead.Where(m => m.ZoneIssuesInspectionId == savedZoneIssue.Id).ToList();
                        zoneIssuesVM.InspectedMoveHeadList = _mapper.Map<List<InspectedMoveHeadVM>>(moveHeadList);

                        //check of for valve status details if it is FAIL
                        if (!string.IsNullOrEmpty(zoneIssuesVM.ValveStatus) && zoneIssuesVM.ValveStatus.ToLower() == "fail")
                        {
                            var inspectedValveFail = _dbContext.InspectedValveFail.Where(m => m.ZoneIssuesInspectionId == savedZoneIssue.Id).FirstOrDefault();
                            if (inspectedValveFail != null)
                            {
                                zoneIssuesVM.InspectedValveFailVM = _mapper.Map<InspectedValveFailVM>(inspectedValveFail);
                            }
                            else
                            {
                                zoneIssuesVM.InspectedValveFailVM = new InspectedValveFailVM();
                            }
                        }
                        else
                        {
                            zoneIssuesVM.InspectedValveFailVM = new InspectedValveFailVM();
                        }

                        zoneIssuesList.Add(zoneIssuesVM);
                        counter++;
                    }

                    createInspectionViewModel.ZoneIssuesInspectionViewModel = zoneIssuesList;

                    inspectionMasterViewModel.GetControllersViewModel = getControllersListViewModel;
                    inspectionMasterViewModel.ProgramDetailsList = _mapper.Map<List<ProgramViewModel>>(programs);
                    inspectionMasterViewModel.ZoneIssuesDropDown = _mapper.Map<List<ZoneIssuesDropDownViewModel>>(zoneIssuesDropdown);
                    //master data
                    inspectionMasterViewModel.BrokenLateralDropdown = _mapper.Map<List<BrokenLateralDropdownViewModel>>(brokenLateralList);
                    inspectionMasterViewModel.PlantTypeList = _mapper.Map<List<PlantTypeViewModel>>(plantList);
                    inspectionMasterViewModel.SoilTypeList = _mapper.Map<List<SoilTypeViewModel>>(soilList);
                    inspectionMasterViewModel.ModelsList = _masterDataHandlerService.GetModelsMasterList().Where(m => m.IsActive).ToList();
                    inspectionMasterViewModel.ValveSizeList = _mapper.Map<List<ValveSizeViewModel>>(valveSizeList);
                    inspectionMasterViewModel.SprinklerTypesList = _mapper.Map<List<SprinklerTypesViewModel>>(sprinklersList);
                    inspectionMasterViewModel.ZoneAreaDropDown = _mapper.Map<List<ZoneAreaDropDownViewModel>>(zoneAreaDropdown);
                    inspectionMasterViewModel.ManufacturerList = _mapper.Map<List<ManufacturerViewModel>>(manufacturerList.Where(m => m.IsActive));

                    inspectionMasterViewModel.CreateInspectionViewModel = createInspectionViewModel;
                    inspectionMasterViewModel.SeasionalAdjustList = _mapper.Map<List<SeasionalAdjustViewModel>>(seasonalAdjustList);
                    //zones data
                    if (zoneList.Count > 0)
                    {
                        inspectionMasterViewModel.ZonesList = _mapper.Map<List<ZoneViewModel>>(zoneList);
                    }
                    else
                    {
                        inspectionMasterViewModel.ZonesList = new List<ZoneViewModel>();
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return inspectionMasterViewModel;
        }


        /// <summary>
        /// calculate the faults for the inspection
        /// </summary>
        /// <param name="createInspectionViewModel"></param>
        /// <param name="isNewInspection"></param>
        /// <returns></returns>
        private async Task CalculateInspectionFaults(CreateInspectionViewModel createInspectionViewModel, bool isNewInspection)
        {
            try
            {
                //Approach
                //first find the total faults over zone issues
                //find inspected controller
                //update fault count of faults in controller record

                if (isNewInspection)
                {
                    int totalFault = 0;
                    int totalIssues = 0;
                    foreach (var zoneIssue in createInspectionViewModel.ZoneIssuesInspectionViewModel!)
                    {
                        totalIssues += zoneIssue.MprCloggedNozzle + zoneIssue.VanCloggedNozzle + zoneIssue.BrokenSpray + zoneIssue.BrokenRotor + zoneIssue.RaiseLower + zoneIssue.InspectedZoneBrokenLateralList!.Count + zoneIssue.InspectedZoneBrokenMainViewModel!.Count + zoneIssue.InspectedMoveHeadList!.Count;

                        if (zoneIssue.Move > 0)
                        {
                            totalIssues += 1;
                        }


                        //fault of valve status
                        if (!string.IsNullOrEmpty(zoneIssue.ValveStatus) && zoneIssue.ValveStatus == "Fail")
                        {
                            totalFault += 1;
                        }
                    }
                    var controllerRepo = _unitOfWork.GetRepository<Controllers>();
                    var controller = controllerRepo.List(m => m.Id == createInspectionViewModel.ControllerId).FirstOrDefault();
                    if (controller != null)
                    {
                        //controller.Faults = controller.Faults + totalFault;
                        controller.Faults = totalFault;
                        //controller.TotalInspectionIssues = controller.TotalInspectionIssues + totalIssues;
                        controller.TotalInspectionIssues = totalIssues;
                        //_dbContext.controllers.Update(controller);
                        await _unitOfWork.CommitAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResponse UpdateInspectionSeasonalAdjust(List<SeasionalAdjustViewModel> seasonalAdjustVMList, int controllerId)
        {
            var seasonalAdjustRepo = _unitOfWork.GetRepository<SeasionalAdjust>();
            var seasonalAdjustData = seasonalAdjustRepo.List(m => m.ControllerId == controllerId).ToList();
            if (seasonalAdjustData.Any())
            {
                int counter = 0;
                foreach (var savedRecord in seasonalAdjustData)
                {
                    savedRecord.ProgramA = seasonalAdjustVMList[counter].ProgramA;
                    savedRecord.ProgramB = seasonalAdjustVMList[counter].ProgramB;
                    savedRecord.ProgramC = seasonalAdjustVMList[counter].ProgramC;
                    savedRecord.ProgramD = seasonalAdjustVMList[counter].ProgramD;
                    counter += 1;
                }
                _unitOfWork.Commit();
            }

            return JsonResponse.Modified;
        }
    }
}

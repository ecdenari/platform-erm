using PureGreenLandGroup.Models.ViewModel.SiteControllerManagement;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using PureGreenLandGroup.Domain.Entities.InspectionEntities;
using PureGreenLandGroup.Models.ViewModel.Reports;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using PureGreenLandGroup.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;
using AutoMapper;
using System.Text;


namespace PureGreenLandGroup.Services.Services
{
    public class ReportService : IReportService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IControllerService _controllerService;
        public ReportService(IMapper mapper, IUnitOfWork unitOfWork, IControllerService controllerService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _controllerService = controllerService;
        }

        public List<ControllerTimeDetailsVM> ControllerRunTimeList(IConfiguration _configuration, int propId)
        {
            List<ControllerTimeDetailsVM> controllerTimeDetailsList = new();
            try
            {
                var conncection = _configuration.GetConnectionString("DefaultConnection");
                using (SqlConnection connection = new(conncection))
                {
                    using (SqlCommand query = new("[dbo].[usp_GetControllersWithTimeDetails]", connection))
                    {
                        // Set command type to stored procedure
                        query.CommandType = CommandType.StoredProcedure;
                        query.Parameters.AddWithValue("@PropertyId", propId);


                        // Open the connection
                        connection.Open();
                        // Execute the command
                        using (var data = query.ExecuteReader())
                        {
                            while (data.Read())
                            {
                                ControllerTimeDetailsVM controllerTimeDetailsVM = new()
                                {
                                    Id = data.GetInt32(data.GetOrdinal("Id")),
                                    ControllerName = data.IsDBNull(data.GetOrdinal("ControllerName")) ? null : data.GetString(data.GetOrdinal("ControllerName")),
                                    PropertyName = data.IsDBNull(data.GetOrdinal("PropertyName")) ? null : data.GetString(data.GetOrdinal("PropertyName")),
                                    Address = data.IsDBNull(data.GetOrdinal("Address")) ? null : data.GetString(data.GetOrdinal("Address")),
                                    ModelName = data.IsDBNull(data.GetOrdinal("ModelName")) ? null : data.GetString(data.GetOrdinal("ModelName")),
                                    ManufacturerName = data.IsDBNull(data.GetOrdinal("ManufacturerName")) ? null : data.GetString(data.GetOrdinal("ManufacturerName")),
                                    ProgramTimer1 = data.IsDBNull(data.GetOrdinal("ProgramTimer1")) ? null : data.GetString(data.GetOrdinal("ProgramTimer1")),
                                    TotalRuntimeInMinutes = data.GetInt32(data.GetOrdinal("TotalRuntimeInMinutes")),
                                    TotalWeeklyRuntime = data.GetInt32(data.GetOrdinal("TotalWeeklyRuntime")),

                                };
                                controllerTimeDetailsList.Add(controllerTimeDetailsVM);
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return controllerTimeDetailsList;
        }

        public List<ProgramViewModel> GetControllerProgramsById(int controllerId)
        {
            List<ProgramViewModel> programViewModels = new();
            try
            {
                var programsRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                var programs = programsRepo.List(m => m.ControllerId == controllerId).ToList();
                if (programs.Count > 0)
                {
                    programViewModels = _mapper.Map<List<ProgramViewModel>>(programs);
                }
            }
            catch (Exception)
            {

                throw;
            }
            return programViewModels;
        }

        public ProgramViewModel GetProgramsStartTimer(int controllerId, int programId)
        {
            ProgramViewModel programViewModels = new();
            try
            {
                var programsRepo = _unitOfWork.GetRepository<ControllerProgrames>();
                var programs = programsRepo.List(m => m.ControllerId == controllerId).ToList();
                if (programs.Count > 0)
                {
                    var program = programs.Where(m => m.Id == programId).FirstOrDefault();
                    programViewModels = _mapper.Map<ProgramViewModel>(program);
                }

            }
            catch (Exception)
            {

                throw;
            }
            return programViewModels;
        }


        public async Task<string> CreateControllerRuntimeReport(ControllerTimeDetailsVM controllerTimeDetailsVM)
        {
            StringBuilder controllerRunTimeReportData = new();
            string controllerDataOutput = string.Empty;
            try
            {
                if (controllerTimeDetailsVM != null)
                {
                    int controllerId = controllerTimeDetailsVM.Id;
                    // Adding the CSV content line by line
                    controllerRunTimeReportData.AppendLine($"Property Name,{controllerTimeDetailsVM.PropertyName}");
                    controllerRunTimeReportData.AppendLine($"Controller,{controllerTimeDetailsVM.ControllerName}");
                    controllerRunTimeReportData.AppendLine($"Program,{controllerTimeDetailsVM.ModelName}");//using ModelName prop to contains progrma name
                    controllerRunTimeReportData.AppendLine($"Start Time,{controllerTimeDetailsVM.ProgramTimer1}");//start time
                    controllerRunTimeReportData.AppendLine();
                    controllerRunTimeReportData.AppendLine("ZoneName,Run Time,Start Time");

                    TimeSpan totalRunTime = TimeSpan.Zero;

                    CreateControllerViewModel createController = _controllerService.GetControllerDetails(controllerId).Result;
                    if (createController != null)
                    {
                        if (createController.ControllerZonesList.Count > 0)
                        {

                            var startTimeSpanDefault = TimeSpan.Parse("00:00:00");
                            var startTimeMeridian = "AM";
                            if (controllerTimeDetailsVM.ProgramTimer1!.Contains("PM"))
                            {
                                startTimeMeridian = "PM";
                            }
                            if (!controllerTimeDetailsVM.ProgramTimer1.Contains("OFF"))
                            {
                                startTimeSpanDefault = TimeSpan.Parse(controllerTimeDetailsVM.ProgramTimer1.Replace("AM", string.Empty).Replace("PM", string.Empty));
                            }

                            foreach (var zone in createController.ControllerZonesList)
                            {
                                if (!controllerTimeDetailsVM.ProgramTimer1.Contains("OFF"))
                                {
                                    //add content in file
                                    controllerRunTimeReportData.AppendLine($"{zone.ZoneLocationName},{zone.ProgramA},{startTimeSpanDefault.ToString(@"hh\:mm")}{startTimeMeridian}");//ProgramTimer1 -> start time

                                    //calculate total run time
                                    if (TimeSpan.TryParse(zone.ProgramA, out TimeSpan zoneRunTime))
                                    {
                                        totalRunTime += zoneRunTime;
                                        startTimeSpanDefault += zoneRunTime;
                                    }
                                }
                            }

                            //create runtime report log
                            await CreateRuntimeReportLog(controllerId, createController.PropertyViewModel.PropertId, totalRunTime);

                        }
                    }
                    string formattedTotalRunTime = totalRunTime.ToString(@"hh\:mm");
                    controllerRunTimeReportData.AppendLine();
                    controllerRunTimeReportData.AppendLine($"Total Run Time,{formattedTotalRunTime}");
                }
                controllerDataOutput = controllerRunTimeReportData.ToString();


                return controllerDataOutput;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task CreateRuntimeReportLog(int controllerId, int propertyId, TimeSpan totalRuntime)
        {
            var runtimeReportLogRepo = _unitOfWork.GetRepository<RuntimeReportLog>();

            RuntimeReportLog runtimeReportLog = new()
            {
                ControllerId = controllerId,
                PropertyId = propertyId,
                TotalRuntime = totalRuntime,
                CreatedAt = DateTime.Now
            };

            runtimeReportLogRepo.Add(runtimeReportLog);
            await _unitOfWork.CommitAsync();
        }

        /*public async Task<string> CatalogMappingCSV(int inspectionId)
        {
            StringBuilder catalogMappingData = new();
            string catalogMappingOutput = string.Empty;
            try
            {
                if (inspectionId > 0)
                {
                    var inspectionRepository = _unitOfWork.GetRepository<Inspection>();
                    var zoneIssuesRepository = _unitOfWork.GetRepository<ZoneIssuesInspection>();
                    var brokenLateralRepository = _unitOfWork.GetRepository<InspectedZoneBrokenLateral>();
                    var brokenMainRepository = _unitOfWork.GetRepository<InspectedZoneBrokenMain>();
                    var brokenHeadMasterDataRepository = _unitOfWork.GetRepository<MstBrokenLateralDropdown>();
                    var valveFailRepository = _unitOfWork.GetRepository<InspectedValveFail>();
                    var manufacturerRepository = _unitOfWork.GetRepository<MstManufacturer>();
                    var valveSizeRepository = _unitOfWork.GetRepository<MstValveSize>();
                    var modelRepository = _unitOfWork.GetRepository<MstModels>();
                    var mappingCatalogRepository = _unitOfWork.GetRepository<CatalogMappingLabel>();
                    var inspectionRecord = inspectionRepository.List(m => m.Id == inspectionId).FirstOrDefault();
                    if (inspectionRecord != null)

                    {
                        var mappingInputs = mappingCatalogRepository.List().FirstOrDefault();
                        if (mappingInputs == null)
                        {
                            mappingInputs = new CatalogMappingLabel()
                            {
                                BrokenRotorValue = "Rotor Head - Replacement",
                                BrokenSprayValue = "Spray Head - Replacement",
                                VanNozzleValue = "Van Nozzle - Replacement",
                                MprNozzleValue = "MPR Nozzle - Replacement",
                                ValveIssueValue = "Valve Replacement",
                                DecoderIssueValue = "Decoder Replacement",
                                SolenoidIssueValue = "Solenoid Replacement",
                                BrokenLateralValue = "Lateral Line Repair",
                                BrokenMainValue = "Main Line Repair"
                            };
                        }

                        var zoneIssues = zoneIssuesRepository.List(m => m.InspectionId == inspectionRecord.Id).ToList();
                        int totalBrokenRotor = 0;
                        int totalBrokenSpray = 0;
                        int totalRaiseLower = 0;
                        int totalVanNozzle = 0;
                        int totalMprNozzle = 0;
                        List<InspectedZoneBrokenLateral> totalBrokenLateral = new();
                        List<InspectedZoneBrokenMain> totalBrokenMain = new();
                        foreach (var zoneIssuesInspection in zoneIssues)
                        {
                            totalBrokenRotor += zoneIssuesInspection.BrokenRotor;
                            totalBrokenSpray += zoneIssuesInspection.BrokenSpray;
                            totalVanNozzle += zoneIssuesInspection.VanCloggedNozzle;
                            totalMprNozzle += zoneIssuesInspection.MprCloggedNozzle;
                            totalRaiseLower += zoneIssuesInspection.RaiseLower;
                            //get the broken lateral
                            var brokenLateralList = brokenLateralRepository.List(m => m.ZoneIssuesInspectionId == zoneIssuesInspection.Id).ToList();
                            totalBrokenLateral.AddRange(brokenLateralList);
                            //get the broken main
                            var brokenMainList = brokenMainRepository.List(m => m.ZoneIssuesInspectionId == zoneIssuesInspection.Id).ToList();
                            totalBrokenMain.AddRange(brokenMainList);
                        }

                        //add header
                        catalogMappingData.AppendLine("Group Name,Service Name,Item Name,Qty,Uom");

                        // Adding the CSV content line by line
                        if (totalBrokenRotor > 0)
                        {
                            //text format [Rotor Head - Replacement]
                            catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.BrokenRotorValue},{totalBrokenRotor},EA");

                        }
                        if (totalBrokenSpray > 0)
                        {
                            //text format [Spray Head - Replacement]
                            catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.BrokenSprayValue},{totalBrokenSpray},EA");
                        }
                        if (totalVanNozzle > 0)
                        {
                            //text format [Van Nozzle - Replacement]
                            catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.VanNozzleValue},{totalVanNozzle},EA");
                        }
                        if (totalMprNozzle > 0)
                        {
                            //text format [MPR Nozzle - Replacement]
                            catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.MprNozzleValue},{totalMprNozzle} ,EA");
                        }

                        #region add Valve status data

                        foreach (var zoneIssuesInspection in zoneIssues)
                        {
                            if (!string.IsNullOrEmpty(zoneIssuesInspection.ValveStatus) && zoneIssuesInspection.ValveStatus.ToLower() == "fail")
                            {
                                var valveFailDetails = valveFailRepository.List(m => m.ZoneIssuesInspectionId == zoneIssuesInspection.Id).FirstOrDefault();
                                if (valveFailDetails != null)
                                {
                                    var manufacturer = manufacturerRepository.List(m => m.Id == valveFailDetails!.ManufacturerId).FirstOrDefault();
                                    var valveSize = valveSizeRepository.List(m => m.Id == valveFailDetails!.ValveSizeId).FirstOrDefault();
                                    var model = modelRepository.List(m => m.Id == valveFailDetails!.DecoderModelId).FirstOrDefault();
                                    if (valveFailDetails.IsValveIssue)
                                    {
                                        //text format [Valve Replacement - {valve size}]
                                        catalogMappingData.AppendLine(
                                            $"Services,Irrigation Repair,{mappingInputs.ValveIssueValue} - {valveSize.ValveSizenames},1,EA");
                                    }
                                    if (valveFailDetails.IsSolenoidIssue)
                                    {
                                        //text format [Solenoid Replacement]
                                        catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.SolenoidIssueValue} - {manufacturer.ManufacturerName},1,EA");
                                    }
                                    if (valveFailDetails.IsDecoderIssue)
                                    {
                                        //text format [Decoder Replacement - {Manufacturer} {Model}]
                                        catalogMappingData.AppendLine(
                                            $"Services,Irrigation Repair,{mappingInputs.DecoderIssueValue} - {manufacturer.ManufacturerName} {model.ModelName},1,EA");
                                    }
                                }
                            }
                        }
                        #endregion add Valve status data

                        //add broken Lateral in csv data
                        if (totalBrokenLateral.Count > 0)
                        {
                            // LINQ query to group by Value and count the occurrences for ZoneIssuesInspectionId = 1
                            var groupedBrokenLateral = totalBrokenLateral
                                .GroupBy(m => m.Value) // Group by the `Value`
                                .Select(BLI => new   //BLI  - broken lateral item
                                {
                                    Id = BLI.Key,  // the Value
                                    Count = BLI.Count() // count of occurrences
                                })
                                .ToList();

                            foreach (var item in groupedBrokenLateral)
                            {
                                //text format [Lateral Line Repair - {value}]
                                var brokenHead = brokenHeadMasterDataRepository.List(m => m.Id == Convert.ToInt32(item.Id)).FirstOrDefault();
                                catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.BrokenLateralValue} - {brokenHead.Value},{item.Count},EA");
                            }
                        }


                        //add broken main head in csv data
                        if (totalBrokenMain.Count > 0)
                        {
                            // LINQ query to group by Value and count the occurrences for ZoneIssuesInspectionId = 1
                            var groupedBrokenMain = totalBrokenMain
                                .GroupBy(m => m.Value) // Group by the `Value`
                                .Select(BMI => new  //BLI  - broken main item
                                {
                                    Id = BMI.Key,  // the Value
                                    Count = BMI.Count() // count of occurrences
                                })
                                .ToList();

                            foreach (var item in groupedBrokenMain)
                            {
                                //text format [Mainline Repair - {value}]
                                var brokenHead = brokenHeadMasterDataRepository.List(m => m.Id == Convert.ToInt32(item.Id)).FirstOrDefault();
                                catalogMappingData.AppendLine($"Services,Irrigation Repair,{mappingInputs.BrokenMainValue} - {brokenHead.Value},{item.Count},EA");
                            }
                        }

                    }
                }
                catalogMappingOutput = catalogMappingData.ToString();


                return catalogMappingOutput;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }*/


        public async Task<string> CatalogMappingCSV(int inspectionId)
        {
            StringBuilder catalogMappingData = new();
            try
            {
                if (inspectionId <= 0) return string.Empty;

                // Fetch all required data in a single query for each repository
                var inspectionRepository = _unitOfWork.GetRepository<Inspection>();
                var zoneIssuesRepository = _unitOfWork.GetRepository<ZoneIssuesInspection>();
                var brokenLateralRepository = _unitOfWork.GetRepository<InspectedZoneBrokenLateral>();
                var brokenMainRepository = _unitOfWork.GetRepository<InspectedZoneBrokenMain>();
                var brokenHeadMasterDataRepository = _unitOfWork.GetRepository<MstBrokenLateralDropdown>();
                var valveFailRepository = _unitOfWork.GetRepository<InspectedValveFail>();
                var manufacturerRepository = _unitOfWork.GetRepository<MstManufacturer>();
                var valveSizeRepository = _unitOfWork.GetRepository<MstValveSize>();
                var modelRepository = _unitOfWork.GetRepository<MstModels>();
                var mappingCatalogRepository = _unitOfWork.GetRepository<CatalogMappingLabel>();

                // Fetch data in bulk
                var inspectionRecord = await inspectionRepository.List(m => m.Id == inspectionId).FirstOrDefaultAsync();
                var mappingInputs =  mappingCatalogRepository.List().FirstOrDefault() ?? new CatalogMappingLabel
                {
                    BrokenRotorValue = "Rotor Head - Replacement",
                    BrokenSprayValue = "Spray Head - Replacement",
                    VanNozzleValue = "Van Nozzle - Replacement",
                    MprNozzleValue = "MPR Nozzle - Replacement",
                    ValveIssueValue = "Valve Replacement",
                    DecoderIssueValue = "Decoder Replacement",
                    SolenoidIssueValue = "Solenoid Replacement",
                    BrokenLateralValue = "Lateral Line Repair",
                    BrokenMainValue = "Main Line Repair"
                };

                var zoneIssues = await zoneIssuesRepository.List(m => m.InspectionId == inspectionId).ToListAsync();
                var brokenLaterals = await brokenLateralRepository.List(m => zoneIssues.Select(z => z.Id).Contains(m.ZoneIssuesInspectionId)).ToListAsync();
                var brokenMains = await brokenMainRepository.List(m => zoneIssues.Select(z => z.Id).Contains(m.ZoneIssuesInspectionId)).ToListAsync();
                var valveFails = await valveFailRepository.List(m => zoneIssues.Select(z => z.Id).Contains(m.ZoneIssuesInspectionId)).ToListAsync();

                // Aggregate counts and prepare CSV data
                int totalBrokenRotor = 0, totalBrokenSpray = 0, totalVanNozzle = 0, totalMprNozzle = 0, totalRaiseLower = 0;
                var totalBrokenLateral = new List<InspectedZoneBrokenLateral>();
                var totalBrokenMain = new List<InspectedZoneBrokenMain>();

                foreach (var zoneIssue in zoneIssues)
                {
                    totalBrokenRotor += zoneIssue.BrokenRotor;
                    totalBrokenSpray += zoneIssue.BrokenSpray;
                    totalVanNozzle += zoneIssue.VanCloggedNozzle;
                    totalMprNozzle += zoneIssue.MprCloggedNozzle;
                    totalRaiseLower += zoneIssue.RaiseLower;

                    totalBrokenLateral.AddRange(brokenLaterals.Where(bl => bl.ZoneIssuesInspectionId == zoneIssue.Id));
                    totalBrokenMain.AddRange(brokenMains.Where(bm => bm.ZoneIssuesInspectionId == zoneIssue.Id));
                }

                // Append CSV header
                catalogMappingData.AppendLine("Group Name,Service Name,Item Name,Qty,Uom");

                // Utility method to append CSV lines
                void AppendCsvLine(string serviceName, string itemName, int qty)
                {
                    if (qty > 0)
                    {
                        catalogMappingData.AppendLine($"Services,Irrigation Repair,{itemName},{qty},EA");
                    }
                }

                // Append data for rotor, spray, nozzle, and others
                AppendCsvLine("Irrigation Repair", mappingInputs.BrokenRotorValue, totalBrokenRotor);
                AppendCsvLine("Irrigation Repair", mappingInputs.BrokenSprayValue, totalBrokenSpray);
                AppendCsvLine("Irrigation Repair", mappingInputs.VanNozzleValue, totalVanNozzle);
                AppendCsvLine("Irrigation Repair", mappingInputs.MprNozzleValue, totalMprNozzle);

                // Handle valve issues (Valve Replacement, Solenoid, Decoder)
                foreach (var valveFail in valveFails)
                {
                    var manufacturer = await manufacturerRepository.List(m => m.Id == valveFail.ManufacturerId).FirstOrDefaultAsync();
                    var valveSize = await valveSizeRepository.List(m => m.Id == valveFail.ValveSizeId).FirstOrDefaultAsync();
                    var model = await modelRepository.List(m => m.Id == valveFail.DecoderModelId).FirstOrDefaultAsync();

                    if (valveFail.IsValveIssue && valveSize != null)
                        AppendCsvLine("Irrigation Repair", $"{mappingInputs.ValveIssueValue} - {valveSize.ValveSizenames}", 1);

                    if (valveFail.IsSolenoidIssue && manufacturer != null)
                        AppendCsvLine("Irrigation Repair", $"{mappingInputs.SolenoidIssueValue} - {manufacturer.ManufacturerName}", 1);

                    if (valveFail.IsDecoderIssue && manufacturer != null && model != null)
                        AppendCsvLine("Irrigation Repair", $"{mappingInputs.DecoderIssueValue} - {manufacturer.ManufacturerName} {model.ModelName}", 1);
                }

                // Handle broken laterals and mains
                foreach (var groupedBrokenLateral in totalBrokenLateral.GroupBy(bl => bl.Value))
                {
                    var brokenHead = await brokenHeadMasterDataRepository.List(m => m.Id == Convert.ToInt32(groupedBrokenLateral.Key)).FirstOrDefaultAsync();
                    AppendCsvLine("Irrigation Repair", $"{mappingInputs.BrokenLateralValue} - {brokenHead?.Value}", groupedBrokenLateral.Count());
                }

                foreach (var groupedBrokenMain in totalBrokenMain.GroupBy(bm => bm.Value))
                {
                    var brokenHead = await brokenHeadMasterDataRepository.List(m => m.Id == Convert.ToInt32(groupedBrokenMain.Key)).FirstOrDefaultAsync();
                    AppendCsvLine("Irrigation Repair", $"{mappingInputs.BrokenMainValue} - {brokenHead?.Value}", groupedBrokenMain.Count());
                }

                return catalogMappingData.ToString();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it more gracefully
                throw new ApplicationException("An error occurred while generating the CSV.", ex);
            }
        }
    }
}

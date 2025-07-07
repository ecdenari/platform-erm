using AutoMapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PureGreenLandGroup.Domain.Entities.SchedulerEntities;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Models.DTO.Equipment;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Utility.Constants;
using System.Net.Http.Headers;
using System.Text;

namespace PureGreenLandGroup.Services.Services
{
    public class EquipmentsService : IEquipmentsService
    {
        private readonly IMapper _mapper;
        private readonly IAspireService _aspireService;
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;
        public EquipmentsService(IMapper mapper, IAspireService aspireService, IConfiguration configuration, AppDbContext dbContext)
        {
            _mapper = mapper;
            _aspireService = aspireService;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<int> CreateNewAsset(AssetVM assetVM)
        {
            try
            {
                int assetStatusCode = 0;
                var maintainKey = _configuration.GetSection("MaintainX")["API_Key"]!.ToString();

                HttpClient httpClientCreateAsset = new HttpClient
                {
                    DefaultRequestHeaders = { Authorization = new AuthenticationHeaderValue("Bearer", maintainKey) }
                };

                // Serialize the assetVM to JSON
                string jsonContent = JsonConvert.SerializeObject(assetVM);

                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                var response = await httpClientCreateAsset.PostAsync(ApiUrls.CreateAsset, content);

                // Ensure the response was successful
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the response content if needed
                    string responseContent = await response.Content.ReadAsStringAsync();
                    AssetResponse assetResponse = JsonConvert.DeserializeObject<AssetResponse>(responseContent);
                    // Handle the response content as needed
                    if (assetResponse!.Id > 0)
                    {
                        assetStatusCode = assetResponse!.Id;
                    }
                }
                else
                {
                    // Handle the error response
                    string errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error creating asset: {errorContent}");
                }
                return assetStatusCode;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> CreateSchedulerLog(EqpSyncLogsVM eqpSyncLogsVM)
        {
            bool isLogCreated = false;
            if (eqpSyncLogsVM != null)
            {
                try
                {
                    //create log in database for the execution status of API
                    EquipmentSynLog equipmentSynLog = new()
                    {
                        RecordCreated = eqpSyncLogsVM.RecordCreated,
                        RecordUpdated = eqpSyncLogsVM.RecordUpdated,
                        CreatedAssetDescription = eqpSyncLogsVM.CreatedAssetDescription,
                        UpdatedAssetDescription = eqpSyncLogsVM.UpdatedAssetDescription,
                        ExecutionDateTime = DateTime.UtcNow,
                        ExecutionStatus = eqpSyncLogsVM.ExecutionStatus ? "Success" : "Fail" // Ternary condition for ExecutionStatus
                    };
                    _dbContext.EquipmentSynLog.Add(equipmentSynLog);
                    var result = _dbContext.SaveChanges();
                    if (result > 0)
                    {
                        isLogCreated = true;
                    }
                }
                catch (Exception)
                {

                    throw;
                }
            }
            return isLogCreated;
        }

        public async Task<bool> CreateExceptionLog(SchedulerExceptionLogVM exception)
        {
            bool isLogCreated = false;
            try
            {
                SchedulerExceptions schedulerExceptions = new();
                schedulerExceptions.StackTrace = exception.StackTrace;
                schedulerExceptions.Message = exception.Message;
                schedulerExceptions.Source = exception.Source;
                schedulerExceptions.DateTime = exception.DateTime;
                _dbContext.SchedulerExceptions.Add(schedulerExceptions);
                var result = _dbContext.SaveChanges();
                if (result > 1)
                {
                    isLogCreated = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return isLogCreated;
        }

        public async Task<bool> SaveCreatedAssetIdLog(EquipmentAssetIdVM schedulerCreatedAssetsVM)
        {
            bool isLogCreated = false;
            try
            {
                EquipmentAssetIds schedulerCreatedAssets = new();
                schedulerCreatedAssets = _mapper.Map<EquipmentAssetIds>(schedulerCreatedAssetsVM);
                _dbContext.EquipmentAssetIds.Add(schedulerCreatedAssets);
                var res = _dbContext.SaveChanges();
                if (res > 0)
                {
                    isLogCreated = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return isLogCreated;
        }

        public async Task<List<EquipmentAssetIdVM>> GetEquipmentAssetIdLogList()
        {
            try
            {
                var dataList = _dbContext.EquipmentAssetIds.ToList();
                List<EquipmentAssetIdVM> equipmentAssetIdVMList = _mapper.Map<List<EquipmentAssetIdVM>>(dataList);
                return equipmentAssetIdVMList;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

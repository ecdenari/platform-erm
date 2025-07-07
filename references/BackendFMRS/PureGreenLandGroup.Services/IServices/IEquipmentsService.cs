using PureGreenLandGroup.Models.DTO.Equipment;

namespace PureGreenLandGroup.Services.IServices
{
    public interface IEquipmentsService
    {
        Task<int> CreateNewAsset(AssetVM assetVM);

        Task<bool> CreateSchedulerLog(EqpSyncLogsVM eqpSyncLogsVM);

        Task<bool> CreateExceptionLog(SchedulerExceptionLogVM exception);
        Task<bool> SaveCreatedAssetIdLog(EquipmentAssetIdVM schedulerCreatedAssetsVM);
        Task<List<EquipmentAssetIdVM>> GetEquipmentAssetIdLogList();
    }
}

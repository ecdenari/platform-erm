namespace PureGreenLandGroup.Utility.Constants
{
    public class ApiUrls
    {
        //user apis
        public const string Login = "/api/Auth/Login";
        public const string GetAllUsers = "/api/User/GetAllActiveUsers";
        public const string GetAllRoles = "/api/User/GetAllRoles";
        public const string CreateUser = "/api/User/CreateNewUser";
        public const string SendResetPasswordLink = "/api/User/SendResetPasswordLink?email=[0]";
        public const string ResetPassword = "/api/User/ResetPassword";



        public const string GetControllerProgramsById = "/api/ReportDataHandler/GetControllerProgramsById?controllerId=[0]";
        public const string GetProgramsStartTimer = "/api/ReportDataHandler/GetProgramsStartTimer?controllerId=[0]&programId=[1]";
        
        public const string GetPropertyStatistics = "/api/Properties/GetPropertyStatistics";
        public const string GetLatestProperties = "/api/Properties/GetLatestProperties";
       
        public const string GetPropertiesList = "/api/Properties/GetPropertiesList";
        public const string ChangePropertyStatus = "/api/Properties/SwitchPropertyStatus?id=[0]&propertyStatus=[1]";
        public const string GetUserDetailById = "/api/User/GetUserDetailById?userId=[0]";
        public const string DeleteUser = "/api/User/DeleteUser?userId=[0]";
        public const string SwitchUserStatus = "/api/User/SwitchUserStatus?userId=[0]&status=[1]";
        public const string GetProgramRunTimeMasterData = "/api/MasterDataProvider/GetProgramRunTimeMasterData";
        public const string GetControllerRunTimeList = "/api/ReportDataHandler/GetControllerRunTimeList?propId=[1]";


        //controller CRUD
        public const string GetControllerListData = "/api/ControllersHandler/GetControllerList?propertyId=[0]&isAdminLoggedIn=[1]";
        public const string CreateControllerPageData = "/api/ControllersHandler/CreateControllerPageData?propertyId=[0]";
        public const string CreateController = "/api/ControllersHandler/CreateController";
        public const string ModifyControllerDetails = "/api/ControllersHandler/ModifyControllerDetails";
        public const string GetControllerDetailsById = "/api/ControllersHandler/GetControllerDetailsById?controllerId=[0]";
        public const string GetMasterDataForDynamicZone = "/api/MasterDataHandler/GetMasterDataForDynamicZone";
        public const string ControllerRuntimeReport = "/api/ReportDataHandler/GetControllerRuntimeReport";


        //Inspection APIS
        public const string GetCreateInspectionData = "/api/Inspection/GetCreateInspectionData?controllerId=[0]";
        public const string CreateNewInspection = "/api/Inspection/CreateNewInspection";
        public const string UpdateInspection = "/api/Inspection/UpdateInspection";
        public const string GetUserSpecificInspectionList = "/api/Inspection/GetUserInspectionList?userId=[0]&inspectionStatus=[1]";
        public const string GetInspectionDetailsById = "/api/Inspection/GetInspectionDetailsToPopulate?inspectionId=[0]";
        public const string UpdateInspectionSeasonalAdjust = "/api/Inspection/UpdateInspectionSeasonalAdjust?controllerId=[0]";

        //catalog csv mapping api

        public const string CatalogMappingCSV = "/api/ReportDataHandler/CatalogMappingCSV?inspectionId=[0]";



        public const string GetAspireProperties = "https://cloud-api.youraspire.com/Properties";
        public const string GetEquipments = "https://cloud-api.youraspire.com/Equipments";
        // public const string GetBranches = "https://cloud-api.youraspire.com/Branches";
        // public const string GetPropertyStatuses = "https://cloud-api.youraspire.com/PropertyStatuses";
        // public const string GetPropertyTypes = "https://cloud-api.youraspire.com/PropertyTypes";
        public const string CreateAsset = "https://api.getmaintainx.com/v1/assets";

        #region master data api begins
        public const string GetMasterDataStatistics = "/api/MasterDataHandler/GetMasterDataStatistics";

        //manufacturers API
        public const string ManufacturersList = "/api/Manufacturer/ManufacturersList";
        public const string Manufacturer = "/api/Manufacturer/GetManufacturer?id=[0]";
        public const string CreateManufacturer = "/api/Manufacturer/CreateManufacturer";
        public const string UpdateManufacturer = "/api/Manufacturer/UpdateManufacturer";

        public const string ChangeMasterEntityStatus = "/api/MasterDataHandler/ChangeMasterEntitiesStatus?id=[0]&status=[1]&masterEntityType=[2]";
        public const string CreateMapping = "/api/MasterDataHandler/CreateCatalogInputs";
        public const string MappingPageData = "/api/MasterDataHandler/MappingPageData";
        public const string GetSavedMappingData = "/api/MasterDataHandler/GetSavedMappingData";


        //models API
        public const string ModelsList = "/api/Model/ModelList";
        public const string ModelGridList = "/api/Model/ModelGridList";
        public const string Model = "/api/Model/GetModel?id=[0]";
        public const string CreateModel = "/api/Model/CreateModel";
        public const string UpdateModel = "/api/Model/UpdateModel";
        public const string ModelListByManufacturerId = "/api/Model/ModelListByManufacturerId?manufacturerId=[0]";

        //plants API
        public const string PlantsList = "/api/PlantType/PlantTypeList";
        public const string Plant = "/api/PlantType/GetPlantType?id=[0]";
        public const string CreatePlantType = "/api/PlantType/CreatePlantType";
        public const string UpdatePlantType = "/api/PlantType/UpdatePlantType";

        //soil type data API
        public const string SoilTypeList = "/api/SoilType/SoilTypeList";
        public const string SoilType = "/api/SoilType/SoilType?id=[0]";
        public const string CreateSoilType = "/api/SoilType/CreateSoilType";
        public const string UpdateSoilType = "/api/SoilType/UpdateSoilType";

        //Sprinkler type data API
        public const string SprinklerList = "/api/Sprinklers/SprinklerList";
        public const string Sprinkler = "/api/Sprinklers/Sprinkler?id=[0]";
        public const string CreateSprinkler = "/api/Sprinklers/CreateSprinkler";
        public const string UpdateSprinkler = "/api/Sprinklers/UpdateSprinkler";

        //Valve size data API
        public const string ValveSizeList = "/api/ValveSize/ValveSizeList";
        public const string ValveSize = "/api/ValveSize/ValveSize?id=[0]";
        public const string CreateValveSize = "/api/ValveSize/CreateValveSize";
        public const string UpdateValveSize = "/api/UpdateValveSize/UpdateValveSize";

        //Seasonal adjust type data API
        public const string SeasonalAdjustMonthList = "/api/SeasonalAdjustMonth/SeasonalAdjustMonthList";
        public const string SeasonalAdjustMonth = "/api/SeasonalAdjustMonth/SeasonalAdjustMonth?id=[0]";
        public const string CreateSeasonalAdjustMonth = "/api/SeasonalAdjustMonth/CreateSeasonalAdjustMonth";
        public const string UpdateSeasonalAdjustMonth = "/api/SeasonalAdjustMonth/UpdateSeasonalAdjustMonth";

        //Program Runtime data API
        public const string ProgramRuntimeList = "/api/ProgramRuntime/ProgramRuntimeList";
        public const string ProgramRuntime = "/api/ProgramRuntime/ProgramRuntime?id=[0]";
        public const string CreateProgramRuntime = "/api/ProgramRuntime/CreateProgramRuntime";
        public const string UpdateProgramRuntime = "/api/ProgramRuntime/UpdateProgramRuntime";



        #endregion master data api ends

        public const string AdminDashboardDetails = "/api/User/AdminDashboardDetails";
        public const string FilterMonthlyInspectionGraph = "/api/User/FilterMonthlyInspectionGraph?year=[0]&isCompleted=[1]";


    }
}

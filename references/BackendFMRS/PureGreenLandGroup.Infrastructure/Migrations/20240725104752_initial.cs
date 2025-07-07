using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ControllerProgrames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ControllerId = table.Column<int>(type: "int", nullable: true),
                    IsSunEnable = table.Column<bool>(type: "bit", nullable: false),
                    IsMonEnable = table.Column<bool>(type: "bit", nullable: false),
                    IsTueEnabled = table.Column<bool>(type: "bit", nullable: false),
                    IsWedEnabled = table.Column<bool>(type: "bit", nullable: false),
                    IsThuEnabled = table.Column<bool>(type: "bit", nullable: false),
                    IsFriEnabled = table.Column<bool>(type: "bit", nullable: false),
                    IsSatEnabled = table.Column<bool>(type: "bit", nullable: false),
                    ProgramTimer1 = table.Column<TimeOnly>(type: "time", nullable: false),
                    ProgramTimer2 = table.Column<TimeOnly>(type: "time", nullable: false),
                    ProgramTimer3 = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControllerProgrames", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Controllers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ControllerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyId = table.Column<int>(type: "int", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    WaterSourceId = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Controllers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ControllerZones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ControllerId = table.Column<int>(type: "int", nullable: true),
                    ZoneLocationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValveSizeId = table.Column<int>(type: "int", nullable: true),
                    FlowRate = table.Column<int>(type: "int", nullable: true),
                    SprinkleTypeId = table.Column<int>(type: "int", nullable: true),
                    PlantTypeId = table.Column<int>(type: "int", nullable: true),
                    SoilTypeId = table.Column<int>(type: "int", nullable: true),
                    SlopeId = table.Column<int>(type: "int", nullable: true),
                    MoreLessId = table.Column<int>(type: "int", nullable: true),
                    IsRainSensorEnable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControllerZones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Inspection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PriorEquipment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Compliant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RainSensor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaterPressure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WaterPressureUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ControllerId = table.Column<int>(type: "int", nullable: false),
                    InspectionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsInspectionDraft = table.Column<bool>(type: "bit", nullable: false),
                    IsInspectionCompleted = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspection", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MonthsOfYear",
                columns: table => new
                {
                    MonthId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MonthName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthsOfYear", x => x.MonthId);
                });

            migrationBuilder.CreateTable(
                name: "MstBrokenLateralDropdown",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstBrokenLateralDropdown", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstFlowRate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlowRateNames = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstFlowRate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstManufacturer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManufacturerName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstManufacturer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstModels", x => x.Id);
                });

            // migrationBuilder.CreateTable(
            //     name: "MstMoreOrLess",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         MoreOrLessPercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_MstMoreOrLess", x => x.Id);
            //     });

            migrationBuilder.CreateTable(
                name: "MstPlantType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlantType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstPlantType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstSeasonalAdjustDropdown",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstSeasonalAdjustDropdown", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstSlope",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Slope = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstSlope", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstSoilType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoilType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstSoilType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstSprinklerType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SprinklerTypeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstSprinklerType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrimaryPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobilePhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    ContactTagList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateOnly>(type: "date", nullable: true),
                    EmployeeNumber = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserRole = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstValveSize",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ValveSizenames = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstValveSize", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstWaterSource",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WaterSourceName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstWaterSource", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstZoneAreaDropDown",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstZoneAreaDropDown", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstZoneIssuesDropDown",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstZoneIssuesDropDown", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProgramRunTime",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramRunTime", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProgramStartTime",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramStartTime", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyID = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    PropertyStatusID = table.Column<int>(type: "int", nullable: true),
                    PropertyStatusName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchID = table.Column<int>(type: "int", nullable: true),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountOwnerContactID = table.Column<int>(type: "int", nullable: true),
                    AccountOwnerContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductionManagerContactID = table.Column<int>(type: "int", nullable: true),
                    ProductionManagerContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressID = table.Column<int>(type: "int", nullable: true),
                    CountyID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressStateProvinceCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyAddressZipCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocalityID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocalityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndustryID = table.Column<int>(type: "int", nullable: true),
                    IndustryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LeadSourceID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LeadSourceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaxJurisdictionID = table.Column<int>(type: "int", nullable: true),
                    TaxJurisdictionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyGroupID = table.Column<int>(type: "int", nullable: true),
                    ActiveOpportunityID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompetitorID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyGroupName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyNameAbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SequenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductionNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    EmailInvoice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Budget = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedByUserID = table.Column<int>(type: "int", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GEOPerimeter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GEOLocationLatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GEOLocationLongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentTermsID = table.Column<int>(type: "int", nullable: true),
                    PaymentTermsName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeparateInvoices = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedByUserID = table.Column<int>(type: "int", nullable: true),
                    ModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DragDropGeoLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GPSUpdated = table.Column<bool>(type: "bit", nullable: false),
                    GPSGeofenceID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SnowNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EarliestOpportunityWonDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CollectionNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IntegrationID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyTypeID = table.Column<int>(type: "int", nullable: true),
                    PropertyType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyTypeIntegrationCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertiesContact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyId = table.Column<int>(type: "int", nullable: false),
                    ContactID = table.Column<int>(type: "int", nullable: true),
                    ContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrimaryContact = table.Column<bool>(type: "bit", nullable: false),
                    BillingContact = table.Column<bool>(type: "bit", nullable: false),
                    EmailInvoiceContact = table.Column<bool>(type: "bit", nullable: false),
                    EmailNotificationsContact = table.Column<bool>(type: "bit", nullable: false),
                    CompanyID = table.Column<int>(type: "int", nullable: true),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SMSNotificationsContact = table.Column<bool>(type: "bit", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "int", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedByUserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertiesContact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SeasionalAdjust",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ControllerId = table.Column<int>(type: "int", nullable: false),
                    MonthId = table.Column<int>(type: "int", nullable: false),
                    ProgramA = table.Column<int>(type: "int", nullable: false),
                    ProgramB = table.Column<int>(type: "int", nullable: false),
                    ProgramC = table.Column<int>(type: "int", nullable: false),
                    ProgramD = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeasionalAdjust", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.RoleId);
                });

            migrationBuilder.InsertData(
                table: "MonthsOfYear",
                columns: new[] { "MonthId", "MonthName" },
                values: new object[,]
                {
                    { 1, "January" },
                    { 2, "February" },
                    { 3, "March" },
                    { 4, "April" },
                    { 5, "May" },
                    { 6, "June" },
                    { 7, "July" },
                    { 8, "August" },
                    { 9, "September" },
                    { 10, "October" },
                    { 11, "November" },
                    { 12, "December" }
                });

            migrationBuilder.InsertData(
                table: "MstBrokenLateralDropdown",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, "3/4\"" },
                    { 2, "1\"" },
                    { 3, "1 1/4\"" },
                    { 4, "1 1/2\"" },
                    { 5, "2\"" },
                    { 6, "2 1/2\"" }
                });

            migrationBuilder.InsertData(
                table: "MstManufacturer",
                columns: new[] { "Id", "ManufacturerName" },
                values: new object[,]
                {
                    { 1, "Hunter" },
                    { 2, "RainBird" }
                });

            migrationBuilder.InsertData(
                table: "MstModels",
                columns: new[] { "Id", "ModelName" },
                values: new object[,]
                {
                    { 1, "X-Core" },
                    { 2, "X2" },
                    { 3, "Pro-C" },
                    { 4, "ICC2" },
                    { 5, "HPC" },
                    { 6, "Pro-HC" },
                    { 7, "HCC" },
                    { 8, "I-Core" },
                    { 9, "ACC2" },
                    { 10, "NODE-BT" },
                    { 11, "NODE" },
                    { 12, "XC Hybrid" },
                    { 13, "ESP-2WIRE" },
                    { 14, "ESP-9V" },
                    { 15, "ESP-LXIVM" },
                    { 16, "ESP-LXD" },
                    { 17, "ESP-LXME2" },
                    { 18, "ESP-ME3" },
                    { 19, "ESP-TM2" }
                });

            migrationBuilder.InsertData(
                table: "MstPlantType",
                columns: new[] { "Id", "PlantType" },
                values: new object[,]
                {
                    { 1, "cool turf" },
                    { 2, "warm turf" },
                    { 3, "shrubs" },
                    { 4, "annuals" },
                    { 5, "trees" }
                });

            migrationBuilder.InsertData(
                table: "MstSeasonalAdjustDropdown",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, 0 },
                    { 2, 5 },
                    { 3, 10 },
                    { 4, 15 },
                    { 5, 20 },
                    { 6, 25 },
                    { 7, 30 },
                    { 8, 35 },
                    { 9, 40 },
                    { 10, 45 },
                    { 11, 50 },
                    { 12, 55 },
                    { 13, 60 },
                    { 14, 65 },
                    { 15, 70 },
                    { 16, 75 },
                    { 17, 80 },
                    { 18, 85 },
                    { 19, 90 },
                    { 20, 95 },
                    { 21, 100 },
                    { 22, 105 },
                    { 23, 110 },
                    { 24, 115 },
                    { 25, 120 },
                    { 26, 125 },
                    { 27, 130 },
                    { 28, 135 },
                    { 29, 140 },
                    { 30, 145 },
                    { 31, 150 },
                    { 32, 155 },
                    { 33, 160 },
                    { 34, 165 },
                    { 35, 170 },
                    { 36, 175 },
                    { 37, 180 },
                    { 38, 185 },
                    { 39, 190 },
                    { 40, 195 },
                    { 41, 200 },
                    { 42, 205 },
                    { 43, 210 },
                    { 44, 215 },
                    { 45, 220 },
                    { 46, 225 },
                    { 47, 230 },
                    { 48, 235 },
                    { 49, 240 },
                    { 50, 245 },
                    { 51, 250 },
                    { 52, 255 },
                    { 53, 260 },
                    { 54, 265 },
                    { 55, 270 },
                    { 56, 275 },
                    { 57, 280 },
                    { 58, 285 },
                    { 59, 290 },
                    { 60, 295 },
                    { 61, 300 }
                });

            migrationBuilder.InsertData(
                table: "MstSoilType",
                columns: new[] { "Id", "SoilType" },
                values: new object[,]
                {
                    { 1, "sand" },
                    { 2, "loam" },
                    { 3, "clay" }
                });

            migrationBuilder.InsertData(
                table: "MstSprinklerType",
                columns: new[] { "Id", "SprinklerTypeName" },
                values: new object[,]
                {
                    { 1, "standard(non-et)" },
                    { 2, "off" },
                    { 3, "spray(1.5\")" },
                    { 4, "rotor(0.5\")" },
                    { 5, "drip(1.1\")" }
                });

            migrationBuilder.InsertData(
                table: "MstValveSize",
                columns: new[] { "Id", "ValveSizenames" },
                values: new object[,]
                {
                    { 1, "not set" },
                    { 2, "0.8\"" },
                    { 3, "1.8\"" },
                    { 4, "1.3\"" },
                    { 5, "1.5\"" },
                    { 6, "2.0\"" },
                    { 7, "2.5\"" },
                    { 8, "3.0\"" },
                    { 9, "4.0\"" }
                });

            migrationBuilder.InsertData(
                table: "MstWaterSource",
                columns: new[] { "Id", "WaterSourceName" },
                values: new object[,]
                {
                    { 1, "Water Meter" },
                    { 2, "Pump" },
                    { 3, "Well" }
                });

            migrationBuilder.InsertData(
                table: "MstZoneAreaDropDown",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, "1%" },
                    { 2, "2%" },
                    { 3, "3%" },
                    { 4, "4%" },
                    { 5, "5%" },
                    { 6, "6%" },
                    { 7, "7%" },
                    { 8, "8%" },
                    { 9, "9%" },
                    { 10, "10%" },
                    { 11, "11%" },
                    { 12, "12%" },
                    { 13, "13%" },
                    { 14, "14%" },
                    { 15, "15%" },
                    { 16, "16%" },
                    { 17, "17%" },
                    { 18, "18%" },
                    { 19, "19%" },
                    { 20, "20%" },
                    { 21, "21%" },
                    { 22, "22%" },
                    { 23, "23%" },
                    { 24, "24%" },
                    { 25, "25%" },
                    { 26, "26%" },
                    { 27, "27%" },
                    { 28, "28%" },
                    { 29, "29%" },
                    { 30, "30%" },
                    { 31, "31%" },
                    { 32, "32%" },
                    { 33, "33%" },
                    { 34, "34%" },
                    { 35, "35%" },
                    { 36, "36%" },
                    { 37, "37%" },
                    { 38, "38%" },
                    { 39, "39%" },
                    { 40, "40%" },
                    { 41, "41%" },
                    { 42, "42%" },
                    { 43, "43%" },
                    { 44, "44%" },
                    { 45, "45%" },
                    { 46, "46%" },
                    { 47, "47%" },
                    { 48, "48%" },
                    { 49, "49%" },
                    { 50, "50%" },
                    { 51, "51%" },
                    { 52, "52%" },
                    { 53, "53%" },
                    { 54, "54%" },
                    { 55, "55%" },
                    { 56, "56%" },
                    { 57, "57%" },
                    { 58, "58%" },
                    { 59, "59%" },
                    { 60, "60%" },
                    { 61, "61%" },
                    { 62, "62%" },
                    { 63, "63%" },
                    { 64, "64%" },
                    { 65, "65%" },
                    { 66, "66%" },
                    { 67, "67%" },
                    { 68, "68%" },
                    { 69, "69%" },
                    { 70, "70%" },
                    { 71, "71%" },
                    { 72, "72%" },
                    { 73, "73%" },
                    { 74, "74%" },
                    { 75, "75%" },
                    { 76, "76%" },
                    { 77, "77%" },
                    { 78, "78%" },
                    { 79, "79%" },
                    { 80, "80%" },
                    { 81, "81%" },
                    { 82, "82%" },
                    { 83, "83%" },
                    { 84, "84%" },
                    { 85, "85%" },
                    { 86, "86%" },
                    { 87, "87%" },
                    { 88, "88%" },
                    { 89, "89%" },
                    { 90, "90%" },
                    { 91, "91%" },
                    { 92, "92%" },
                    { 93, "93%" },
                    { 94, "94%" },
                    { 95, "95%" },
                    { 96, "96%" },
                    { 97, "97%" },
                    { 98, "98%" },
                    { 99, "99%" },
                    { 100, "100%" }
                });

            migrationBuilder.InsertData(
                table: "MstZoneIssuesDropDown",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, "25" },
                    { 2, "24" },
                    { 3, "23" },
                    { 4, "22" },
                    { 5, "21" },
                    { 6, "20" },
                    { 7, "19" },
                    { 8, "18" },
                    { 9, "17" },
                    { 10, "16" },
                    { 11, "15" },
                    { 12, "14" },
                    { 13, "13" },
                    { 14, "12" },
                    { 15, "11" },
                    { 16, "10" },
                    { 17, "9" },
                    { 18, "8" },
                    { 19, "7" },
                    { 20, "6" },
                    { 21, "5" },
                    { 22, "4" },
                    { 23, "3" },
                    { 24, "2" },
                    { 25, "1" }
                });

            migrationBuilder.InsertData(
                table: "ProgramStartTime",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, "OFF" },
                    { 2, "12:00" },
                    { 3, "12:10" },
                    { 4, "12:20" },
                    { 5, "12:30" },
                    { 6, "12:40" },
                    { 7, "12:50" },
                    { 8, "13:00" },
                    { 9, "13:10" },
                    { 10, "13:20" },
                    { 11, "13:30" },
                    { 12, "13:40" },
                    { 13, "13:50" },
                    { 14, "14:00" },
                    { 15, "14:10" },
                    { 16, "14:20" },
                    { 17, "14:30" },
                    { 18, "14:40" },
                    { 19, "14:50" },
                    { 20, "15:00" },
                    { 21, "15:10" },
                    { 22, "15:20" },
                    { 23, "15:30" },
                    { 24, "15:40" },
                    { 25, "15:50" },
                    { 26, "16:00" },
                    { 27, "16:10" },
                    { 28, "16:20" },
                    { 29, "16:30" },
                    { 30, "16:40" },
                    { 31, "16:50" },
                    { 32, "17:00" },
                    { 33, "17:10" },
                    { 34, "17:20" },
                    { 35, "17:30" },
                    { 36, "17:40" },
                    { 37, "17:50" },
                    { 38, "18:00" },
                    { 39, "18:10" },
                    { 40, "18:20" },
                    { 41, "18:30" },
                    { 42, "18:40" },
                    { 43, "18:50" },
                    { 44, "19:00" },
                    { 45, "19:10" },
                    { 46, "19:20" },
                    { 47, "19:30" },
                    { 48, "19:40" },
                    { 49, "19:50" },
                    { 50, "20:00" },
                    { 51, "20:10" },
                    { 52, "20:20" },
                    { 53, "20:30" },
                    { 54, "20:40" },
                    { 55, "20:50" },
                    { 56, "21:00" },
                    { 57, "21:10" },
                    { 58, "21:20" },
                    { 59, "21:30" },
                    { 60, "21:40" },
                    { 61, "21:50" },
                    { 62, "22:00" },
                    { 63, "22:10" },
                    { 64, "22:20" },
                    { 65, "22:30" },
                    { 66, "22:40" },
                    { 67, "22:50" },
                    { 68, "23:00" },
                    { 69, "23:10" },
                    { 70, "23:20" },
                    { 71, "23:30" },
                    { 72, "23:40" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ControllerProgrames");

            migrationBuilder.DropTable(
                name: "Controllers");

            migrationBuilder.DropTable(
                name: "ControllerZones");

            migrationBuilder.DropTable(
                name: "Inspection");

            migrationBuilder.DropTable(
                name: "MonthsOfYear");

            migrationBuilder.DropTable(
                name: "MstBrokenLateralDropdown");

            migrationBuilder.DropTable(
                name: "MstFlowRate");

            migrationBuilder.DropTable(
                name: "MstManufacturer");

            migrationBuilder.DropTable(
                name: "MstModels");

            migrationBuilder.DropTable(
                name: "MstPlantType");

            migrationBuilder.DropTable(
                name: "MstSeasonalAdjustDropdown");

            migrationBuilder.DropTable(
                name: "MstSlope");

            migrationBuilder.DropTable(
                name: "MstSoilType");

            migrationBuilder.DropTable(
                name: "MstSprinklerType");

            migrationBuilder.DropTable(
                name: "MstUsers");

            migrationBuilder.DropTable(
                name: "MstValveSize");

            migrationBuilder.DropTable(
                name: "MstWaterSource");

            migrationBuilder.DropTable(
                name: "MstZoneAreaDropDown");

            migrationBuilder.DropTable(
                name: "MstZoneIssuesDropDown");

            migrationBuilder.DropTable(
                name: "ProgramRunTime");

            migrationBuilder.DropTable(
                name: "ProgramStartTime");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "PropertiesContact");

            migrationBuilder.DropTable(
                name: "SeasionalAdjust");

            migrationBuilder.DropTable(
                name: "UserRoles");
        }
    }
}

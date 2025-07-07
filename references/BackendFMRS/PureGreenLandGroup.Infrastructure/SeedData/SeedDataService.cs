using Microsoft.EntityFrameworkCore;
using PureGreenLandGroup.Domain.Entities;
using PureGreenLandGroup.Domain.Entities.MasterDataEntities;
using System.Globalization;

namespace PureGreenLandGroup.Infrastructure.SeedData
{
    public static class SeedDataService
    {
        public static void SeedMasterData(ModelBuilder builder)
        {

            //seed data for Roles
            builder.Entity<MstRoles>().HasData(
                new MstRoles { RoleId = 1, RoleName = "Admin" },
                new MstRoles { RoleId = 2, RoleName = "Technician" },
                new MstRoles { RoleId = 3, RoleName = "Manager" },
                new MstRoles { RoleId = 4, RoleName = "Standard User" }

            );

            //Seed data for all months of the year
            builder.Entity<MonthsOfYear>().HasData(
                Enumerable.Range(1, 12).Select(i => new MonthsOfYear
                {
                    MonthId = i,
                    MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i)
                }).ToArray()
            );

            //Seed data for Manufucturers
            builder.Entity<MstManufacturer>().HasData(
                new MstManufacturer { Id = 1, ManufacturerName = "Hunter",IsActive=true },
                new MstManufacturer { Id = 2, ManufacturerName = "RainBird", IsActive = true }
            );

            //Seed data for Models
            builder.Entity<MstModels>().HasData(
                new MstModels { Id = 1, ModelName = "X-Core", IsActive = true },
                new MstModels { Id = 2, ModelName = "X2" ,IsActive=true},
                new MstModels { Id = 3, ModelName = "Pro-C",IsActive=true },
                new MstModels { Id = 4, ModelName = "ICC2" ,IsActive=true},
                new MstModels { Id = 5, ModelName = "HPC" ,IsActive=true},
                new MstModels { Id = 6, ModelName = "Pro-HC" ,IsActive=true},
                new MstModels { Id = 7, ModelName = "HCC" ,IsActive=true},
                new MstModels { Id = 8, ModelName = "I-Core",IsActive=true },
                new MstModels { Id = 9, ModelName = "ACC2" ,IsActive=true},
                new MstModels { Id = 10, ModelName = "NODE-BT",IsActive=true },
                new MstModels { Id = 11, ModelName = "NODE",IsActive=true },
                new MstModels { Id = 12, ModelName = "XC Hybrid" ,IsActive=true},
                new MstModels { Id = 13, ModelName = "ESP-2WIRE" ,IsActive=true},
                new MstModels { Id = 14, ModelName = "ESP-9V",IsActive=true },
                new MstModels { Id = 15, ModelName = "ESP-LXIVM" ,IsActive=true},
                new MstModels { Id = 16, ModelName = "ESP-LXD" ,IsActive=true},
                new MstModels { Id = 17, ModelName = "ESP-LXME2",IsActive=true },
                new MstModels { Id = 18, ModelName = "ESP-ME3" ,IsActive=true},
                new MstModels { Id = 19, ModelName = "ESP-TM2" ,IsActive=true}
            );

            //Seed data for Models
            builder.Entity<MstWaterSource>().HasData(
                new MstWaterSource { Id = 1, WaterSourceName = "Water Meter" },
                new MstWaterSource { Id = 2, WaterSourceName = "Pump" },
                new MstWaterSource { Id = 3, WaterSourceName = "Well" }
            );

            //Seed data for seasonal adjust
            builder.Entity<MstSeasonalAdjustDropdown>().HasData(
                Enumerable.Range(1, 61).Select(i => new MstSeasonalAdjustDropdown
                {
                    Id = i,
                    Value = (i - 1) * 5
                }).ToArray()
            );

            //seed data for program run time
            builder.Entity<ProgramRunTime>().HasData(
                new ProgramRunTime { Id = 1, Value = "00:00" ,IsActive=true}, // New entry for 00:00
                new ProgramRunTime { Id = 2, Value = "00:01" ,IsActive=true},
                new ProgramRunTime { Id = 3, Value = "00:02" ,IsActive=true},
                new ProgramRunTime { Id = 4, Value = "00:03" ,IsActive=true},
                new ProgramRunTime { Id = 5, Value = "00:04" ,IsActive=true},
                new ProgramRunTime { Id = 6, Value = "00:05" ,IsActive=true},
                new ProgramRunTime { Id = 7, Value = "00:06" ,IsActive=true},
                new ProgramRunTime { Id = 8, Value = "00:07" ,IsActive=true},
                new ProgramRunTime { Id = 9, Value = "00:08" ,IsActive=true},
                new ProgramRunTime { Id = 10, Value = "00:09",IsActive=true },
                new ProgramRunTime { Id = 11, Value = "00:10",IsActive=true },
                new ProgramRunTime { Id = 12, Value = "00:11",IsActive=true },
                new ProgramRunTime { Id = 13, Value = "00:12",IsActive=true },
                new ProgramRunTime { Id = 14, Value = "00:13",IsActive=true },
                new ProgramRunTime { Id = 15, Value = "00:14",IsActive=true },
                new ProgramRunTime { Id = 16, Value = "00:15",IsActive=true },
                new ProgramRunTime { Id = 17, Value = "00:16",IsActive=true },
                new ProgramRunTime { Id = 18, Value = "00:17",IsActive=true },
                new ProgramRunTime { Id = 19, Value = "00:18",IsActive=true },
                new ProgramRunTime { Id = 20, Value = "00:19",IsActive=true },
                new ProgramRunTime { Id = 21, Value = "00:20",IsActive=true },
                new ProgramRunTime { Id = 22, Value = "00:21",IsActive=true },
                new ProgramRunTime { Id = 23, Value = "00:22",IsActive=true },
                new ProgramRunTime { Id = 24, Value = "00:23",IsActive=true },
                new ProgramRunTime { Id = 25, Value = "00:24",IsActive=true },
                new ProgramRunTime { Id = 26, Value = "00:25",IsActive=true },
                new ProgramRunTime { Id = 27, Value = "00:26",IsActive=true },
                new ProgramRunTime { Id = 28, Value = "00:27",IsActive=true },
                new ProgramRunTime { Id = 29, Value = "00:28",IsActive=true },
                new ProgramRunTime { Id = 30, Value = "00:29",IsActive=true },
                new ProgramRunTime { Id = 31, Value = "00:30",IsActive=true },
                new ProgramRunTime { Id = 32, Value = "00:31",IsActive=true },
                new ProgramRunTime { Id = 33, Value = "00:32",IsActive=true },
                new ProgramRunTime { Id = 34, Value = "00:33",IsActive=true },
                new ProgramRunTime { Id = 35, Value = "00:34",IsActive=true },
                new ProgramRunTime { Id = 36, Value = "00:35",IsActive=true },
                new ProgramRunTime { Id = 37, Value = "00:36",IsActive=true },
                new ProgramRunTime { Id = 38, Value = "00:37",IsActive=true },
                new ProgramRunTime { Id = 39, Value = "00:38",IsActive=true },
                new ProgramRunTime { Id = 40, Value = "00:39",IsActive=true },
                new ProgramRunTime { Id = 41, Value = "00:40",IsActive=true },
                new ProgramRunTime { Id = 42, Value = "00:41",IsActive=true },
                new ProgramRunTime { Id = 43, Value = "00:42",IsActive=true },
                new ProgramRunTime { Id = 44, Value = "00:43",IsActive=true },
                new ProgramRunTime { Id = 45, Value = "00:44",IsActive=true },
                new ProgramRunTime { Id = 46, Value = "00:45",IsActive=true },
                new ProgramRunTime { Id = 47, Value = "00:46",IsActive=true },
                new ProgramRunTime { Id = 48, Value = "00:47",IsActive=true },
                new ProgramRunTime { Id = 49, Value = "00:48",IsActive=true },
                new ProgramRunTime { Id = 50, Value = "00:49",IsActive=true },
                new ProgramRunTime { Id = 51, Value = "00:50",IsActive=true },
                new ProgramRunTime { Id = 52, Value = "00:51",IsActive=true },
                new ProgramRunTime { Id = 53, Value = "00:52",IsActive=true },
                new ProgramRunTime { Id = 54, Value = "00:53",IsActive=true },
                new ProgramRunTime { Id = 55, Value = "00:54",IsActive=true },
                new ProgramRunTime { Id = 56, Value = "00:55",IsActive=true },
                new ProgramRunTime { Id = 57, Value = "00:56",IsActive=true },
                new ProgramRunTime { Id = 58, Value = "00:57",IsActive=true },
                new ProgramRunTime { Id = 59, Value = "00:58",IsActive=true },
                new ProgramRunTime { Id = 60, Value = "00:59",IsActive=true },
                new ProgramRunTime { Id = 61, Value = "00:60", IsActive = true }
            );

            //seed data for program start time
            builder.Entity<ProgramStartTime>().HasData(
                Enumerable.Range(1, 72).Select(i =>
                {
                    if (i == 1) return new ProgramStartTime { Id = i, Value = "OFF" };
                    int hour = (i - 2) / 6;
                    int minute = (i - 2) % 6 * 10;
                    string value = $"{hour + 12:D2}:{minute:D2}";
                    return new ProgramStartTime { Id = i, Value = value };
                }).ToArray()
             );

            //seed data for MstPlantType
            builder.Entity<MstPlantType>().HasData(
                new MstPlantType { Id = 1, PlantType = "Turf", IsActive = true },
               new MstPlantType { Id = 2, PlantType = "Bed Space", IsActive = true },
               new MstPlantType { Id = 3, PlantType = "Trees", IsActive = true },
               new MstPlantType { Id = 4, PlantType = "Annuals", IsActive = true },
               new MstPlantType { Id = 5, PlantType = "Cool turf", IsActive = false },
               new MstPlantType { Id = 6, PlantType = "Warm turf", IsActive = false },
               new MstPlantType { Id = 7, PlantType = "Shrubs", IsActive = false }
           );
            //seed data for mstsoiltype
            builder.Entity<MstSoilType>().HasData(
               new MstSoilType { Id = 1, SoilType = "Sand", IsActive = true },
              new MstSoilType { Id = 2, SoilType = "Loam", IsActive = true },
              new MstSoilType { Id = 3, SoilType = "Clay", IsActive = true }
            );

            //seed data for mstsprinklertype
            builder.Entity<MstSprinklerType>().HasData(
              new MstSprinklerType { Id = 1, SprinklerTypeName = "Off", IsActive = true },
              new MstSprinklerType { Id = 2, SprinklerTypeName = "Spray", IsActive = true },
              new MstSprinklerType { Id = 3, SprinklerTypeName = "Rotor", IsActive = true },
              new MstSprinklerType { Id = 4, SprinklerTypeName = "Drip", IsActive = true },
              new MstSprinklerType { Id = 5, SprinklerTypeName = "MPR", IsActive = true },
              new MstSprinklerType { Id = 6, SprinklerTypeName = "Spray & MPR", IsActive = true },
              new MstSprinklerType { Id = 7, SprinklerTypeName = "Rotor & MPR", IsActive = true },
              new MstSprinklerType { Id = 8, SprinklerTypeName = "Standard(non-et)", IsActive = false }
            );

            //seed data for mstvalvesize
            builder.Entity<MstValveSize>().HasData(
              new MstValveSize { Id = 1, ValveSizenames = "1\"", IsActive = true },
              new MstValveSize { Id = 2, ValveSizenames = "1.5\"", IsActive = true },
              new MstValveSize { Id = 3, ValveSizenames = "2\"", IsActive = true },
              new MstValveSize { Id = 4, ValveSizenames = "not set", IsActive = false },
              new MstValveSize { Id = 5, ValveSizenames = "0.8\"", IsActive = false },
              new MstValveSize { Id = 6, ValveSizenames = "1.8\"", IsActive = false },
              new MstValveSize { Id = 7, ValveSizenames = "1.3\"", IsActive = false },
              new MstValveSize { Id = 8, ValveSizenames = "1.5\"", IsActive = false },
              new MstValveSize { Id = 9, ValveSizenames = "2.0\"", IsActive = false },
              new MstValveSize { Id = 10, ValveSizenames = "2.5\"", IsActive = false },
              new MstValveSize { Id = 11, ValveSizenames = "3.0\"", IsActive = false },
              new MstValveSize { Id = 12, ValveSizenames = "4.0\"", IsActive = false }
            );

            //seed data for Broken Lateral Dropdown
            builder.Entity<MstBrokenLateralDropdown>().HasData(
                new MstBrokenLateralDropdown { Id = 1, Value = "3/4\"", IsBrokenLateralValue = true },
                new MstBrokenLateralDropdown { Id = 2, Value = "1\"", IsBrokenLateralValue = true },
                new MstBrokenLateralDropdown { Id = 3, Value = "1 1/4\"", IsBrokenLateralValue = true },
                new MstBrokenLateralDropdown { Id = 4, Value = "1 1/2\"", IsBrokenLateralValue = true },
                new MstBrokenLateralDropdown { Id = 5, Value = "2\"", IsBrokenLateralValue = true },
                new MstBrokenLateralDropdown { Id = 6, Value = "2 1/2\"", IsBrokenLateralValue = true },

                new MstBrokenLateralDropdown { Id = 7, Value = "1 1/2\"", IsBrokenLateralValue = false },
                new MstBrokenLateralDropdown { Id = 8, Value = "2\"", IsBrokenLateralValue = false },
                new MstBrokenLateralDropdown { Id = 9, Value = "2 1/2\"", IsBrokenLateralValue = false },
                new MstBrokenLateralDropdown { Id = 10, Value = "3\"", IsBrokenLateralValue = false },
                new MstBrokenLateralDropdown { Id = 11, Value = "4\"", IsBrokenLateralValue = false }
            );

            //seed data for  Zone Issue  Dropdown
            builder.Entity<MstZoneIssuesDropDown>().HasData(
                Enumerable.Range(1, 25).Select(i => new MstZoneIssuesDropDown
                {
                    Id = i,
                    Value = (26 - i).ToString()
                }).ToArray()
            );

            builder.Entity<MstZoneAreaDropDown>().HasData(
                 Enumerable.Range(1, 100).Select(i => new MstZoneAreaDropDown
                 {
                     Id = i,
                     Value = $"{i}%"
                 }).ToArray()
            );

            builder.Entity<MstImageIssuesStatus>().HasData(
               new MstImageIssuesStatus { Id = 1, Value = "Valve Status" },
               new MstImageIssuesStatus { Id = 2, Value = "Clogged Nozzle" },
               new MstImageIssuesStatus { Id = 3, Value = "Broken Spray" },
               new MstImageIssuesStatus { Id = 4, Value = "Move Head" },
               new MstImageIssuesStatus { Id = 5, Value = "Raise/Lower Head" },
               new MstImageIssuesStatus { Id = 6, Value = "Broken Rotor" },
                              new MstImageIssuesStatus { Id = 7, Value = "Broken Lateral" },
               new MstImageIssuesStatus { Id = 8, Value = "Broken Main" }
           );

            builder.Entity<MstLinearRepair>().HasData(
               new MstLinearRepair { Id = 1, LinearRepairValue = "Less 5'" },
               new MstLinearRepair { Id = 2, LinearRepairValue = "5' - 10'" },
               new MstLinearRepair { Id = 3, LinearRepairValue = "10'+" }
                          );
        }
    }
}


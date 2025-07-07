using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DbMasterdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstValveSize",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstSprinklerType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstPlantType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            // TODO: Seed data for MstImageIssuesStatus should be added here if the table is created in the future.
            // migrationBuilder.InsertData(
            //     table: "MstImageIssuesStatus",
            //     columns: new[] { "Id", "Value" },
            //     values: new object[,]
            //     {
            //         { 1, "Valve Status" },
            //         { 2, "Clogged Nozzle" },
            //         { 3, "Blocked Head" },
            //         { 4, "Broken Head" },
            //         { 5, "Raise Head" },
            //         { 6, "Lower Head" },
            //         { 7, "Replace Head" },
            //         { 8, "Broken Drip/Micro Spray" },
            //         { 9, "Broken Lateral" },
            //         { 10, "Broken Main" }
            //     });

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 6,
                column: "IsBrokenLateralValue",
                value: true);

            migrationBuilder.InsertData(
                table: "MstBrokenLateralDropdown",
                columns: new[] { "Id", "IsBrokenLateralValue", "Value" },
                values: new object[,]
                {
                    { 7, false, "1 1/2\"" },
                    { 8, false, "2\"" },
                    { 9, false, "2 1/2\"" },
                    { 10, false, "2 1/2\"" },
                    { 11, false, "2 1/2\"" }
                });

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsActive", "PlantType" },
                values: new object[] { true, "Turf" });

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsActive", "PlantType" },
                values: new object[] { true, "Bed Space" });

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsActive", "PlantType" },
                values: new object[] { true, "Trees" });

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsActive", "PlantType" },
                values: new object[] { true, "Annuals" });

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IsActive", "PlantType" },
                values: new object[] { false, "Cool turf" });

            migrationBuilder.InsertData(
                table: "MstPlantType",
                columns: new[] { "Id", "IsActive", "PlantType" },
                values: new object[,]
                {
                    { 6, false, "Warm turf" },
                    { 7, false, "Shrubs" }
                });

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 1,
                column: "SoilType",
                value: "Sand");

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 2,
                column: "SoilType",
                value: "Loam");

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 3,
                column: "SoilType",
                value: "Clay");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsActive", "SprinklerTypeName" },
                values: new object[] { true, "Off" });

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsActive", "SprinklerTypeName" },
                values: new object[] { true, "Spray" });

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsActive", "SprinklerTypeName" },
                values: new object[] { true, "Rotor" });

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsActive", "SprinklerTypeName" },
                values: new object[] { true, "Drip" });

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IsActive", "SprinklerTypeName" },
                values: new object[] { true, "MPR" });

            migrationBuilder.InsertData(
                table: "MstSprinklerType",
                columns: new[] { "Id", "IsActive", "SprinklerTypeName" },
                values: new object[,]
                {
                    { 6, true, "Spray & MPR" },
                    { 7, true, "Rotor & MPR" },
                    { 8, false, "Standard(non-et)" }
                });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { true, "1\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { true, "1.5\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { true, "2\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "not set" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "0.8\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "1.8\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "1.3\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "1.5\"" });

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "IsActive", "ValveSizenames" },
                values: new object[] { false, "2.0\"" });

            migrationBuilder.InsertData(
                table: "MstValveSize",
                columns: new[] { "Id", "IsActive", "ValveSizenames" },
                values: new object[,]
                {
                    { 10, false, "2.5\"" },
                    { 11, false, "3.0\"" },
                    { 12, false, "4.0\"" }
                });

            migrationBuilder.InsertData(
                table: "ProgramRunTime",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { 1, "00:00" },
                    { 2, "00:01" },
                    { 3, "00:02" },
                    { 4, "00:03" },
                    { 5, "00:04" },
                    { 6, "00:05" },
                    { 7, "00:06" },
                    { 8, "00:07" },
                    { 9, "00:08" },
                    { 10, "00:09" },
                    { 11, "00:10" },
                    { 12, "00:11" },
                    { 13, "00:12" },
                    { 14, "00:13" },
                    { 15, "00:14" },
                    { 16, "00:15" },
                    { 17, "00:16" },
                    { 18, "00:17" },
                    { 19, "00:18" },
                    { 20, "00:19" },
                    { 21, "00:20" },
                    { 22, "00:21" },
                    { 23, "00:22" },
                    { 24, "00:23" },
                    { 25, "00:24" },
                    { 26, "00:25" },
                    { 27, "00:26" },
                    { 28, "00:27" },
                    { 29, "00:28" },
                    { 30, "00:29" },
                    { 31, "00:30" },
                    { 32, "00:31" },
                    { 33, "00:32" },
                    { 34, "00:33" },
                    { 35, "00:34" },
                    { 36, "00:35" },
                    { 37, "00:36" },
                    { 38, "00:37" },
                    { 39, "00:38" },
                    { 40, "00:39" },
                    { 41, "00:40" },
                    { 42, "00:41" },
                    { 43, "00:42" },
                    { 44, "00:43" },
                    { 45, "00:44" },
                    { 46, "00:45" },
                    { 47, "00:46" },
                    { 48, "00:47" },
                    { 49, "00:48" },
                    { 50, "00:49" },
                    { 51, "00:50" },
                    { 52, "00:51" },
                    { 53, "00:52" },
                    { 54, "00:53" },
                    { 55, "00:54" },
                    { 56, "00:55" },
                    { 57, "00:56" },
                    { 58, "00:57" },
                    { 59, "00:58" },
                    { 60, "00:59" },
                    { 61, "00:60" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "MstImageIssuesStatus");

            migrationBuilder.DeleteData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstValveSize");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstSprinklerType");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstPlantType");

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 6,
                column: "IsBrokenLateralValue",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 1,
                column: "PlantType",
                value: "cool turf");

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 2,
                column: "PlantType",
                value: "warm turf");

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 3,
                column: "PlantType",
                value: "shrubs");

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 4,
                column: "PlantType",
                value: "annuals");

            migrationBuilder.UpdateData(
                table: "MstPlantType",
                keyColumn: "Id",
                keyValue: 5,
                column: "PlantType",
                value: "trees");

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 1,
                column: "SoilType",
                value: "sand");

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 2,
                column: "SoilType",
                value: "loam");

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 3,
                column: "SoilType",
                value: "clay");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 1,
                column: "SprinklerTypeName",
                value: "standard(non-et)");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 2,
                column: "SprinklerTypeName",
                value: "off");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 3,
                column: "SprinklerTypeName",
                value: "spray(1.5\")");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 4,
                column: "SprinklerTypeName",
                value: "rotor(0.5\")");

            migrationBuilder.UpdateData(
                table: "MstSprinklerType",
                keyColumn: "Id",
                keyValue: 5,
                column: "SprinklerTypeName",
                value: "drip(1.1\")");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 1,
                column: "ValveSizenames",
                value: "not set");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 2,
                column: "ValveSizenames",
                value: "0.8\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 3,
                column: "ValveSizenames",
                value: "1.8\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 4,
                column: "ValveSizenames",
                value: "1.3\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 5,
                column: "ValveSizenames",
                value: "1.5\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 6,
                column: "ValveSizenames",
                value: "2.0\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 7,
                column: "ValveSizenames",
                value: "2.5\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 8,
                column: "ValveSizenames",
                value: "3.0\"");

            migrationBuilder.UpdateData(
                table: "MstValveSize",
                keyColumn: "Id",
                keyValue: 9,
                column: "ValveSizenames",
                value: "4.0\"");
        }
    }
}

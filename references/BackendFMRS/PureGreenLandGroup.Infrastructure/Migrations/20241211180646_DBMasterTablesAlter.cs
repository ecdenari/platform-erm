using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DBMasterTablesAlter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlockedHead",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "EstimatedCost",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "ScopeStatus",
                table: "ZoneIssuesInspection");

            migrationBuilder.RenameColumn(
                name: "RaiseHead",
                table: "ZoneIssuesInspection",
                newName: "RaiseLower");

            migrationBuilder.RenameColumn(
                name: "LowerHead",
                table: "ZoneIssuesInspection",
                newName: "Move");

            migrationBuilder.RenameColumn(
                name: "BrokenHead",
                table: "ZoneIssuesInspection",
                newName: "BrokenSpray");

            migrationBuilder.RenameColumn(
                name: "BrokenDrip",
                table: "ZoneIssuesInspection",
                newName: "BrokenRotor");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ProgramRunTime",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstSoilType",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstSeasonalAdjustDropdown",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstModels",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "MstManufacturer",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "MstManufacturer",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstManufacturer",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 6,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 7,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 8,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 9,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 10,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 11,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 12,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 13,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 14,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 15,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 16,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 17,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 18,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 19,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 6,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 7,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 8,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 9,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 10,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 11,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 12,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 13,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 14,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 15,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 16,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 17,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 18,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 19,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 20,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 21,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 22,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 23,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 24,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 25,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 26,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 27,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 28,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 29,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 30,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 31,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 32,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 33,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 34,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 35,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 36,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 37,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 38,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 39,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 40,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 41,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 42,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 43,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 44,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 45,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 46,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 47,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 48,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 49,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 50,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 51,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 52,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 53,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 54,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 55,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 56,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 57,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 58,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 59,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 60,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSeasonalAdjustDropdown",
                keyColumn: "Id",
                keyValue: 61,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "MstSoilType",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 6,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 7,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 8,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 9,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 10,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 11,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 12,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 13,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 14,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 15,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 16,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 17,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 18,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 19,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 20,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 21,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 22,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 23,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 24,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 25,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 26,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 27,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 28,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 29,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 30,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 31,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 32,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 33,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 34,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 35,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 36,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 37,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 38,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 39,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 40,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 41,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 42,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 43,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 44,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 45,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 46,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 47,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 48,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 49,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 50,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 51,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 52,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 53,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 54,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 55,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 56,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 57,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 58,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 59,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 60,
                column: "IsActive",
                value: false);

            migrationBuilder.UpdateData(
                table: "ProgramRunTime",
                keyColumn: "Id",
                keyValue: 61,
                column: "IsActive",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ProgramRunTime");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstSoilType");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstSeasonalAdjustDropdown");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstModels");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "MstManufacturer");

            migrationBuilder.RenameColumn(
                name: "RaiseLower",
                table: "ZoneIssuesInspection",
                newName: "RaiseHead");

            migrationBuilder.RenameColumn(
                name: "Move",
                table: "ZoneIssuesInspection",
                newName: "LowerHead");

            migrationBuilder.RenameColumn(
                name: "BrokenSpray",
                table: "ZoneIssuesInspection",
                newName: "BrokenHead");

            migrationBuilder.RenameColumn(
                name: "BrokenRotor",
                table: "ZoneIssuesInspection",
                newName: "BrokenDrip");

            migrationBuilder.AddColumn<int>(
                name: "BlockedHead",
                table: "ZoneIssuesInspection",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EstimatedCost",
                table: "ZoneIssuesInspection",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScopeStatus",
                table: "ZoneIssuesInspection",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

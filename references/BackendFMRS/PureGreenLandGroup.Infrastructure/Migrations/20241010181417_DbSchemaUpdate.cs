using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DbSchemaUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "MstUsers");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "MstUsers",
                newName: "IsActive");

            migrationBuilder.AddColumn<int>(
                name: "PropertiesId",
                table: "PropertiesContact",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsBrokenLateralValue",
                table: "MstBrokenLateralDropdown",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "InspectionModifiedDate",
                table: "Inspection",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "Faults",
                table: "Controllers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ProgramTimer3",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.AlterColumn<string>(
                name: "ProgramTimer2",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.AlterColumn<string>(
                name: "ProgramTimer1",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "time");

            migrationBuilder.AddColumn<string>(
                name: "Timer1Median",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Timer2Median",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Timer3Median",
                table: "ControllerProgrames",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DraftIrrigationSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    ZoneDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SprinkleTypeId = table.Column<int>(type: "int", nullable: true),
                    ValveSizeId = table.Column<int>(type: "int", nullable: true),
                    PlantTypeId = table.Column<int>(type: "int", nullable: true),
                    SoilTypeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DraftIrrigationSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspectedZoneBrokenLateral",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedZoneBrokenLateral", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspectedZoneBrokenMain",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedZoneBrokenMain", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspectedZoneImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageCaption = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageIssueStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedZoneImages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ZoneIssuesInspection",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InspectionId = table.Column<int>(type: "int", nullable: false),
                    ValveStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CloggedNozzle = table.Column<int>(type: "int", nullable: false),
                    BlockedHead = table.Column<int>(type: "int", nullable: false),
                    BrokenHead = table.Column<int>(type: "int", nullable: false),
                    RaiseHead = table.Column<int>(type: "int", nullable: false),
                    LowerHead = table.Column<int>(type: "int", nullable: false),
                    BrokenDrip = table.Column<int>(type: "int", nullable: false),
                    ScopeStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedCost = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<int>(type: "int", nullable: false),
                    GpmValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZoneIssuesInspection", x => x.Id);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_PropertiesContact_PropertiesId",
                table: "PropertiesContact",
                column: "PropertiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_PropertiesContact_Properties_PropertiesId",
                table: "PropertiesContact",
                column: "PropertiesId",
                principalTable: "Properties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertiesContact_Properties_PropertiesId",
                table: "PropertiesContact");

            migrationBuilder.DropTable(
                name: "DraftIrrigationSettings");

            migrationBuilder.DropTable(
                name: "InspectedZoneBrokenLateral");

            migrationBuilder.DropTable(
                name: "InspectedZoneBrokenMain");

            migrationBuilder.DropTable(
                name: "InspectedZoneImages");

            migrationBuilder.DropTable(
                name: "ZoneIssuesInspection");

            migrationBuilder.DropIndex(
                name: "IX_PropertiesContact_PropertiesId",
                table: "PropertiesContact");

            migrationBuilder.DropColumn(
                name: "PropertiesId",
                table: "PropertiesContact");

            migrationBuilder.DropColumn(
                name: "IsBrokenLateralValue",
                table: "MstBrokenLateralDropdown");

            migrationBuilder.DropColumn(
                name: "InspectionModifiedDate",
                table: "Inspection");

            migrationBuilder.DropColumn(
                name: "Faults",
                table: "Controllers");

            migrationBuilder.DropColumn(
                name: "Timer1Median",
                table: "ControllerProgrames");

            migrationBuilder.DropColumn(
                name: "Timer2Median",
                table: "ControllerProgrames");

            migrationBuilder.DropColumn(
                name: "Timer3Median",
                table: "ControllerProgrames");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "MstUsers",
                newName: "Active");

            migrationBuilder.AddColumn<string>(
                name: "UserRole",
                table: "MstUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "ProgramTimer3",
                table: "ControllerProgrames",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "ProgramTimer2",
                table: "ControllerProgrames",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "ProgramTimer1",
                table: "ControllerProgrames",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
        }
    }
}

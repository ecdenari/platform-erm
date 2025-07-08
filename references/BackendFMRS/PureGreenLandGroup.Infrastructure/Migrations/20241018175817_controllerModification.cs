using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class controllerModification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsRainSensorEnable",
                table: "ControllerZones",
                newName: "IsDeleted");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Controllers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsRainSensor",
                table: "Controllers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRainSesnorFunctioning",
                table: "Controllers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Controllers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "TotalInspectionIssues",
                table: "Controllers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Controllers");

            migrationBuilder.DropColumn(
                name: "IsRainSensor",
                table: "Controllers");

            migrationBuilder.DropColumn(
                name: "IsRainSesnorFunctioning",
                table: "Controllers");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Controllers");

            migrationBuilder.DropColumn(
                name: "TotalInspectionIssues",
                table: "Controllers");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "ControllerZones",
                newName: "IsRainSensorEnable");
        }
    }
}

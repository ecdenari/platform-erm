using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ZoneDBAlteration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoreLessId",
                table: "ControllerZones");

            migrationBuilder.RenameColumn(
                name: "SlopeId",
                table: "ControllerZones",
                newName: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_ControllerZones_ManufacturerId",
                table: "ControllerZones",
                column: "ManufacturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ControllerZones_MstManufacturer_ManufacturerId",
                table: "ControllerZones",
                column: "ManufacturerId",
                principalTable: "MstManufacturer",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ControllerZones_MstManufacturer_ManufacturerId",
                table: "ControllerZones");

            migrationBuilder.DropIndex(
                name: "IX_ControllerZones_ManufacturerId",
                table: "ControllerZones");

            migrationBuilder.RenameColumn(
                name: "ManufacturerId",
                table: "ControllerZones",
                newName: "SlopeId");

            migrationBuilder.AddColumn<int>(
                name: "MoreLessId",
                table: "ControllerZones",
                type: "int",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InspectionFKModification11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ZoneIssuesInspection_InspectionId",
                table: "ZoneIssuesInspection",
                column: "InspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_SeasionalAdjust_ControllerId",
                table: "SeasionalAdjust",
                column: "ControllerId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedZoneImages_ZoneIssuesInspectionId",
                table: "InspectedZoneImages",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedZoneBrokenMain_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenMain",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedZoneBrokenLateral_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenLateral",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftIrrigationSettings_ZoneIssuesInspectionId",
                table: "DraftIrrigationSettings",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_ControllerZones_ControllerId",
                table: "ControllerZones",
                column: "ControllerId");

            migrationBuilder.CreateIndex(
                name: "IX_ControllerProgrames_ControllerId",
                table: "ControllerProgrames",
                column: "ControllerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ControllerProgrames_Controllers_ControllerId",
                table: "ControllerProgrames",
                column: "ControllerId",
                principalTable: "Controllers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ControllerZones_Controllers_ControllerId",
                table: "ControllerZones",
                column: "ControllerId",
                principalTable: "Controllers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DraftIrrigationSettings_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "DraftIrrigationSettings",
                column: "ZoneIssuesInspectionId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspectedZoneBrokenLateral_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenLateral",
                column: "ZoneIssuesInspectionId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspectedZoneBrokenMain_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenMain",
                column: "ZoneIssuesInspectionId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspectedZoneImages_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneImages",
                column: "ZoneIssuesInspectionId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SeasionalAdjust_ZoneIssuesInspection_ControllerId",
                table: "SeasionalAdjust",
                column: "ControllerId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ZoneIssuesInspection_Inspection_InspectionId",
                table: "ZoneIssuesInspection",
                column: "InspectionId",
                principalTable: "Inspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ControllerProgrames_Controllers_ControllerId",
                table: "ControllerProgrames");

            migrationBuilder.DropForeignKey(
                name: "FK_ControllerZones_Controllers_ControllerId",
                table: "ControllerZones");

            migrationBuilder.DropForeignKey(
                name: "FK_DraftIrrigationSettings_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "DraftIrrigationSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_InspectedZoneBrokenLateral_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenLateral");

            migrationBuilder.DropForeignKey(
                name: "FK_InspectedZoneBrokenMain_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenMain");

            migrationBuilder.DropForeignKey(
                name: "FK_InspectedZoneImages_ZoneIssuesInspection_ZoneIssuesInspectionId",
                table: "InspectedZoneImages");

            migrationBuilder.DropForeignKey(
                name: "FK_SeasionalAdjust_ZoneIssuesInspection_ControllerId",
                table: "SeasionalAdjust");

            migrationBuilder.DropForeignKey(
                name: "FK_ZoneIssuesInspection_Inspection_InspectionId",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropIndex(
                name: "IX_ZoneIssuesInspection_InspectionId",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropIndex(
                name: "IX_SeasionalAdjust_ControllerId",
                table: "SeasionalAdjust");

            migrationBuilder.DropIndex(
                name: "IX_InspectedZoneImages_ZoneIssuesInspectionId",
                table: "InspectedZoneImages");

            migrationBuilder.DropIndex(
                name: "IX_InspectedZoneBrokenMain_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenMain");

            migrationBuilder.DropIndex(
                name: "IX_InspectedZoneBrokenLateral_ZoneIssuesInspectionId",
                table: "InspectedZoneBrokenLateral");

            migrationBuilder.DropIndex(
                name: "IX_DraftIrrigationSettings_ZoneIssuesInspectionId",
                table: "DraftIrrigationSettings");

            migrationBuilder.DropIndex(
                name: "IX_ControllerZones_ControllerId",
                table: "ControllerZones");

            migrationBuilder.DropIndex(
                name: "IX_ControllerProgrames_ControllerId",
                table: "ControllerProgrames");
        }
    }
}

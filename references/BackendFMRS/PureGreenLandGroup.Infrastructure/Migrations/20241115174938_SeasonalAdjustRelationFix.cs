using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeasonalAdjustRelationFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeasionalAdjust_ZoneIssuesInspection_ControllerId",
                table: "SeasionalAdjust");

            migrationBuilder.AddForeignKey(
                name: "FK_SeasionalAdjust_Controllers_ControllerId",
                table: "SeasionalAdjust",
                column: "ControllerId",
                principalTable: "Controllers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeasionalAdjust_Controllers_ControllerId",
                table: "SeasionalAdjust");

            migrationBuilder.AddForeignKey(
                name: "FK_SeasionalAdjust_ZoneIssuesInspection_ControllerId",
                table: "SeasionalAdjust",
                column: "ControllerId",
                principalTable: "ZoneIssuesInspection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

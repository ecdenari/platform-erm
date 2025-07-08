using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ZoneIssuesInspection_Tbl_Alteration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InspectedCloggedNozzle");

            migrationBuilder.AddColumn<int>(
                name: "MprCloggedNozzle",
                table: "ZoneIssuesInspection",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VanCloggedNozzle",
                table: "ZoneIssuesInspection",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MprCloggedNozzle",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "VanCloggedNozzle",
                table: "ZoneIssuesInspection");

            migrationBuilder.CreateTable(
                name: "InspectedCloggedNozzle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    MrpNozzle = table.Column<int>(type: "int", nullable: false),
                    VanNozzle = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedCloggedNozzle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspectedCloggedNozzle_ZoneIssuesInspection_ZoneIssuesInspectionId",
                        column: x => x.ZoneIssuesInspectionId,
                        principalTable: "ZoneIssuesInspection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InspectedCloggedNozzle_ZoneIssuesInspectionId",
                table: "InspectedCloggedNozzle",
                column: "ZoneIssuesInspectionId");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewInspectionTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "MstMoreOrLess");

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

            migrationBuilder.CreateTable(
                name: "InspectedMoveHead",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    MoveHeadId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedMoveHead", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspectedMoveHead_ZoneIssuesInspection_ZoneIssuesInspectionId",
                        column: x => x.ZoneIssuesInspectionId,
                        principalTable: "ZoneIssuesInspection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspectedValveFail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneIssuesInspectionId = table.Column<int>(type: "int", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    ValveSizeId = table.Column<int>(type: "int", nullable: false),
                    IsValveIssue = table.Column<bool>(type: "bit", nullable: false),
                    IsDecoderIssue = table.Column<bool>(type: "bit", nullable: false),
                    IsSolenoidIssue = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectedValveFail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspectedValveFail_MstManufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "MstManufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspectedValveFail_MstValveSize_ValveSizeId",
                        column: x => x.ValveSizeId,
                        principalTable: "MstValveSize",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspectedValveFail_ZoneIssuesInspection_ZoneIssuesInspectionId",
                        column: x => x.ZoneIssuesInspectionId,
                        principalTable: "ZoneIssuesInspection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InspectedCloggedNozzle_ZoneIssuesInspectionId",
                table: "InspectedCloggedNozzle",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedMoveHead_ZoneIssuesInspectionId",
                table: "InspectedMoveHead",
                column: "ZoneIssuesInspectionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedValveFail_ManufacturerId",
                table: "InspectedValveFail",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedValveFail_ValveSizeId",
                table: "InspectedValveFail",
                column: "ValveSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_InspectedValveFail_ZoneIssuesInspectionId",
                table: "InspectedValveFail",
                column: "ZoneIssuesInspectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InspectedCloggedNozzle");

            migrationBuilder.DropTable(
                name: "InspectedMoveHead");

            migrationBuilder.DropTable(
                name: "InspectedValveFail");

            migrationBuilder.CreateTable(
                name: "MstMoreOrLess",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MoreOrLessPercentage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstMoreOrLess", x => x.Id);
                });
        }
    }
}

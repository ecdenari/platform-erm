using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ZoneIssueInspectionDbAlteration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLinearRepair",
                table: "ZoneIssuesInspection",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSplice",
                table: "ZoneIssuesInspection",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "LinearRepairValueId",
                table: "ZoneIssuesInspection",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SpliceCount",
                table: "ZoneIssuesInspection",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MstLinearRepair",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LinearRepairValue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstLinearRepair", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "MstLinearRepair",
                columns: new[] { "Id", "LinearRepairValue" },
                values: new object[,]
                {
                    { 1, "Less 5'" },
                    { 2, "5' - 10'" },
                    { 3, "10'+" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MstLinearRepair");

            migrationBuilder.DropColumn(
                name: "IsLinearRepair",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "IsSplice",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "LinearRepairValueId",
                table: "ZoneIssuesInspection");

            migrationBuilder.DropColumn(
                name: "SpliceCount",
                table: "ZoneIssuesInspection");
        }
    }
}

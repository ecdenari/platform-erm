using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MappingTblAlteration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CatalogMappingLabel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ValveIssueValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DecoderIssueValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SolenoidIssueValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MprNozzleValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VanNozzleValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrokenSprayValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrokenRotorValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RaiseLowerValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrokenLateralValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrokenMainValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogMappingLabel", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CatalogMappingLabel");
        }
    }
}

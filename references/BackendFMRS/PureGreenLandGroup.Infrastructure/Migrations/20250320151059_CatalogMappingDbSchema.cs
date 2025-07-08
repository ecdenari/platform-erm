using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CatalogMappingDbSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.AlterColumn<string>(
            //     name: "Value",
            //     table: "MstImageIssuesStatus",
            //     type: "nvarchar(max)",
            //     nullable: true,
            //     oldClrType: typeof(string),
            //     oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "MstInspectionLabel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LabelName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstInspectionLabel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogMappingLabel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InspectionLabelId = table.Column<int>(type: "int", nullable: false),
                    MappingValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogMappingLabel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CatalogMappingLabel_MstInspectionLabel_InspectionLabelId",
                        column: x => x.InspectionLabelId,
                        principalTable: "MstInspectionLabel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MstInspectionLabel",
                columns: new[] { "Id", "LabelName" },
                values: new object[,]
                {
                    { 1, "Valve Issue" },
                    { 2, "Decoder Issue" },
                    { 3, "Solenoid Issue" },
                    { 4, "Mpr Nozzle" },
                    { 5, "VAN Nozzle" },
                    { 6, "Broken Spray" },
                    { 7, "Broken Rotor" },
                    { 8, "Raise/Lower" },
                    { 9, "Broken Lateral" },
                    { 10, "Broken Main" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogMappingLabel_InspectionLabelId",
                table: "CatalogMappingLabel",
                column: "InspectionLabelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CatalogMappingLabel");

            migrationBuilder.DropTable(
                name: "MstInspectionLabel");

            // migrationBuilder.AlterColumn<string>(
            //     name: "Value",
            //     table: "MstImageIssuesStatus",
            //     type: "nvarchar(max)",
            //     nullable: false,
            //     defaultValue: "",
            //     oldClrType: typeof(string),
            //     oldType: "nvarchar(max)",
            //     oldNullable: true);
        }
    }
}

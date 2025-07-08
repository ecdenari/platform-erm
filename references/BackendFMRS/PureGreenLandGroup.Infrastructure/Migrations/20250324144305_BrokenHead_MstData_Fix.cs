using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class BrokenHead_MstData_Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "MstImageIssuesStatus");

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 10,
                column: "Value",
                value: "3\"");

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 11,
                column: "Value",
                value: "4\"");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "MstImageIssuesStatus");

            migrationBuilder.CreateTable(
                name: "MstImageIssuesStatus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstImageIssuesStatus", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 10,
                column: "Value",
                value: "2 1/2\"");

            migrationBuilder.UpdateData(
                table: "MstBrokenLateralDropdown",
                keyColumn: "Id",
                keyValue: 11,
                column: "Value",
                value: "2 1/2\"");

            // TODO: Seed data for MstImageIssuesStatus should be added here if the table is created in the future.
            // migrationBuilder.InsertData(
            //     table: "MstImageIssuesStatus",
            //     columns: new[] { "Id", "Value" },
            //     values: new object[,]
            //     {
            //         { 1, "Valve Status" },
            //         { 2, "Clogged Nozzle" },
            //         { 3, "Blocked Head" },
            //         { 4, "Broken Head" },
            //         { 5, "Raise Head" },
            //         { 6, "Lower Head" },
            //         { 7, "Replace Head" },
            //         { 8, "Broken Drip/Micro Spray" },
            //         { 9, "Broken Lateral" },
            //         { 10, "Broken Main" }
            //     });
        }
    }
}

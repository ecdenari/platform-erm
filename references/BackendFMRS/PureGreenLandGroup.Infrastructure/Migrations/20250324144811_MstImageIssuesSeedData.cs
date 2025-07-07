using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MstImageIssuesSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.CreateTable(
            //     name: "MstImageIssuesStatus",
            //     columns: table => new
            //     {
            //         Id = table.Column<int>(type: "int", nullable: false)
            //             .Annotation("SqlServer:Identity", "1, 1"),
            //         Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_MstImageIssuesStatus", x => x.Id);
            //     });

            // TODO: Seed data for MstImageIssuesStatus should be added here if the table is created in the future.
            // migrationBuilder.InsertData(
            //     table: "MstImageIssuesStatus",
            //     columns: new[] { "Id", "Value" },
            //     values: new object[,]
            //     {
            //         { 1, "Valve Status" },
            //         { 2, "Clogged Nozzle" },
            //         { 3, "Broken Spray" },
            //         { 4, "Move Head" },
            //         { 5, "Raise/Lower Head" },
            //         { 6, "Broken Rotor" },
            //         { 7, "Broken Lateral" },
            //         { 8, "Broken Main" }
            //     });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "MstImageIssuesStatus");
        }
    }
}

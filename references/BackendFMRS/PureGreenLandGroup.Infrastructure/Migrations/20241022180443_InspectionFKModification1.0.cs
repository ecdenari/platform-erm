using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InspectionFKModification10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Controllers_PropertyId",
                table: "Controllers",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Controllers_Properties_PropertyId",
                table: "Controllers",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Controllers_Properties_PropertyId",
                table: "Controllers");

            migrationBuilder.DropIndex(
                name: "IX_Controllers_PropertyId",
                table: "Controllers");
        }
    }
}

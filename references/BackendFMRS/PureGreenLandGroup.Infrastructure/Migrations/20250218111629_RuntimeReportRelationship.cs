using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RuntimeReportRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RuntimeReportLog_ControllerId",
                table: "RuntimeReportLog",
                column: "ControllerId");

            migrationBuilder.CreateIndex(
                name: "IX_RuntimeReportLog_PropertyId",
                table: "RuntimeReportLog",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_RuntimeReportLog_Controllers_ControllerId",
                table: "RuntimeReportLog",
                column: "ControllerId",
                principalTable: "Controllers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RuntimeReportLog_Properties_PropertyId",
                table: "RuntimeReportLog",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RuntimeReportLog_Controllers_ControllerId",
                table: "RuntimeReportLog");

            migrationBuilder.DropForeignKey(
                name: "FK_RuntimeReportLog_Properties_PropertyId",
                table: "RuntimeReportLog");

            migrationBuilder.DropIndex(
                name: "IX_RuntimeReportLog_ControllerId",
                table: "RuntimeReportLog");

            migrationBuilder.DropIndex(
                name: "IX_RuntimeReportLog_PropertyId",
                table: "RuntimeReportLog");
        }
    }
}

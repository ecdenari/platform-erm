using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DbSchema24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_MstUsersDetails_RoleId",
                table: "MstUsersDetails",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_MstUsersDetails_MstRoles_RoleId",
                table: "MstUsersDetails",
                column: "RoleId",
                principalTable: "MstRoles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MstUsersDetails_MstRoles_RoleId",
                table: "MstUsersDetails");

            migrationBuilder.DropIndex(
                name: "IX_MstUsersDetails_RoleId",
                table: "MstUsersDetails");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DbSchema21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MstUsers",
                table: "MstUsers");

            migrationBuilder.RenameTable(
                name: "MstUsers",
                newName: "MstUsersDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MstUsersDetails",
                table: "MstUsersDetails",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MstUsersDetails",
                table: "MstUsersDetails");

            migrationBuilder.RenameTable(
                name: "MstUsersDetails",
                newName: "MstUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MstUsers",
                table: "MstUsers",
                column: "Id");
        }
    }
}

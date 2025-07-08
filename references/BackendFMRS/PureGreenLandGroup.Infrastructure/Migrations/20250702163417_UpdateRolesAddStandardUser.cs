using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRolesAddStandardUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MstRoles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "RoleName",
                value: "Manager");

            migrationBuilder.InsertData(
                table: "MstRoles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[] { 4, "Standard User" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MstRoles",
                keyColumn: "RoleId",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "MstRoles",
                keyColumn: "RoleId",
                keyValue: 3,
                column: "RoleName",
                value: "Irrigation Manager");
        }
    }
}

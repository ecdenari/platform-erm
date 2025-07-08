using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanySettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "MstUsersDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Website = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompanySettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    PrimaryLogoPath = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    LoginLogoPath = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DocumentLogoPath = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    PrimaryColor = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: true),
                    SupportEmail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NotificationEmail = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SessionTimeoutMinutes = table.Column<int>(type: "int", nullable: false),
                    PasswordMinLength = table.Column<int>(type: "int", nullable: false),
                    RequireTwoFactor = table.Column<bool>(type: "bit", nullable: false),
                    DocumentTemplateSettings = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedByUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanySettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanySettings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MstUsersDetails_CompanyId",
                table: "MstUsersDetails",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_Name",
                table: "Companies",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanySettings_CompanyId",
                table: "CompanySettings",
                column: "CompanyId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MstUsersDetails_Companies_CompanyId",
                table: "MstUsersDetails",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MstUsersDetails_Companies_CompanyId",
                table: "MstUsersDetails");

            migrationBuilder.DropTable(
                name: "CompanySettings");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_MstUsersDetails_CompanyId",
                table: "MstUsersDetails");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "MstUsersDetails");
        }
    }
}

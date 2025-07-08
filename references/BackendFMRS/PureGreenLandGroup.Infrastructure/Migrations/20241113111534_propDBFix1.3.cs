using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class propDBFix13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Properties_PropertyID",
                table: "Properties",
                column: "PropertyID");

            migrationBuilder.CreateTable(
                name: "PropertiesContact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactID = table.Column<int>(type: "int", nullable: true),
                    ContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrimaryContact = table.Column<bool>(type: "bit", nullable: false),
                    BillingContact = table.Column<bool>(type: "bit", nullable: false),
                    EmailInvoiceContact = table.Column<bool>(type: "bit", nullable: false),
                    EmailNotificationsContact = table.Column<bool>(type: "bit", nullable: false),
                    CompanyID = table.Column<int>(type: "int", nullable: true),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SMSNotificationsContact = table.Column<bool>(type: "bit", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "int", nullable: true),
                    CreatedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedByUserID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertiesContact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertiesContact_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "PropertyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PropertiesContact_PropertyId",
                table: "PropertiesContact",
                column: "PropertyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PropertiesContact");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Properties_PropertyID",
                table: "Properties");
        }
    }
}

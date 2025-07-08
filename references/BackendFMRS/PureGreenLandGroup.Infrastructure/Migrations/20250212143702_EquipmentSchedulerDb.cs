using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EquipmentSchedulerDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EquipmentAssetIds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaintainXAssetId = table.Column<int>(type: "int", nullable: false),
                    YourAspireEquipmentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentAssetIds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EquipmentSynLog",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecordCreated = table.Column<int>(type: "int", nullable: false),
                    RecordUpdated = table.Column<int>(type: "int", nullable: false),
                    CreatedAssetDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAssetDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExecutionStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExecutionDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentSynLog", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchedulerExceptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StackTrace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchedulerExceptions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipmentAssetIds");

            migrationBuilder.DropTable(
                name: "EquipmentSynLog");

            migrationBuilder.DropTable(
                name: "SchedulerExceptions");
        }
    }
}

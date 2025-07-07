using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PureGreenLandGroup.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ControllerDbChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ManufacturerId",
                table: "MstModels",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ControllerType",
                table: "Controllers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 1,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 2,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 3,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 4,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 5,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 6,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 7,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 8,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 9,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 10,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 11,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 12,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 13,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 14,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 15,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 16,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 17,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 18,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.UpdateData(
                table: "MstModels",
                keyColumn: "Id",
                keyValue: 19,
                column: "ManufacturerId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_MstModels_ManufacturerId",
                table: "MstModels",
                column: "ManufacturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_MstModels_MstManufacturer_ManufacturerId",
                table: "MstModels",
                column: "ManufacturerId",
                principalTable: "MstManufacturer",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MstModels_MstManufacturer_ManufacturerId",
                table: "MstModels");

            migrationBuilder.DropIndex(
                name: "IX_MstModels_ManufacturerId",
                table: "MstModels");

            migrationBuilder.DropColumn(
                name: "ManufacturerId",
                table: "MstModels");

            migrationBuilder.DropColumn(
                name: "ControllerType",
                table: "Controllers");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tertiary.API.Migrations
{
    public partial class AddedRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceDeviceRequest_DeviceRequests_RequestsId",
                table: "DeviceDeviceRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeviceDeviceRequest",
                table: "DeviceDeviceRequest");

            migrationBuilder.DropIndex(
                name: "IX_DeviceDeviceRequest_RequestsId",
                table: "DeviceDeviceRequest");

            migrationBuilder.RenameColumn(
                name: "RequestsId",
                table: "DeviceDeviceRequest",
                newName: "DeviceRequestsId");

            migrationBuilder.AddColumn<int>(
                name: "DeviceId",
                table: "DeviceRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeviceDeviceRequest",
                table: "DeviceDeviceRequest",
                columns: new[] { "DeviceRequestsId", "DevicesId" });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDeviceRequest_DevicesId",
                table: "DeviceDeviceRequest",
                column: "DevicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceDeviceRequest_DeviceRequests_DeviceRequestsId",
                table: "DeviceDeviceRequest",
                column: "DeviceRequestsId",
                principalTable: "DeviceRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceDeviceRequest_DeviceRequests_DeviceRequestsId",
                table: "DeviceDeviceRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeviceDeviceRequest",
                table: "DeviceDeviceRequest");

            migrationBuilder.DropIndex(
                name: "IX_DeviceDeviceRequest_DevicesId",
                table: "DeviceDeviceRequest");

            migrationBuilder.DropColumn(
                name: "DeviceId",
                table: "DeviceRequests");

            migrationBuilder.RenameColumn(
                name: "DeviceRequestsId",
                table: "DeviceDeviceRequest",
                newName: "RequestsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeviceDeviceRequest",
                table: "DeviceDeviceRequest",
                columns: new[] { "DevicesId", "RequestsId" });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDeviceRequest_RequestsId",
                table: "DeviceDeviceRequest",
                column: "RequestsId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceDeviceRequest_DeviceRequests_RequestsId",
                table: "DeviceDeviceRequest",
                column: "RequestsId",
                principalTable: "DeviceRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

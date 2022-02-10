using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tertiary.API.Migrations
{
    public partial class ChangedRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeviceDeviceRequest");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceRequests_DeviceId",
                table: "DeviceRequests",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeviceRequests_Devices_DeviceId",
                table: "DeviceRequests",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeviceRequests_Devices_DeviceId",
                table: "DeviceRequests");

            migrationBuilder.DropIndex(
                name: "IX_DeviceRequests_DeviceId",
                table: "DeviceRequests");

            migrationBuilder.CreateTable(
                name: "DeviceDeviceRequest",
                columns: table => new
                {
                    DeviceRequestsId = table.Column<int>(type: "int", nullable: false),
                    DevicesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceDeviceRequest", x => new { x.DeviceRequestsId, x.DevicesId });
                    table.ForeignKey(
                        name: "FK_DeviceDeviceRequest_DeviceRequests_DeviceRequestsId",
                        column: x => x.DeviceRequestsId,
                        principalTable: "DeviceRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeviceDeviceRequest_Devices_DevicesId",
                        column: x => x.DevicesId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceDeviceRequest_DevicesId",
                table: "DeviceDeviceRequest",
                column: "DevicesId");
        }
    }
}

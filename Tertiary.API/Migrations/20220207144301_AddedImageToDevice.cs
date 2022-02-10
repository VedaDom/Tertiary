using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tertiary.API.Migrations
{
    public partial class AddedImageToDevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Devices");
        }
    }
}

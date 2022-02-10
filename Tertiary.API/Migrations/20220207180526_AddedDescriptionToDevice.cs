using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tertiary.API.Migrations
{
    public partial class AddedDescriptionToDevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Devices");
        }
    }
}

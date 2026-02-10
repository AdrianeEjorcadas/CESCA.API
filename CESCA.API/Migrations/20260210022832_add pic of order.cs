using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CESCA.API.Migrations
{
    /// <inheritdoc />
    public partial class addpicoforder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProcessBy",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcessBy",
                table: "Orders");
        }
    }
}

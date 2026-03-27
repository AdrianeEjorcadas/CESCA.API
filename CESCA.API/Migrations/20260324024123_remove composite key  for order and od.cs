using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CESCA.API.Migrations
{
    /// <inheritdoc />
    public partial class removecompositekeyfororderandod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Orders_OrderId_InvoiceNumber",
                table: "OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_OrderId_InvoiceNumber",
                table: "OrderDetails");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceNumber",
                table: "OrderDetails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_InvoiceNumber",
                table: "Orders",
                column: "InvoiceNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Orders_OrderId",
                table: "OrderDetails",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Orders_OrderId",
                table: "OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_InvoiceNumber",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceNumber",
                table: "OrderDetails",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                columns: new[] { "OrderId", "InvoiceNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId_InvoiceNumber",
                table: "OrderDetails",
                columns: new[] { "OrderId", "InvoiceNumber" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Orders_OrderId_InvoiceNumber",
                table: "OrderDetails",
                columns: new[] { "OrderId", "InvoiceNumber" },
                principalTable: "Orders",
                principalColumns: new[] { "OrderId", "InvoiceNumber" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}

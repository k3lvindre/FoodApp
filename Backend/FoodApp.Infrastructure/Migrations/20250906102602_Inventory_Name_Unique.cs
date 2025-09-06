using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Inventory_Name_Unique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "numeric(5)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5,0)",
                oldPrecision: 5);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "OrderItem",
                type: "numeric(5)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5,0)",
                oldPrecision: 5);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Funds",
                type: "numeric(5)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5,0)",
                oldPrecision: 5);

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Name",
                table: "Inventory",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Inventory_Name",
                table: "Inventory");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Products",
                type: "numeric(5,0)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5)",
                oldPrecision: 5);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "OrderItem",
                type: "numeric(5,0)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5)",
                oldPrecision: 5);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Funds",
                type: "numeric(5,0)",
                precision: 5,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(5)",
                oldPrecision: 5);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudgetingAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BudgetingCategories",
                columns: table => new
                {
                    BudgetingCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    IsRecurring = table.Column<bool>(type: "bit", nullable: false),
                    RecurrenceDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetingCategories", x => x.BudgetingCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "BudgetingPeriods",
                columns: table => new
                {
                    BudgetingPeriodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetingPeriods", x => x.BudgetingPeriodId);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    StoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    DefaultCategoryBudgetingCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.StoreId);
                    table.ForeignKey(
                        name: "FK_Stores_BudgetingCategories_DefaultCategoryBudgetingCategoryId",
                        column: x => x.DefaultCategoryBudgetingCategoryId,
                        principalTable: "BudgetingCategories",
                        principalColumn: "BudgetingCategoryId");
                });

            migrationBuilder.CreateTable(
                name: "Purchases",
                columns: table => new
                {
                    PurchaseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    BudgetingCategoryId = table.Column<int>(type: "int", nullable: true),
                    BudgetingPeriodId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Purchases", x => x.PurchaseId);
                    table.ForeignKey(
                        name: "FK_Purchases_BudgetingCategories_BudgetingCategoryId",
                        column: x => x.BudgetingCategoryId,
                        principalTable: "BudgetingCategories",
                        principalColumn: "BudgetingCategoryId");
                    table.ForeignKey(
                        name: "FK_Purchases_BudgetingPeriods_BudgetingPeriodId",
                        column: x => x.BudgetingPeriodId,
                        principalTable: "BudgetingPeriods",
                        principalColumn: "BudgetingPeriodId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Purchases_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_BudgetingCategoryId",
                table: "Purchases",
                column: "BudgetingCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_BudgetingPeriodId",
                table: "Purchases",
                column: "BudgetingPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_StoreId",
                table: "Purchases",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Stores_DefaultCategoryBudgetingCategoryId",
                table: "Stores",
                column: "DefaultCategoryBudgetingCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Purchases");

            migrationBuilder.DropTable(
                name: "BudgetingPeriods");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropTable(
                name: "BudgetingCategories");
        }
    }
}

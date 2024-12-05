using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class revertShit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21d6e290-4e16-4bd3-9444-a34127f26026");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "473225d9-8904-4ea2-bb70-18efeb532e1b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8aa27514-86a9-4185-8993-8d8a3d045fab", null, "Admin", "ADMIN" },
                    { "943660dc-1b0a-4321-98a6-fc3ede81f5bf", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8aa27514-86a9-4185-8993-8d8a3d045fab");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "943660dc-1b0a-4321-98a6-fc3ede81f5bf");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21d6e290-4e16-4bd3-9444-a34127f26026", null, "User", "USER" },
                    { "473225d9-8904-4ea2-bb70-18efeb532e1b", null, "Admin", "ADMIN" }
                });
        }
    }
}

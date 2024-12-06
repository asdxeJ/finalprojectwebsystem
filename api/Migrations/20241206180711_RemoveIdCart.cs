using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIdCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e164e52-ad74-4d1b-8162-cf481cf76830");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca1aa416-bc0b-4a00-a033-bc1c6a1c8063");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Carts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5bdd812b-1d19-450b-89d6-9c08b4bea560", null, "Admin", "ADMIN" },
                    { "f6f639bf-4eb3-4041-9908-d40410f6d1bb", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5bdd812b-1d19-450b-89d6-9c08b4bea560");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f6f639bf-4eb3-4041-9908-d40410f6d1bb");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4e164e52-ad74-4d1b-8162-cf481cf76830", null, "User", "USER" },
                    { "ca1aa416-bc0b-4a00-a033-bc1c6a1c8063", null, "Admin", "ADMIN" }
                });
        }
    }
}

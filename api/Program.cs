using api.Data;
using api.Interfaces;
using api.Model;
using api.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// add the controllers you created
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// hook up the ApplicationDBContext i created
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    // plugin the database you want to use
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// AddScoped is a method used in ASP.NET Core's Dependency Injection (DI) system to register a service with a scoped lifetime. It determines how long an instance of the registered service will live.
// Scoped: Creates a new instance of the service for each HTTP request.
// Singleton: Creates a single instance of the service for the entire application's lifetime.
// Transient: Creates a new instance every time the service is requested.
// Why Scoped is Useful:
// Scoped lifetime is ideal for services that interact with the database context, like your MenuRepository. This ensures:
// A single instance of ApplicationDBContext is shared across the entire request.
// Avoids issues like multiple database connections or DbContext conflicts.
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
    RequestPath = "/Uploads"
});


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithOrigins("http://localhost:5173")
);
// .SetIsOriginAllowed(origin => true);

// to avoid https redirection
app.MapControllers();

app.Run();
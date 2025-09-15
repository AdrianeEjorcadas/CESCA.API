using CESCA.API.Authorization;
using CESCA.API.Data;
using CESCA.API.Middleware.ExceptionHandler;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add environment variables
builder.Configuration.AddEnvironmentVariables();

// Add Db Context
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Setup Auth0
var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
var audience = builder.Configuration["Auth0:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = audience;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

//Add auth permission
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("access:admin", policy => policy.Requirements.Add(new
        HasScopeRequirement("access:admin", domain)));
});

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

//Services
builder.Services.AddScoped<ISupplierService, SupplierService>();

//Exceptions
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();

// Add authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

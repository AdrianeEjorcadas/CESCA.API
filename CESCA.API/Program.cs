using AutoMapper;
using CESCA.API.Authorization;
using CESCA.API.Data;
using CESCA.API.Helpers.Email;
using CESCA.API.Helpers.Mapping;
using CESCA.API.Middleware.ExceptionHandler;
using CESCA.API.Middleware.Filters;
using CESCA.API.Models.Identity;
using CESCA.API.Overrides;
using CESCA.API.Repositories;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Security.Claims;
using System.Text;




var builder = WebApplication.CreateBuilder(args); 

Env.Load(); // loads .env from root
// Add Identity
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
//// Send Grid
//var sgApiKey = builder.Configuration["SendGrid:ApiKey"];


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


builder.Services.AddIdentityCore<ApplicationUser>()
    .AddRoles<Role>()
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddApiEndpoints();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);

//builder.Services.AddIdentity<ApplicationUser, Role>();

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = jwtIssuer,
//            ValidAudience = jwtAudience,
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(jwtSecret))
//        };
//    });

builder.Services.AddAuthorization();

// Add filter 
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidateModelState>();
});

//Exceptions
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

//Services
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddTransient<ISKUGeneratorService, SKUGeneratorService>();
builder.Services.AddScoped<IProductService, ProductService>();  

//Repo
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

//Mapper
//builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));
//builder.Services.AddAutoMapper(cfg => cfg.LicenseKey = "<License Key Here>", typeof(Program));
var licenseKey = Environment.GetEnvironmentVariable("AUTOMAPPER_LICENSE_KEY");

builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = licenseKey;
    cfg.AddProfile<MappingProfile>();
});

//email
builder.Services.AddTransient<IEmailSender, EmailSender>();

//Add Swagger
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.FullName);
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Cesca API",
        Version = "v1",
        Description = "API for Cesca POS transaction"
    });
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

// Setup Auth0
//var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";
//var audience = builder.Configuration["Auth0:Audience"];

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.Authority = domain;
//        options.Audience = audience;
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            NameClaimType = ClaimTypes.NameIdentifier
//        };
//    });

////Add auth permission
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("access:admin", policy => policy.Requirements.Add(new
//        HasScopeRequirement("access:admin", domain)));
//});

//builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();


var app = builder.Build();

//Exception Pipeline
app.UseExceptionHandler();

// Security piepline
//app.UseAuthentication();
//app.UseAuthorization();
app.UseHttpsRedirection();

//app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cesca API v1");
        c.RoutePrefix = string.Empty; // Serve at root URL
    });
}

//app.UseAuthorization();

app.MapIdentityApiFilterable<ApplicationUser>(new IdentityApiEndpointRouteBuilderOptions
{
    ExcludeRegisterPost = false,
    ExcludeLoginPost = false,
    ExcludeRefreshPost = false,
    ExcludeLogoutPost = false,
    ExcludeConfirmEmailGet = false,
    ExcludeResendConfirmationEmailPost = false,
    ExcludeForgotPasswordPost = false,
    ExcludeResetPasswordPost = false,
    ExcludeManageGroup = true,
    Exclude2faPost = true,
    ExcludegInfoGet = true,
    ExcludeInfoPost = true
}); //Identity Endpoint

app.MapControllers();

app.Run();
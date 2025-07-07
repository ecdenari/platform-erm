using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PlatformERM.Application.Common.Interfaces;
using PlatformERM.Application.Services;
using PlatformERM.Infrastructure.MultiTenancy;
using PlatformERM.Infrastructure.Persistence;
using PlatformERM.Infrastructure.Repositories;
using PlatformERM.API.Middleware;
using AutoMapper;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add Serilog
    builder.Host.UseSerilog((context, configuration) =>
        configuration.ReadFrom.Configuration(context.Configuration));

    // Add services to the container
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    // Configure PostgreSQL
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

    // AutoMapper - manual registration
    var mapperConfig = new MapperConfiguration(cfg =>
    {
        cfg.AddProfile<PlatformERM.Application.Mappings.PropertyMappingProfile>();
    });
    builder.Services.AddSingleton<IMapper>(mapperConfig.CreateMapper());

    // Multi-tenancy services
    builder.Services.AddScoped<ITenantService, TenantService>();
    builder.Services.AddScoped<IApiKeyService, ApiKeyService>();

    // Property services
    builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
    builder.Services.AddScoped<IPropertyService, PropertyService>();

    // Configure Swagger with multiple documents
    builder.Services.AddSwaggerGen(c =>
    {
        // Internal API documentation
        c.SwaggerDoc("internal", new OpenApiInfo
        {
            Title = "Platform-ERM Internal API",
            Version = "v1",
            Description = "Complete API for Platform-ERM frontend"
        });

        // Public API documentation
        c.SwaggerDoc("public", new OpenApiInfo
        {
            Title = "Platform-ERM Public API",
            Version = "v1",
            Description = "Public API for external integrations"
        });

        // Add security definitions
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
        {
            Description = "API Key for external access",
            Name = "X-API-Key",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        });

        // Configure which controllers belong to which document
        c.DocInclusionPredicate((docName, apiDesc) =>
        {
            if (docName == "internal")
                return apiDesc.RelativePath?.StartsWith("api/internal") == true;
            if (docName == "public")
                return apiDesc.RelativePath?.StartsWith("api/public") == true;
            return false;
        });
    });

    // Configure CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/internal/swagger.json", "Internal API");
            c.SwaggerEndpoint("/swagger/public/swagger.json", "Public API");
            c.RoutePrefix = "swagger";
        });
    }

    app.UseSerilogRequestLogging();

    app.UseHttpsRedirection();

    app.UseCors("AllowFrontend");

    // Custom middleware for tenant resolution
    app.UseMiddleware<TenantResolutionMiddleware>();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    // Development endpoint for tenant switching
    if (app.Environment.IsDevelopment())
    {
        app.MapGet("/dev/switch-tenant/{tenantId}", async (string tenantId, ITenantService tenantService) =>
        {
            await tenantService.SetTenantAsync(tenantId);
            return Results.Ok(new { message = $"Switched to tenant: {tenantId}" });
        });
    }

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
using PureGreenLandGroup.Domain.Interfaces;
using PureGreenLandGroup.Domain.UsersResources;
using PureGreenLandGroup.Infrastructure.DbConn;
using PureGreenLandGroup.Infrastructure.Generic;
using PureGreenLandGroup.Infrastructure.Repositories;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Services.MapConfig;
using PureGreenLandGroup.Services.Services;
using PureGreenLandGroup.Services;

namespace PureGreenLandGroup.API.Configurations
{
    public static class IocContainerConfiguration
    {
        /// <summary>
        /// Configures the service.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <param name="configuration">The configuration.</param>
        public static IServiceCollection RegisterIocServices(this IServiceCollection services)
        {
            // Add AutoMapper
            services.AddAutoMapper(typeof(PureGreenLandGroup.Services.MapConfig.AutoMapperProfile));

            // services.AddScoped<DbFactory>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IAspireService, AspireService>();
            services.AddTransient<IPropertiesService, PropertiesService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IControllerService, ControllerService>();
            services.AddTransient<IMasterDataHandlerService, MasterDataHandlerService>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IInspectionService, InspectionService>();
            services.AddTransient<IEquipmentsService, EquipmentsService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<ICompanySettingsService, CompanySettingsService>();
            services.AddTransient<ISiteReportService>(provider => 
                new SiteReportService(provider.GetRequiredService<AppDbContext>()));
            services.AddTransient<ISiteReportTemplateService, SiteReportTemplateService>();
            return services;
        }
    }
}

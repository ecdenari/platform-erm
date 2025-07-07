using Microsoft.Extensions.DependencyInjection;
using PureGreenLandGroup.Services.IServices;
using PureGreenLandGroup.Services.Services;

namespace PureGreenLandGroup.API
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Removed: services.AddScoped<IBranchesService, BranchesService>();
        }
    }
} 
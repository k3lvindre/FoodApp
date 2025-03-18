using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FoodApp.Infrastructure
{
    public static class ConfigureSefrvices
    {
        public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Register DbContext
            services.AddDbContext<IFoodAppDbContext, FoodAppDbContext>(options =>
            {
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                options.UseNpgsql(connectionString,
                    x => x.MigrationsAssembly(typeof(FoodAppDbContext).Assembly.FullName));
                // fix error regarding migrations cause by .net 9 when doing database update command it always detect it has pending changes that need to apply that cause error
                options.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning)); 
            });

            // Use Scrutor to scan and register services
            services.Scan(scan => scan
                .FromAssemblies(Assembly.GetExecutingAssembly())
                .AddClasses() // Automatically register all classes
                .AsMatchingInterface() // Register as implemented interfaces
                .WithTransientLifetime()); // Set the lifetime to scoped
        }
    }
}

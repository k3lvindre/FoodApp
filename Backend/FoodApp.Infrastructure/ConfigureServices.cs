using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FoodApp.Infrastructure
{
    public static class ConfigureSefrvices
    {
        public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Register DbContext
            services.AddDbContext<FoodAppDbContext>(options =>
            {
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                options.UseNpgsql(connectionString,
                    x => x.MigrationsAssembly(typeof(FoodAppDbContext).Assembly.FullName));
                // fix error regarding migrations cause by .net 9 when doing database update command it always detect it has pending changes that need to apply that cause error
                options.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning)); 
            });
        }
    }
}

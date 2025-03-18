using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FoodApp.Application
{
    public static class ConfigureSefrvices
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Register MediatR
            services.AddMediatR(x => x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            // Use Scrutor to scan and register services
            services.Scan(scan => scan
                .FromAssemblies(Assembly.GetExecutingAssembly())
                .AddClasses() // Automatically register all classes
                .AsMatchingInterface() // Register as implemented interfaces
                .WithTransientLifetime()); // Set the lifetime to scoped
        }
    }
}

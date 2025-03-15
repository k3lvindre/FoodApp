//Old Structure(Program.cs and Startup.cs in .NET 5 and earlier)
//public class Startup
//{
//    public Startup(IConfiguration configuration)
//    {
//        Configuration = configuration;
//    }

//    public IConfiguration Configuration { get; }

//    public void ConfigureServices(IServiceCollection services)
//    {
//        services.AddControllers();
//    }

//    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//    {
//        if (env.IsDevelopment())
//        {
//            app.UseDeveloperExceptionPage();
//        }

//        app.UseRouting();

//        app.UseEndpoints(endpoints =>
//        {
//            endpoints.MapControllers();
//        });
//    }
//}



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

//use for api controllers and routing because it has no view or not an mvc use UseMVC, UseEndpoints, or UseMvcWithDefaultRoute for mvc
app.MapControllers();
app.Run();

using FoodApp.Domain.Products;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Infrastructure.EntityFrameWork.Dbcontext
{
    public class FoodAppDbContext : DbContext, IFoodAppDbContext
    {
        public FoodAppDbContext(DbContextOptions<FoodAppDbContext> options)
            : base(options)
        { }

        // Define DbSets for your entities
        public DbSet<Product> Products { get; set; }
       
        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default, bool publishDomainEvent = false)
        {
            await base.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
   
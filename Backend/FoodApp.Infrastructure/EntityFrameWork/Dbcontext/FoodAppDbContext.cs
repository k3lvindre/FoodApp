using FoodApp.Domain.Funds;
using FoodApp.Domain.Orders;
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
        public DbSet<Order> Orders { get; set; }
        public DbSet<Fund> Funds { get; set; }
       
        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default, bool publishDomainEvent = false)
        {
            await base.SaveChangesAsync(cancellationToken);
            return true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ProductCategory as a value object
            modelBuilder.Entity<Product>(entity =>
            {
                entity.OwnsOne(p => p.Category, (category) =>
                {
                    category.Property(c => c.Id).HasColumnName("CategoryId");
                    category.Property(c => c.Name).HasColumnName("CategoryName");
                });

                entity.OwnsOne(p => p.Price, (price) =>
                {
                    price.Property(p => p.Value).HasColumnName("Price").HasPrecision(5);
                    price.Property(p => p.CurrencyCode).HasColumnName("Currency");
                });
            });

            // Configure ProductCategory as a value object
            modelBuilder.Entity<Order>(entity =>
            {
                entity.OwnsMany(o => o.OrderItems, (orderItem) =>
                {
                    orderItem.Property(o => o.Id).HasColumnName("OrderItemId");
                    orderItem.OwnsOne(o => o.Price, (price) =>
                    {
                        price.Property(p => p.Value).HasColumnName("Price").HasPrecision(5);
                        price.Property(p => p.CurrencyCode).HasColumnName("Currency");
                    });
                });
            });

            // Configure ProductCategory as a value object
            modelBuilder.Entity<Fund>(entity =>
            {
                entity.OwnsOne(f => f.ProductCategory, (category) =>
                {
                    category.Property(c => c.Id).HasColumnName("CategoryId");
                    category.Property(c => c.Name).HasColumnName("CategoryName");
                });

                entity.OwnsOne(f => f.Amount, (price) =>
                {
                    price.Property(p => p.Value).HasColumnName("Amount").HasPrecision(5);
                    price.Property(p => p.CurrencyCode).HasColumnName("Currency");
                });
            });
        }
    }
}
   
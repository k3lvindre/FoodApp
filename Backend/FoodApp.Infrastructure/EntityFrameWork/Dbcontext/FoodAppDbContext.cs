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

            modelBuilder.Entity<Product>(entity =>
            {
                // Configure ProductCategory as a value object
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

                entity.OwnsOne(o => o.OrderType, (type) =>
                {
                    type.Property(p => p.Id).HasColumnName("OrderTypeId").HasPrecision(5);
                    type.Property(p => p.Name).HasColumnName("OrderTypeName").HasPrecision(5);
                });

                entity.OwnsOne(o => o.OrderStatus, (status) =>
                {
                    status.Property(p => p.Id).HasColumnName("OrderStatusId").HasPrecision(5);
                    status.Property(p => p.Name).HasColumnName("OrderStatusName").HasPrecision(5);
                });
            });

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
   
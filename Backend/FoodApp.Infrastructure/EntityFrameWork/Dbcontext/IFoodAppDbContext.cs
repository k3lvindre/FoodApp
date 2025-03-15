using FoodApp.Domain.Products;
using FoodApp.Shared.Domain;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Infrastructure.EntityFrameWork.Dbcontext
{
    public interface IFoodAppDbContext : IUnitOfWork
    {
        DbSet<Product> Products { get; }
    }
}

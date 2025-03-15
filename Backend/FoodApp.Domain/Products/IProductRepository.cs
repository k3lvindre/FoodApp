namespace FoodApp.Domain.Products
{
    public interface IProductRepository
    {
        Task<int> AddProductAsync(Product product);
    }
}

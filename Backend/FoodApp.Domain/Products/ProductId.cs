namespace FoodApp.Domain.Products
{
    public readonly struct ProductId(int id)
    {
        private readonly int id = id;
    }
}

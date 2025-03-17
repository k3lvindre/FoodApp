using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Products
{
    public class Product : IAggregateRoot
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public ProductCategory Category { get; private set; }
        public Amount Price { get; private set; }
        public int Stock { get; private set; }

        // Use for EF core
        public Product()
        { }

        public Product(string name, ProductCategory category, Amount price, int stock)
        {
            Name = name;
            Category = category;
            Price = price;
            Stock = stock;

            // Invariants
            if (string.IsNullOrWhiteSpace(Name))
                throw new ArgumentException("Product name cannot be empty.");

            //DomainEvents.Add(new ProductCreatedEvent(Id, Name, Price.Value));
        }

        public void UpdatePrice(decimal newPrice)
        {
            Price = new Amount(newPrice, "PHP");
            //DomainEvents.Add(new ProductPriceChangedEvent(Id, newPrice));
        }

        public void ReduceStock(int quantity)
        {
            if (quantity > Stock)
                throw new InvalidOperationException("Not enough stock available.");

            Stock -= quantity;
        }
    }
}

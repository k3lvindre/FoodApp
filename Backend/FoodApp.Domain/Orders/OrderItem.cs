using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders
{
    public class OrderItem : IValueObject   
    {
        public int Id { get; private set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public Amount Price { get; set; }

        public OrderItem()
        { }

        internal OrderItem(int productId, int quantity, Amount price)
        {
            ProductId = productId;
            Quantity = quantity;
            Price = price;
        }

        public decimal GetTotalPrice()
        {
            return Quantity * Price.Value;
        }
    }
}

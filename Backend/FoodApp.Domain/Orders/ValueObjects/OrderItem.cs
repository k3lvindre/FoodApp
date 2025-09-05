using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders.ValueObjects
{
    public class OrderItem : IValueObject   
    {
        public long Id { get; private set; }
        public int ProductId { get; set; } = 0;
        public int Quantity { get; set; } = 1;
        public Amount Price { get; set; } = default!;

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

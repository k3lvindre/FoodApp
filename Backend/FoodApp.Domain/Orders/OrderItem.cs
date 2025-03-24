using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders
{
    public class OrderItem : IValueObject   
    {
        public int Id { get; private set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public OrderItem()
        { }

        internal OrderItem(int productId, int quantity, decimal price)
        {
            ProductId = productId;
            Quantity = quantity;
            Price = price;
        }

        public decimal GetTotalPrice()
        {
            return Quantity * Price;
        }
    }
}

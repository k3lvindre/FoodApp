using FoodApp.Domain.Orders.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders
{
    public class Order : IAggregateRoot
    {
        public long Id { get; private set; }
        public string? CustomerName { get; private set; } 
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public OrderStatus OrderStatus { get; private set; } = OrderStatus.Preparing;
        public OrderType OrderType { get; private set; } = OrderType.DineIn;
        public bool IsPaid { get; private set; } = true;

        public List<OrderItem> OrderItems { get; set; } = [];

        // use for EF core
        public Order()
        { }

        public Order(string customerName, List<OrderItem> orderItems, OrderStatus orderStatus, OrderType orderType, bool isPaid = true)
        {
            if (OrderItems == null || OrderItems.Count == 0)
                throw new ArgumentException("Order must have at least one item.");

            CustomerName = customerName;
            OrderItems = orderItems;
            IsPaid = isPaid;
            DateCreated = DateTime.UtcNow;
            OrderStatus = orderStatus;
            OrderType = orderType;
        }

        public void SetOrderStatus(OrderStatus orderStatus)
            => OrderStatus = orderStatus; // add validation if needed

        public void SetOrderType(OrderType orderType)
            => OrderType = orderType; // add validation if needed

        public void SetIsPaid(bool value)
            => IsPaid = value; // add validation if needed

        public decimal GetTotalPrice()
            => OrderItems.Sum(x => x.GetTotalPrice());
    }
}

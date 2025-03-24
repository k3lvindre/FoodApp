using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders
{
    public class Order : IAggregateRoot
    {
        public long Id { get; set; }
        public string CustomerName { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsPaid { get; set; }

        public List<OrderItem> OrderItems { get; set; }

        // use for EF core
        public Order()
        { }

        public Order(string customerName, List<OrderItem> orderItems, bool isPaid = true)
        {
            if (string.IsNullOrWhiteSpace(customerName))
                throw new ArgumentException("Customer name cannot be empty.");

            if (OrderItems == null || OrderItems.Count == 0)
                throw new ArgumentException("Order must have at least one item.");

            CustomerName = customerName;
            OrderItems = orderItems;
            IsPaid = isPaid;
            DateCreated = DateTime.UtcNow;
        }

        public decimal GetTotalPrice()
            => OrderItems.Sum(x => x.GetTotalPrice());
    }
}

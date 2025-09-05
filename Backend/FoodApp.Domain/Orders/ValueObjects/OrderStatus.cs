using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders.ValueObjects
{
    public class OrderStatus : IValueObject
    {
        public static readonly OrderStatus Preparing = new(1, "Preparing");
        public static readonly OrderStatus Served = new(2, "Served");

        public int Id { get; }
        public string Name { get; } = string.Empty;

        private OrderStatus(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static OrderStatus FromId(int id)
            => id switch
            {
                1 => Preparing,
                2 => Served,
                _ => throw new KeyNotFoundException($"OrderStatus with id {id} not found.")
            };

        public static IEnumerable<OrderStatus> GetAll()
        {
            yield return Preparing;
            yield return Served;
        }
    }
}

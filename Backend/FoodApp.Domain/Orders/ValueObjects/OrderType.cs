using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Orders.ValueObjects
{
    public class OrderType : IValueObject
    {
        public static readonly OrderType DineIn = new(1, "DineIn");
        public static readonly OrderType TakeOut = new(2, "TakeOut");

        public int Id { get; }
        public string Name { get; } = string.Empty;

        private OrderType(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static OrderType FromId(int id)
            => id switch
            {
                1 => DineIn,
                2 => TakeOut,
                _ => throw new KeyNotFoundException($"OrderType with id {id} not found.")
            };

        public static IEnumerable<OrderType> GetAll()
        {
            yield return DineIn;
            yield return TakeOut;
        }
    }
}

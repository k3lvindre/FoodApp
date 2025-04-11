using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Core.ValueObjects
{
    public class ProductCategory : IValueObject
    {
        public static readonly ProductCategory Chizlog = new (1, "Chizlog");
        public static readonly ProductCategory GCash = new (2, "GCash");
        public static readonly ProductCategory Print = new(3, "Print");

        public int Id { get; }
        public string Name { get; }

        private ProductCategory(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static ProductCategory FromId(int id)
            => id switch
            {
                1 => Chizlog,
                2 => GCash,
                3 => Print,
                _ => throw new KeyNotFoundException($"Product category with id {id} not found.")
            };

        public static IEnumerable<ProductCategory> GetAll()
        {
            yield return Chizlog;
            yield return GCash;
            yield return Print;
        }
    }
}

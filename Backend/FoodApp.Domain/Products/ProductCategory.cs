using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Products
{
    public struct ProductCategory : IValueObject
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
        {
            return GetAll().FirstOrDefault(x => x.Id == id);
        }

        private static IEnumerable<ProductCategory> GetAll()
        {
            yield return Chizlog;
            yield return GCash;
            yield return Print;
        }
    }
}

using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Funds
{
    public class Fund : IAggregateRoot
    {
        public long Id { get; private set; }

        public string Description { get; private set; } = string.Empty;

        public Amount Amount { get; private set; } = default!;

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        public ProductCategory ProductCategory { get; private set; } = default!;

        private Fund()
        { }

        public Fund(string description,
            Amount amount,
            ProductCategory productCategory)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new ArgumentException("Description cannot be null or empty.");

            if (amount.Value <= 0)
                throw new ArgumentException("Amount should be greater than 0.");

            Description = description;
            Amount = amount;
            ProductCategory = productCategory;
        }
    }
}

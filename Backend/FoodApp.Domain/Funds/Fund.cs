using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Funds
{
    public class Fund : IAggregateRoot
    {
        public long Id { get; set; }

        public string Description { get; set; }

        public Amount Amount { get; set; }

        // we can assign default date unlike in order entity,
        // this only for experimentation if it will provide default value in database
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        public ProductCategory ProductCategory { get; set; }

        internal Fund()
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

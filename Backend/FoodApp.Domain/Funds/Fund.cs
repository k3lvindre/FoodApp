using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Funds
{
    public class Fund : IAggregateRoot
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Amount Amount { get; set; }
        public DateTime DateCreated { get; set; }
        public ProductCategory ProductCategory { get; set; }

        internal Fund()
        { }

        public Fund(string description, 
            Amount amount,
            ProductCategory productCategory)
        {
            if(amount.Value <= 0)
                throw new ArgumentException("Amount should be greater than 0.");

            Description = description;
            Amount = amount;
            ProductCategory = productCategory;
        }
    }
}

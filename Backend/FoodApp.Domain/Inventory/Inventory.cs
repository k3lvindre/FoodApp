using FoodApp.Domain.Inventory.ValueObjects;
using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Inventory
{
    public class Inventory : IAggregateRoot
    {
        public int Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public int Quantity { get; private set; }
        public Unit Unit { get; private set; } = default!;

        // Use for EF core
        private Inventory()
        { }

        public Inventory(string name, int quantity, Unit unit)
        {
            // Invariants
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Inventory item name cannot be empty.");

            if (quantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            Name = name;
            Quantity = quantity;
            Unit = unit;
        }

        public void IncreaseQty(int newQuantity)
        {
            if (newQuantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            Quantity += newQuantity;
        }

        public void DecreaseQty(int quantity)
        {
            if (quantity < 0)
                throw new ArgumentException("Quantity cannot be negative.");

            Quantity -= quantity;
        }
    }
}

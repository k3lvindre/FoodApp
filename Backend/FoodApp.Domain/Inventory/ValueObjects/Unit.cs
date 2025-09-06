using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Inventory.ValueObjects
{
    public class Unit : IValueObject
    {
        public static readonly Unit Kilogram = new(1, "Kilogram");
        public static readonly Unit Grams = new(2, "Grams");
        public static readonly Unit Piece = new(3, "Piece");
        public static readonly Unit Box = new(4, "Box");
        public static readonly Unit Liter = new(5, "Liter");

        public int Id { get; }
        public string Name { get; }

        private Unit(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static Unit FromId(int id)
            => id switch
            {
                1 => Kilogram,
                2 => Grams,
                3 => Piece,
                4 => Box,
                5 => Liter,
                _ => throw new KeyNotFoundException($"Unit with id {id} not found.")
            };

        public static IEnumerable<Unit> GetAll()
        {
            yield return Kilogram;
            yield return Grams;
            yield return Piece;
            yield return Box;
            yield return Liter;
        }
    }
}

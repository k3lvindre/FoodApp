using FoodApp.Shared.Domain;

namespace FoodApp.Domain.Core.ValueObjects
{
    public class Amount : IValueObject
    {
        public decimal Value { get; private set; }
    
        public string CurrencyCode { get; private set; }
    
        public Amount(string currencyCode)
        {
            Value = 0;
            CurrencyCode = currencyCode;
        }
    
        public Amount(decimal value, string currencyCode)
        {
            Value = value;
            CurrencyCode = currencyCode;
        }
    
    
        public Amount(double value, string currencyCode)
        {
            Value = Convert.ToDecimal(value);
            CurrencyCode = currencyCode;
        }
    
        public Amount(string value, string currencyCode)
        {
            if (!decimal.TryParse(value, out decimal dvalue))
                throw new ArgumentException($"cannot convert `{value}` to decimal");
    
            Value = dvalue;
            CurrencyCode = currencyCode;
        }
    
        public Amount Zero()
        {
            return new Amount(0m, this.CurrencyCode);
        }
    
        Amount Plus(Amount amount)
        {
            if (amount == null)
                return new Amount(this.Value, this.CurrencyCode);
    
            if (this.CurrencyCode != amount.CurrencyCode)
                throw new ArgumentException($"cannot perform this operation with differece currency");
    
            return new Amount(this.Value + amount.Value, this.CurrencyCode);
        }
    
        Amount Minus(Amount amount)
        {
            if (amount == null)
                return new Amount(this.Value, this.CurrencyCode);
    
            if (this.CurrencyCode != amount.CurrencyCode)
                throw new ArgumentException($"cannot perform this operation with differece currency");
    
            return new Amount(this.Value - amount.Value, this.CurrencyCode);
        }
    
        public Amount Plus(decimal amt)
        {
            return new Amount(this.Value + amt, this.CurrencyCode);
        }
    
        public static Amount operator +(Amount amt, Amount value) => amt.Plus(value);
        public static Amount operator +(Amount amt, decimal value) => amt.Plus(value);
        public static Amount operator +(Amount amt, double value) => amt.Plus(Convert.ToDecimal(value));
        public static Amount operator -(Amount amt, Amount value) => amt.Minus(value);
    
        protected IEnumerable<object> GetAtomicValues()
        {
            yield return Value;
            yield return CurrencyCode;
        }
    
        public override string ToString()
        {
            return $"{Value} {CurrencyCode}";
        }
    }
}

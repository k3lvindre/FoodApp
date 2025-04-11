using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace FoodApp.Application.Common.Mappings
{
    internal static class Mapping
    {
        public static T CreateMap<TDto, T>(TDto typeSource, T type)
        {
            typeSource!
                .GetType()
                .GetProperties()
                .ToList()
                .ForEach(property =>
                {
                    if (property.GetCustomAttribute<NotMappedAttribute>() != null)
                        return;

                    var propertyInfo = typeof(T).GetProperty(property.Name);
                    if (propertyInfo != null)
                    {
                        propertyInfo.SetValue(type, property.GetValue(typeSource));
                    }
                });

            return type;
        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace FoodApp.Application.Orders.DataTransferObjects
{
    public class CreateOrderDto
    {
        public string? CustomerName { get; set; }
        public bool IsPaid { get; set; }
        public DateTime DateCreated { get; set; }
        [NotMapped]
        public List<OrderItemDto> OrderItems { get; set; }
    }
    
    public record OrderItemDto(
        int ProductId,
        int Quantity,
        decimal Price
    );
}
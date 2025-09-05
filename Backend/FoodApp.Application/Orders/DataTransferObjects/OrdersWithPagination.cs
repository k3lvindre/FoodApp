using FoodApp.Domain.Orders;

namespace FoodApp.Application.Orders.DataTransferObjects
{
    public record OrdersWithPaginationResponseDto
    {
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
        public int TotalCount { get; init; }
        public int TotalPages { get; init; }
        public List<Order> Orders { get; init; } = [];
        public decimal TotalAmount { get; init; }
    }
}

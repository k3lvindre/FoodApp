using FoodApp.Application.Orders.DataTransferObjects;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Application.Orders.Query.GetOrdersWithPagination
{
    public record GetOrdersWithPaginationQuery(int? PageNumber = 1, int? PageSize = 50) : IRequest<OrdersWithPaginationResponseDto>;

    public class GetOrdersWithPaginationQueryHandler : IRequestHandler<GetOrdersWithPaginationQuery, OrdersWithPaginationResponseDto>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public GetOrdersWithPaginationQueryHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<OrdersWithPaginationResponseDto> Handle(GetOrdersWithPaginationQuery request, CancellationToken cancellationToken)
        {
            var orders = await _foodAppDbContext.Orders
                    .Skip(((int)request.PageNumber! - 1) * (int)request.PageSize!)
                    .Take((int)request.PageSize)
                    .ToListAsync(cancellationToken);

            var count = await _foodAppDbContext.Orders.CountAsync(cancellationToken);

            if (orders.Count == 0)
            {
                return new OrdersWithPaginationResponseDto
                {
                    PageNumber = request.PageNumber ?? 1,
                    PageSize = request.PageSize ?? 50,
                    TotalCount = count,
                    TotalPages = count / (request.PageSize ?? 50),
                    TotalAmount = 0
                };
            }

            var response = new OrdersWithPaginationResponseDto
            {
                PageNumber = request.PageNumber ?? 1,
                PageSize = request.PageSize ?? 50,
                TotalCount = count,
                TotalPages = count / (request.PageSize ?? 50),
                Orders = orders,
                TotalAmount = orders.Sum(o => o.GetTotalPrice())
            };

            return response;
        }
    }
}

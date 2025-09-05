using FoodApp.Application.Common.Mappings;
using FoodApp.Application.Orders.DataTransferObjects;
using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Domain.Orders;
using FoodApp.Domain.Orders.ValueObjects;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Orders.Command.CreateOrder
{
    public record CreateOrderCommand(CreateOrderDto Order) : IRequest<bool>;

    public class CreateOrderCommandHandler(IFoodAppDbContext foodAppDbContext) : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IFoodAppDbContext _foodAppDbContext = foodAppDbContext;

        public async Task<bool> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = Mapping.CreateMap(request.Order, new Order());

            order.SetOrderType(OrderType.FromId(request.Order.OrderTypeId));
            order.SetOrderStatus(OrderStatus.FromId(request.Order.OrderStatusId));

            order.OrderItems = [.. request.Order.OrderItems
                .Select(x => new OrderItem
                {
                    ProductId = x.ProductId,
                    Quantity = x.Quantity,
                    Price = new Amount(x.Price, "PHP")
                })];

            await _foodAppDbContext.Orders.AddAsync(order, cancellationToken);
            return await _foodAppDbContext.SaveEntitiesAsync(cancellationToken);
        }
    }
}

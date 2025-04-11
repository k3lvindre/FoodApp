using FoodApp.Application.Common.Mappings;
using FoodApp.Application.Orders.DataTransferObjects;
using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Domain.Orders;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Orders.Command.CreateOrder
{
    public record CreateOrderCommand(CreateOrderDto order) : IRequest<bool>;

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public CreateOrderCommandHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<bool> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = Mapping.CreateMap(request.order, new Order());
            
            order.OrderItems = request.order.OrderItems
                .Select(x => new OrderItem
                {
                    ProductId = x.ProductId,
                    Quantity = x.Quantity,
                    Price = new Amount(x.Price, "PHP"),
                }).ToList();

            await _foodAppDbContext.Orders.AddAsync(order, cancellationToken);
            await _foodAppDbContext.SaveEntitiesAsync(cancellationToken);
            return await Task.FromResult(true);
        }
    }
}

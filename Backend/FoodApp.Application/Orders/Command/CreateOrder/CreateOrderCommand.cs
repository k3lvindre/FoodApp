using FoodApp.Domain.Orders;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Orders.Command.CreateOrder
{
    public record CreateOrderCommand(Order order) : IRequest<bool>;

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public CreateOrderCommandHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<bool> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            await _foodAppDbContext.Orders.AddAsync(request.order, cancellationToken);
            await _foodAppDbContext.SaveEntitiesAsync(cancellationToken);
            return await Task.FromResult(true);
        }
    }
}

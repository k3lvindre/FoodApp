using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Domain.Funds;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Funds.Command.CreateFund
{
    public record CreateFundCommand(string Description,
        decimal Amount,
        int ProductCategoryId) : IRequest<long>;

    public class CreateFundCommandHandler : IRequestHandler<CreateFundCommand, long>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public CreateFundCommandHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<long> Handle(CreateFundCommand request, CancellationToken cancellationToken)
        {
            var fund = new Fund(request.Description,
                new Amount(request.Amount, "PHP"),
                ProductCategory.FromId(request.ProductCategoryId));

            await _foodAppDbContext.Funds.AddAsync(fund, cancellationToken);
            await _foodAppDbContext.SaveEntitiesAsync(cancellationToken);
            return fund.Id;
        }
    }
}

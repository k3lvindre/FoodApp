using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Domain.Products;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Products.Command
{
    public record CreateProductCommand(string Name, int CategoryId, decimal Price, int Stock) : IRequest<Product>;

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public CreateProductCommandHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<Product> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product(request.Name,
                ProductCategory.FromId(request.CategoryId),
                new Amount(request.Price, "PHP"),
                request.Stock
            );

            await _foodAppDbContext.Products.AddAsync(product, cancellationToken);
            await _foodAppDbContext.SaveEntitiesAsync(cancellationToken);
            return product;
        }
    }
}

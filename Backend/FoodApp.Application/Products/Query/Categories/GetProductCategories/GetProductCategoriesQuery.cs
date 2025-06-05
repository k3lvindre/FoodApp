using FoodApp.Domain.Core.ValueObjects;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;

namespace FoodApp.Application.Products.Query.Categories.GetProductCategories
{
    public record GetProductCategoriesQuery() : IRequest<IEnumerable<ProductCategory>>;

    public class GetProductCategoriesQueryHandler : IRequestHandler<GetProductCategoriesQuery, IEnumerable<ProductCategory>>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public GetProductCategoriesQueryHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<IEnumerable<ProductCategory>> Handle(GetProductCategoriesQuery request, CancellationToken cancellationToken)
            => await Task.FromResult(ProductCategory.GetAll());
    }
}

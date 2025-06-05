using FoodApp.Domain.Products;
using FoodApp.Infrastructure.EntityFrameWork.Dbcontext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Application.Products.Query.Categories.GetProductCategories
{
    public record GetProductsByCategoryIdQuery(int categoryId) : IRequest<List<Product>>;

    public class GetProductsByCategoryIdQueryHandler : IRequestHandler<GetProductsByCategoryIdQuery, List<Product>>
    {
        private readonly IFoodAppDbContext _foodAppDbContext;

        public GetProductsByCategoryIdQueryHandler(IFoodAppDbContext foodAppDbContext)
        {
            _foodAppDbContext = foodAppDbContext;
        }

        public async Task<List<Product>> Handle(GetProductsByCategoryIdQuery request, CancellationToken cancellationToken)
        {
            return await _foodAppDbContext.Products.Where(p => p.Category.Id == request.categoryId).ToListAsync(cancellationToken);
        }
    }
}

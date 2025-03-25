using FoodApp.Application.Products.Query.Categories.GetProductCategories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductCategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
            => Ok(await _mediator.Send(new GetProductCategoriesQuery()));

        [HttpGet("{id}/products")]
        public async Task<IActionResult> Get(int id)
            => Ok(await _mediator.Send(new GetProductsByCategoryIdQuery(id)));

    }
}

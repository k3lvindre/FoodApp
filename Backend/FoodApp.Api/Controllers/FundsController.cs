using FoodApp.Application.Funds.Command.CreateFund;
using FoodApp.Application.Funds.Query.Overview;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FundsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FundsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFund([FromBody] CreateFundCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(CreateFund), new { id = result }, result);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> Summary()
            => Ok( await _mediator.Send(new FundsSummaryQuery()));
    }
}

﻿using FoodApp.Application.Orders.Command.CreateOrder;
using FoodApp.Application.Orders.Query.GetOrdersWithPagination;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetOrdersWithPaginationQuery request)
            => Ok(await _mediator.Send(request));

        [HttpPost]
        public async Task<IActionResult> Post(CreateOrderCommand request)
        {
            var result = await _mediator.Send(request);
            return result ? Created() : BadRequest();
        }
    }
}

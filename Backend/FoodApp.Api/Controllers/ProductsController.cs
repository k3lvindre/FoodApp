using FoodApp.Application.Products.Command;
using FoodApp.Application.Products.Query.Categories.GetProductCategories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp.Api.Controllers
{

    //ControllerBase
    //Web API controllers should typically derive from ControllerBase rather from Controller.
    //Controller derives from ControllerBase and adds support for views, so it's for handling web pages,
    //not web API requests. If the same controller must support views and web APIs, derive from Controller.
    //The ControllerBase class provides many properties and methods that are useful
    //for handling HTTP requests.For example, CreatedAtAction returns a 201 status code: return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
    //The following table contains examples of methods in ControllerBase.
    //Method Notes
    //BadRequest() Returns 400 status code.
    //NotFound()    Returns 404 status code.
    //PhysicalFile() Returns a file.
    //TryUpdateModelAsync() Invokes model binding.
    //TryValidateModel() Invokes model validation.
    //For a list of all available methods and properties, see https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.controllerbase.
    //It is where HttpContext came from

    //Attributes
    //The Microsoft.AspNetCore.Mvc namespace provides attributes that can be used to configure the behavior of web API controllers
    //and action methods.The following example uses attributes to specify the supported 
    //HTTP action verb and any known HTTP status codes that could be returned:
    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //[Route]	Specifies URL pattern for a controller or action.
    //[Bind] Specifies prefix and properties to include for model binding.
    //[HttpGet] Identifies an action that supports the HTTP GET action verb.
    //[Consumes] Specifies data types that an action accepts.
    //[Produces] Specifies data types that an action returns.
    //For a list that includes the available attributes, see the Microsoft.AspNetCore.Mvc namespace(https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc?view=aspnetcore-9.0)


    //[ApiController]
    //attribute, which can be applied to individual controllers, to a 
    //base controller class, or to the entire assembly.
    //This attribute adds automatic model validation checking and 
    //any action with an invalid model will return a BadRequest with the details 
    //The ApiController attribute can be used to enable the following features:
    //Automatic HTTP 400 responses
    // Binding source parameter inference like [FromRoute] or [FromBody] [FromQuery], [FromForm] - action parameters of type IFormFile
    // ProblemDetails responses for error status codes
    // Attribute routing requirement
    // The ApiController attribute makes attribute routing a requirement. This means that you must use
    // [HttpGet], [HttpPost], [HttpPut], [HttpDelete], or [HttpPatch] attributes to define your routes.
    // You can't use the conventional routing methods, such as UseEndpoints, UseMvc, or UseMvcWithDefaultRoute., to define routes.
    // If you want to use conventional routing, you must not use the ApiController attribute.
    //The [ApiController] attribute can be applied to a controller class to enable the following opinionated, API-specific behaviors:
    //Attribute routing requirement
    //Automatic HTTP 400 responses
    //Binding source parameter inference
    //Multipart/form-data request inference
    //Problem details for error status codes

    //Automatic HTTP 400 responses
    //The[ApiController] attribute makes model validation errors automatically trigger an HTTP 400 response.Consequently,
    //the following code is unnecessary in an action method:
    //if (!ModelState.IsValid)
    //{
    //    return BadRequest(ModelState);
    //}
    //ASP.NET Core MVC uses the ModelStateInvalidFilter action filter to do the preceding check.
    //To disable the automatic 400 behavior, set the SuppressModelStateInvalidFilter property to true
    //builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
    //{
    //    options.SuppressModelStateInvalidFilter = true;

    //Attribute on an assembly
    //The[ApiController] attribute can be applied to an assembly.When the[ApiController] attribute is applied to an assembly,
    //all controllers in the assembly have the [ApiController] attribute applied. 
    //There's no way to opt out for individual controllers. 
    //Apply the assembly-level attribute to the Program.cs file:

    //using Microsoft.AspNetCore.Mvc;
    //[assembly: ApiController]

    //var builder = WebApplication.CreateBuilder(args);

    //Don't use [FromRoute] when values might contain %2f (that is /). %2f won't be unescaped to /. Use [FromQuery] if the value might contain %2f.


    //Problem details for error status codes
    //MVC transforms an error result(a result with status code 400 or higher) to a result with ProblemDetails.
    //The ProblemDetails type is based on the RFC 7807 specification(https://datatracker.ietf.org/doc/html/rfc7807)
    //for providing machine-readable error details in an HTTP response.
    //Consider the following code in a controller action:
    //if (pet == null)
    //{
    //    return NotFound();
    //}
    //The NotFound method produces an HTTP 404 status code with a ProblemDetails body. For example:
    //{
    //    type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    //  title: "Not Found",
    //  status: 404,
    //  traceId: "0HLHLV31KRN83:00000001"
    //}

    // Consumes("application/xml")] attribute allows an action to limit the supported request content types.
    //By default, an action supports all available request content types,
    //must specify a Content-Type header of application/xml.
    //Requests that don't specify a Content-Type header of application/xml result in a 415 Unsupported Media Type response.

    [ApiController]
    //ApiController attribute makes this attribute routing a requirement
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public IActionResult Get()
            => Ok("working");

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductCommand command)
        {
            await _mediator.Send(command);
            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int categoryId)
            => Ok(await _mediator.Send(new GetProductsByCategoryIdQuery(categoryId)));
    }
}

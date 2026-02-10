using CESCA.API.Models.Dtos.Order;
using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public Task<ActionResult<ReturnResponse<object>>> AddOrderAsync(
            [FromBody] OrderDTO orderDTO, 
            [FromBody] OrderDetailsDTO orderDetailsDTO,
            CancellationToken ct = default)
        {
            throw new NotImplementedException();
        }
    }
}

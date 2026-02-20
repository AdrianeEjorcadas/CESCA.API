using CESCA.API.Models.Dtos.Order;
using CESCA.API.Models.Response;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("place-order")]
        public async Task<ActionResult<ReturnResponse<object>>> AddOrderAsync(
            [FromBody] CreateOrderRequestDTO orderRequestDTO,
            CancellationToken ct = default)
        {

            var order = orderRequestDTO.OrderDTO;
            var orderDetails = orderRequestDTO.OrderDetailsDTO;

            await _orderService.PlaceOrderAsync(order, orderDetails, ct);
            return Ok(new ReturnResponse<object>
            {
                StatusCode = 200,
                Message = "Order placed successfully",
                Data = null
            });
        }
    }
}

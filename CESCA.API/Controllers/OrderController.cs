using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Models.Response;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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

        [HttpGet("get-orders")]
        public async Task<ActionResult<ReturnResponse<GetOrderWithMetadataDTO>>> GetOrdersAsync([FromQuery] OrderParameters orderParameters, CancellationToken ct)
        {
            var result = await _orderService.GetOrdersAsync(orderParameters, ct);

            Response.Headers.Add("Orders-Pagination", JsonSerializer.Serialize(result.metaData));

            return Ok(new ReturnResponse<GetOrderWithMetadataDTO>
            {
                StatusCode = 200,
                Message = "Successfully retrieve orders",
                Data = new GetOrderWithMetadataDTO
                {
                    Orders = result.orders,
                    MetaData = result.metaData
                }
            });

        }

        [HttpGet("get-orders-by-id")]
        public async Task<ActionResult<ReturnResponse<IEnumerable<OrderDetailsDTO>>>> GetOrderByIdAsync([FromQuery] string invoiceNumber, CancellationToken ct)
        {
            var result = await _orderService.GetOrderByIdAsync(invoiceNumber, ct);

            return Ok(new ReturnResponse<IEnumerable<OrderDetailsDTO>>
            {
                StatusCode = 200,
                Message = "Successfully retrieved invoice orders",
                Data = result
            });
        }

        [HttpGet("generate-invoice-pdf")]
        public async Task<ActionResult> CreateInvoicePDF([FromQuery] string invoiceNumber, CancellationToken ct)
        {
            var result = await _orderService.CreateInvoiceOrdersPDF(invoiceNumber, ct);
            //throw new NotImplementedException();
            return File(result, "application/pdf", $"Invoice_{invoiceNumber}.pdf");
        }
    }
}

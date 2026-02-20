using CESCA.API.Models.Dtos.Order;

namespace CESCA.API.Services.Interface
{
    public interface IOrderService
    {
        Task PlaceOrderAsync(OrderDTO orderDTO, List<OrderDetailsDTO> orderDetailsDTO, CancellationToken ct);
    }
}

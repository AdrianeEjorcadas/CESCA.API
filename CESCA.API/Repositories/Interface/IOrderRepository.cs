using CESCA.API.Models;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Models.Response;

namespace CESCA.API.Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<string> GetOrderSeq(CancellationToken ct);
        Task PlaceOrderAsync(Order order, List<OrderDetails> orderDetails, CancellationToken ct);
    }
}

using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Models.Response;

namespace CESCA.API.Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<string> GetOrderSeq(CancellationToken ct);
        Task PlaceOrderAsync(Order order, List<OrderDetails> orderDetails, CancellationToken ct);
        Task<PagedList<OrderResponseDTO>> GetOrdersAsync(OrderParameters orderParameters, CancellationToken ct); 
        Task<IEnumerable<OrderDetailsDTO>> GetOrderByIdAsync(string invoiceNumber, CancellationToken ct);
    }
}

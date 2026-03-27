using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models.Dtos.Order;

namespace CESCA.API.Services.Interface
{
    public interface IOrderService
    {
        Task PlaceOrderAsync(OrderDTO orderDTO, List<OrderDetailsDTO> orderDetailsDTO, CancellationToken ct);
        Task<(IEnumerable<OrderResponseDTO> orders, MetaData metaData)> GetOrdersAsync(OrderParameters orderParameters, CancellationToken cancellationToken);
        Task<IEnumerable<OrderDetailsDTO>> GetOrderByIdAsync(string invoiceNumber, CancellationToken ct);
        Task<byte[]> CreateInvoiceOrdersPDF(string invoiceNumber, CancellationToken ct);
    }
}

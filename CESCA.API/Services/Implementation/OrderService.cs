using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Interface;
using static CESCA.API.Middleware.Exceptions.Exceptions;

namespace CESCA.API.Services.Implementation
{
    public class OrderService : IOrderService
    {
        IOrderRepository _orderRepository;
        ISKUGeneratorService _sKUGeneratorService;
        public OrderService(IOrderRepository orderRepository, ISKUGeneratorService sKUGeneratorService)
        {
            _orderRepository = orderRepository;
            _sKUGeneratorService = sKUGeneratorService;
        }
        public async Task PlaceOrderAsync(OrderDTO orderDTO, List<OrderDetailsDTO> orderDetailsDTO, CancellationToken ct)
        {
            string orderSeq = await _orderRepository.GetOrderSeq(ct);

            var orders = new Order
            {
                OrderId = Guid.NewGuid(),
                InvoiceNumber = $"CESCA-{DateTime.Now.Year.ToString()}-{orderSeq}",
                OrderAmount = orderDTO.OrderAmount,
                DiscountApplied = orderDTO.DiscountApplied,
                FinalAmount = orderDTO.FinalAmount,
                Status = orderDTO.Status,
                ProcessBy = orderDTO.ProcessBy,
            };

            var orderDetailList = orderDetailsDTO.Select(dto => new OrderDetails
            {
                OrderId = orders.OrderId,
                InvoiceNumber = orders.InvoiceNumber,
                ProductId = dto.ProductId,
                Price = dto.Price,
                Quantity = dto.Quantity,
                Total = dto.Total,
            }).ToList();

            await _orderRepository.PlaceOrderAsync(orders, orderDetailList, ct);
        }

        public async Task<(IEnumerable<OrderResponseDTO> orders, MetaData metaData)> GetOrdersAsync(
            OrderParameters orderParameters, CancellationToken cancellationToken)
        {
            var result = await _orderRepository.GetOrdersAsync(orderParameters, cancellationToken);

            return (orders: result, metaData: result.MetaData);
        }

        public Task<IEnumerable<OrderDetailsDTO>> GetOrderByIdAsync(string invoiceNumber, CancellationToken ct)
        {
            var result = _orderRepository.GetOrderByIdAsync(invoiceNumber, ct);

            if (result == null)
            {
                throw new OrderNotFoundException($"Order not found for Invoice Number  {invoiceNumber}");
            }

            return result;
        }
    }
}

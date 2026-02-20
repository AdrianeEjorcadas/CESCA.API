using CESCA.API.Models;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Interface;

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
                OrderId = $"CESCA-{DateTime.Now.Year.ToString()}-{orderSeq}",
                OrderAmount = orderDTO.OrderAmount,
                DiscountApplied = orderDTO.DiscountApplied,
                FinalAmount = orderDTO.FinalAmout,
                Status = orderDTO.Status,
                ProcessBy = orderDTO.ProcessBy,
            };

            var orderDetailList = orderDetailsDTO.Select(dto => new OrderDetails
            {
                OrderId = orders.OrderId,
                ProductId = dto.ProductId,
                Price = dto.Price,
                Quantity = dto.Quantity,
                Total = dto.Total,
            }).ToList();

            await _orderRepository.PlaceOrderAsync(orders, orderDetailList, ct);
        }
    }
}

namespace CESCA.API.Models.Dtos.Order
{
    public class CreateOrderRequestDTO
    {
        public OrderDTO OrderDTO { get; set; }
        public List<OrderDetailsDTO> OrderDetailsDTO { get; set; }
    }
}

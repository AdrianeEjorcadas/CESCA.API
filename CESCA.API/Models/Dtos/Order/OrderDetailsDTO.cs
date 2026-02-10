namespace CESCA.API.Models.Dtos.Order
{
    public class OrderDetailsDTO
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models
{
    public class OrderDetails
    {
        [Key]
        public int OrderItemId { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public Order Order { get; set; }
    }
}

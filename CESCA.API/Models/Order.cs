using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal FinalAmount { get; set; }
        public string? Status { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
        public string ProcessBy { get; set; }
    }
}

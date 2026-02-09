namespace CESCA.API.Models
{
    public class Order
    {
        public Guid OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal FinalAmount { get; set; }
        public string? Status { get; set; }
    }
}

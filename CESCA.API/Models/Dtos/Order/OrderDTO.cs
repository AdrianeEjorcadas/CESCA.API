namespace CESCA.API.Models.Dtos.Order
{
    public class OrderDTO
    {
        public decimal Payment { get; set; }
        public decimal Change { get; set; }
        public decimal OrderAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal FinalAmout { get; set; }
        public string? Status { get; set; }
        public string ProcessBy { get; set; }
    }
}

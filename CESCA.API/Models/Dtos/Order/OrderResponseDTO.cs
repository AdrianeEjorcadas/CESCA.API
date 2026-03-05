namespace CESCA.API.Models.Dtos.Order
{
    public class OrderResponseDTO
    {
        public string InvoiceNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderAmount { get; set; }
        public bool DiscountApplied { get; set; }
        public decimal FinalAmount { get; set; }
        public string? Status { get; set; }
        public string ProcessBy { get; set; }
    }
}

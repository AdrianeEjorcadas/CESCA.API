namespace CESCA.API.Models.Dtos.Invoice
{
    public class InvoiceOrderDTO
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Cashier { get; set; }
    }
}

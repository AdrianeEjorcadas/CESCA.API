namespace CESCA.API.Models.Dtos.Pos
{
    public class GetPosProduct
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}

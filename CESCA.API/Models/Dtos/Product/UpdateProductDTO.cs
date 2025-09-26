namespace CESCA.API.Models.Dtos.Product
{
    public class UpdateProductDTO : ProductDTO
    {
        public Guid ProductId { get; set; }
        public bool IsArchived { get; set; }
    }
}

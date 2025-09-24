namespace CESCA.API.Models.Dtos.Product
{
    public class ProductResponseDTO : ProductDTO
    {
        public bool IsArchived { get; set; }
        public bool IsDeleted { get; set; }
    }
}

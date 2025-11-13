using CESCA.API.Helpers.Pagination;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Models.Response
{
    public class ProductGetResponseDTO
    {
        public IEnumerable<ProductDTO> Products { get; set; }
        public MetaData MetaData { get; set; }
    }
}

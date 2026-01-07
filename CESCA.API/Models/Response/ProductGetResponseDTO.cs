using CESCA.API.Helpers.Pagination;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Models.Response
{
    public class ProductGetResponseDTO
    {
        public IEnumerable<ProductResponseDTO> Products { get; set; }
        public MetaData MetaData { get; set; }
    }
}

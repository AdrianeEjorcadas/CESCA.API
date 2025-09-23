using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Services.Interface;

namespace CESCA.API.Services.Implementation
{
    public class ProductService : IProductService
    {
        public Task<ProductDTO> AddProductAsync(ProductDTO productDto, CancellationToken ct)
        {
            throw new NotImplementedException();
        }
    }
}

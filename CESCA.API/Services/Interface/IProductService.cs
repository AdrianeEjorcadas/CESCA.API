using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Services.Interface
{
    public interface IProductService
    {
        Task<ProductDTO> AddProductAsync(ProductDTO productDto, CancellationToken ct);
    }
}

using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Repositories.Interface
{
    public interface IProductRepository
    {
        Task<ProductResponseDTO> AddProductAsync(Product product, CancellationToken ct);
    }
}

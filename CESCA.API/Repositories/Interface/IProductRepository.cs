using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Repositories.Interface
{
    public interface IProductRepository
    {
        Task<ProductResponseDTO> AddProductAsync(Product product, CancellationToken ct);

        Task<ProductResponseDTO?> UpdateProductAsync(UpdateProductDTO updateProductDTO, CancellationToken ct);

        Task<ProductResponseDTO?> DeleteProductAsync(Guid productId, CancellationToken ct);

        Task<ProductResponseDTO> ArchivedProductAsync(Guid productId, CancellationToken ct);
    }
}

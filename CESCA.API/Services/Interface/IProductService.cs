using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;

namespace CESCA.API.Services.Interface
{
    public interface IProductService
    {
        Task<ProductResponseDTO> AddProductAsync(ProductDTO productDto, CancellationToken ct);

        Task<ProductResponseDTO?> UpdateProductAsync(UpdateProductDTO updateProductDTO, CancellationToken ct);

        Task<ProductResponseDTO?> DeleteProductAsync(Guid productId, CancellationToken ct);

        Task<ProductResponseDTO> ArchivedProductAsync(Guid productId, CancellationToken ct);
    }
}

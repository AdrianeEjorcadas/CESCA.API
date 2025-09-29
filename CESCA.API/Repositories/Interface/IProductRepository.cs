using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Models.Dtos.Supplier;

namespace CESCA.API.Repositories.Interface
{
    public interface IProductRepository
    {
        Task<ProductResponseDTO> AddProductAsync(Product product, CancellationToken ct);

        Task<ProductResponseDTO?> UpdateProductAsync(UpdateProductDTO updateProductDTO, CancellationToken ct);

        Task<ProductResponseDTO?> DeleteProductAsync(Guid productId, CancellationToken ct);

        Task<ProductResponseDTO> ArchivedProductAsync(Guid productId, CancellationToken ct);

        Task<PagedList<ProductResponseDTO>> GetProductsAsync(ProductParameters productParameters,
           CancellationToken ct);

        Task<ProductResponseDTO?> GetProductsByIdAsync(Guid productId, CancellationToken ct);
    }
}

using CESCA.API.Models;

namespace CESCA.API.Repositories.Interface
{
    public interface IProductRepository
    {
        Task<Product> AddProductAsync(Product product, CancellationToken ct);
    }
}

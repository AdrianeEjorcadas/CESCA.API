using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Repositories.Interface;

namespace CESCA.API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _context;

        public ProductRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Product> AddProductAsync(Product product, CancellationToken ct)
        {
            var result = await _context.Products
                .AddAsync(product, ct);
            await _context.SaveChangesAsync(ct);

            return result.Entity;
        }
    }
}

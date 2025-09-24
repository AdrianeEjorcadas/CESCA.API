using AutoMapper;
using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Repositories.Interface;

namespace CESCA.API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(IMapper mapper,ApplicationDBContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductResponseDTO> AddProductAsync(Product product, CancellationToken ct)
        {
            var result = await _context.Products
                .AddAsync(product, ct);
            await _context.SaveChangesAsync(ct);

            //return the product entity <ProductResponseDTO>
            return _mapper.Map<ProductResponseDTO>(result.Entity);
        }
    }
}

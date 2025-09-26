using AutoMapper;
using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

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

        public async Task<ProductResponseDTO?> UpdateProductAsync(UpdateProductDTO updateProductDTO, CancellationToken ct)
        {
            //check if product exist
            var productEntity = await _context.Products
                .SingleOrDefaultAsync(p => p.ProductId == updateProductDTO.ProductId, ct);

            if (productEntity is null)
            {
                return null;
            }

            //update the value of 'productToUpdate' by using the value of 'product'
            _mapper.Map(updateProductDTO, productEntity);

            // Force EF to treat it as modified
            //_context.Entry(productEntity).State = EntityState.Modified;

            await _context.SaveChangesAsync(ct);    

            //return updated product
            return _mapper.Map<ProductResponseDTO>(productEntity);
        }
    }
}

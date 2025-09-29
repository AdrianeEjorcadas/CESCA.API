using AutoMapper;
using AutoMapper.QueryableExtensions;
using CESCA.API.Data;
using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
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

            //update the value of 'productToUpdate' by using the value of 'updateProductDTO'
            _mapper.Map(updateProductDTO, productEntity);

            await _context.SaveChangesAsync(ct);    

            //return updated product
            return _mapper.Map<ProductResponseDTO>(productEntity);
        }

        public async Task<ProductResponseDTO?> DeleteProductAsync(Guid productId, CancellationToken ct)
        {
            //check if product exist
            var productEntity = await _context.Products
                .FindAsync(productId, ct);

            if (productEntity is null)
            {
                return null;
            }

            _context.Products.Remove(productEntity);

            await _context.SaveChangesAsync(ct);

            return _mapper.Map<ProductResponseDTO>(productEntity);
        }

        public async Task<ProductResponseDTO> ArchivedProductAsync(Guid productId, CancellationToken ct)
        {
            // check if product exist
            var productEntity = await _context.Products
                .FindAsync(productId, ct);

            if (productEntity is null)
            {
                return null;
            }

            productEntity.IsArchived = true;
            await _context.SaveChangesAsync(ct);

            return _mapper.Map <ProductResponseDTO>(productEntity);
        }

        public async Task<PagedList<ProductResponseDTO>> GetProductsAsync(ProductParameters productParameters, CancellationToken ct)
        {
            var query = _context.Products.AsQueryable();

            //Search Term
            if (!string.IsNullOrEmpty(productParameters.SearchTerm)){
                query = query.Where(p => p.ProductName.Contains(productParameters.SearchTerm));
            }

            // Archived Items
            if (productParameters.IsArchived.HasValue)
            {
                query = query.Where(p => p.IsArchived == productParameters.IsArchived.Value);
            }

            var result = await query
                .AsNoTracking()
                .OrderBy(p  => p.ProductName)
                .Skip((productParameters.PageNumber - 1) * productParameters.PageSize)
                .Take(productParameters.PageSize)
                .ProjectTo<ProductResponseDTO>(_mapper.ConfigurationProvider) //map data to ProductResponseDTO
                .ToListAsync(ct);

            var count = await _context.Products.CountAsync(ct);

            return PagedList<ProductResponseDTO>
                .ToPagedList(result, count, productParameters.PageNumber, productParameters.PageSize);
        }

        public async Task<ProductResponseDTO?> GetProductsByIdAsync(Guid productId, CancellationToken ct)
        {
            var result = await _context.Products
                .FindAsync(productId, ct);

            if (result is null)
            {
                return null;
            }

            return _mapper.Map<ProductResponseDTO>(result);

        }
    }
}

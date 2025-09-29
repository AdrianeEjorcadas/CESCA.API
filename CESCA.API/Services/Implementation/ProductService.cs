using AutoMapper;
using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Interface;
using static CESCA.API.Middleware.Exceptions.Exceptions;

namespace CESCA.API.Services.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ISKUGeneratorService _skuGeneratorService;
        private readonly IMapper _mapper;
        public ProductService(IMapper mapper, IProductRepository productRepository, ISKUGeneratorService sKUGeneratorService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _skuGeneratorService = sKUGeneratorService;
        }

        public async Task<ProductResponseDTO> AddProductAsync(ProductDTO productDto, CancellationToken ct)
        {
            //populate product<Product> by using the value of productDto
            var product = _mapper.Map<Product>(productDto);
            // generate barcode
            product.Barcode = _skuGeneratorService.GenerateSKU(product.Category, product.ProductName);

            var result = await _productRepository.AddProductAsync(product, ct);

            if (result is null)
            {
                throw new ProductCreationException("Error occured while adding product");
            }

            return result;
        }

        public async Task<ProductResponseDTO?> UpdateProductAsync(UpdateProductDTO updateProductDTO, CancellationToken ct)
        {
            //populate product<Product> by using 'updateProductDTO' values
            //var product = _mapper.Map<Product>(updateProductDTO);

            //return result<ProductResponseDTO>
            var result = await _productRepository.UpdateProductAsync(updateProductDTO, ct);

            if (result is null)
            {
                throw new ProductNotFoundException("Error occurred while updating product");
            }

            return result;
        }

        public async Task<ProductResponseDTO?> DeleteProductAsync(Guid productId, CancellationToken ct)
        {
            var result  = await _productRepository.DeleteProductAsync(productId, ct);

            if (result is null)
            {
                throw new ProductNotFoundException("Error occurred while deleting the product");
            }

            return result;
        }

        public async Task<ProductResponseDTO> ArchivedProductAsync(Guid productId, CancellationToken ct)
        {
            var result = await _productRepository.ArchivedProductAsync(productId, ct);

            if(result is null)
            {
                throw new ProductNotFoundException("Error occurred while archiving the product");
            }

            return result;
        }

        public async Task<(IEnumerable<ProductResponseDTO> products, MetaData metaData)> GetProductAsync(ProductParameters parameters, CancellationToken ct)
        {
            var result = await _productRepository.GetProductsAsync(parameters, ct);

            return (products: result, metaData: result.MetaData);
        }

        public async Task<ProductResponseDTO> GetProductByIdAsync(Guid productId, CancellationToken ct)
        {
            var result = await _productRepository.GetProductsByIdAsync(productId, ct);

            if (result is null)
            {
                throw new ProductNotFoundException("Error occurred while archiving the product");
            }

            return result;
        }
    }
}

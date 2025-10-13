using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Middleware.Filters;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Models.Response;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("add-product")]
        [ValidateModelState]
        public async Task<ActionResult<ReturnResponse<ProductDTO>>> AddProductAsync([FromBody] ProductDTO productDTO, CancellationToken ct = default)
        {
            var result = await _productService.AddProductAsync(productDTO, ct);
            return Created(string.Empty, new ReturnResponse<ProductDTO>
            {
                StatusCode = 201,
                Message = "Product registration completed",
                Data = result
            });
        }

        [HttpPut("update-product")]
        [ValidateModelState]
        public async Task<ActionResult<ReturnResponse<ProductResponseDTO>>> UpdateProductAsync([FromBody] UpdateProductDTO updateProduct, CancellationToken ct = default)
        {
            var result = await _productService.UpdateProductAsync(updateProduct, ct);
            return Ok(new ReturnResponse<ProductDTO>
            {
                StatusCode = 200,
                Message = "Product update completed",
                Data = result
            });
        }

        [HttpDelete("delete-product")]
        public async Task<ActionResult<ReturnResponse<ProductResponseDTO>>> DeleteProductAsync([FromQuery] Guid productId, CancellationToken ct = default)
        {
            var result = await _productService.DeleteProductAsync(productId, ct);
            return Ok(new ReturnResponse<ProductResponseDTO>
            {
                StatusCode = 200,
                Message = $"Successfully delete {result.ProductName}",
                Data = result
            });
        }

        [HttpPut("archived-product")]
        public async Task<ActionResult<ReturnResponse<ProductResponseDTO>>> ArchivedProductAsync([FromQuery] Guid productId, CancellationToken ct = default)
        {
            var result = await _productService.ArchivedProductAsync(productId, ct);
            return Ok(new ReturnResponse<ProductResponseDTO>
            {
                StatusCode = 200,
                Message = $"Successfully archiving {result.ProductName}",
                Data = result
            });
        }

        [HttpGet("get-products")]
        public async Task<ActionResult<ReturnResponse<object>>> GetProductsAsync([FromQuery]ProductParameters productParameters,CancellationToken ct = default)
        {
            var result = await _productService.GetProductAsync(productParameters, ct);
            return Ok(new ReturnResponse<object>
            {
                StatusCode = 200,
                Message = "Successfully retrieve products",
                Data = result.products
            });
        }

        [HttpGet("get-product-by-id")]
        public async Task<ActionResult<ReturnResponse<ProductResponseDTO>>> GetProductByIdAsync([FromQuery] Guid productId, CancellationToken ct = default)
        {
            var result = await _productService.GetProductByIdAsync(productId, ct);
            return Ok(new ReturnResponse<object>
            {
                StatusCode = 200,
                Message = $"Successfully retrieve {result.ProductName}",
                Data = result
            });
        }
    }
}

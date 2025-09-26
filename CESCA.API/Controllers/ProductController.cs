using CESCA.API.Middleware.Filters;
using CESCA.API.Models.Dtos.Product;
using CESCA.API.Models.Response;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
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
    }
}

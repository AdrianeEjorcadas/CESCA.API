using CESCA.API.Models.Dtos.Product;
using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        /// <summary>
        /// Handles product registration
        /// </summary>
        /// <param name="productDTO"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("add-product")]
        public Task<ReturnResponse<ProductDTO>> AddProductAsync([FromBody] ProductDTO productDTO)
        {
            throw new NotImplementedException();
        }
    }
}

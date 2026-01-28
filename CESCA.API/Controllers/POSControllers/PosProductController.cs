using CESCA.API.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers.POSControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PosProductController : ControllerBase
    {

        [HttpGet("get-pos-product")]
        public async Task<ActionResult<ReturnResponse<object>>> GetProductForPos(CancellationToken ct)
        {
            throw new NotImplementedException();
        }
    }
}

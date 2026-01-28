using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers.POSControllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PosController : ControllerBase
    {
           
    }
}

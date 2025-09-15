using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Models.Response;
using CESCA.API.Services.Implementation;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CESCA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierService _supplierService;
        public SupplierController(SupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpPost("add-supplier")]
        public async Task<ActionResult<ReturnResponse<Supplier>>> AddSupplierAsync([FromBody] AddSupplierDTO addSupplierDTO)
        {
            var result = await _supplierService.AddSupplierAsync(addSupplierDTO);
            return Ok(new ReturnResponse<object>
            {
                StatusCode = 201,
                Message = "Supplier added successfully",
                Data = result
            });
        }
    }
}

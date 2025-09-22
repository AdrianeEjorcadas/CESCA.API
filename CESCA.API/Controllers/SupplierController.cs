using Azure.Core;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Middleware.Filters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Models.Response;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

namespace CESCA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpPost("add-supplier")]
        [ValidateModelState]
        public async Task<ActionResult<ReturnResponse<Supplier>>> AddSupplierAsync([FromBody] AddSupplierDTO addSupplierDTO)
        {
            var result = await _supplierService.AddSupplierAsync(addSupplierDTO);
            return Ok(new ReturnResponse<Supplier>
            {
                StatusCode = 201,
                Message = "Supplier added successfully",
                Data = result
            });
        }

        [HttpGet("get-supplier-by-id")]
        public async Task<ActionResult<ReturnResponse<SupplierOutputDTO>>> GetSupplierByIdAsync([FromQuery]Guid supplierId)
        {
            var result = await _supplierService.GetSupplierByIdAsync(supplierId);
            return Ok(new ReturnResponse<SupplierOutputDTO>
            {
                StatusCode = 200,
                Message = "Supplier retrieved successfully",
                Data = result
            });
        }

        [HttpGet("get-suppliers")]
        public async Task<ActionResult<ReturnResponse<object>>> GetSuppliersAsync([FromQuery] SupplierParameters supplierParameters, 
            CancellationToken ct = default)
        {
            var result = await _supplierService.GetSupplierAsync(supplierParameters, ct);

            // frontend metadata
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.metaData));

            return Ok(new ReturnResponse<object>
            {
                StatusCode = 200,
                Message = "Successfully retrieve suppliers",
                Data = result.suppliers
            });
        }

        [HttpDelete("delete-supplier")]
        public async Task<ActionResult<ReturnResponse<SupplierOutputDTO>>> DeleteSupplierAsync([FromQuery] Guid supplierId)
        {
            var result = await _supplierService.DeleteSupplierAsync(supplierId);
            return Ok(new ReturnResponse<SupplierOutputDTO>
            {
                StatusCode = 200,
                Message = $"{result.SupplierName.ToUpper()} has been deleted",
                Data = null
            });
        } 

    }
}

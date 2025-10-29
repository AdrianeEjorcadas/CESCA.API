using Azure.Core;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Middleware.Filters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Supplier;
using CESCA.API.Models.Response;
using CESCA.API.Services.Implementation;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

namespace CESCA.API.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;
        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        /// <summary>
        /// Handles supplier registration
        /// </summary>
        /// <param name="addSupplierDTO"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        /// 
        [HttpPost("add-supplier")]
        [ValidateModelState]
        public async Task<ActionResult<ReturnResponse<Supplier>>> AddSupplierAsync([FromBody] AddSupplierDTO addSupplierDTO,CancellationToken ct = default)
        {
            var result = await _supplierService.AddSupplierAsync(addSupplierDTO, ct);
            return Created(string.Empty, new ReturnResponse<Supplier>
            {
                StatusCode = 201,
                Message = "Supplier added successfully",
                Data = result
            });
        }

        /// <summary>
        ///  Fetch specific supplier
        /// </summary>
        /// <param name="supplierId"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpGet("get-supplier-by-id")]
        public async Task<ActionResult<ReturnResponse<SupplierDTO>>> GetSupplierByIdAsync([FromQuery]Guid supplierId, CancellationToken ct = default)
        {
            var result = await _supplierService.GetSupplierByIdAsync(supplierId, ct);
            return Ok(new ReturnResponse<SupplierDTO>
            {
                StatusCode = 200,
                Message = "Supplier retrieved successfully",
                Data = result
            });
        }

        /// <summary>
        ///  Fetch all supplier by page
        /// </summary>
        /// <param name="supplierParameters"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
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
                Data = new
                {
                    Suppliers = result.suppliers,
                    MetaData = result.metaData
                }
            });
        }

        /// <summary>
        ///  Delete specific supplier
        /// </summary>
        /// <param name="supplierId"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpDelete("delete-supplier")]
        public async Task<ActionResult<ReturnResponse<SupplierDTO>>> DeleteSupplierAsync([FromQuery] Guid supplierId,
            CancellationToken ct = default)
        {
            var result = await _supplierService.DeleteSupplierAsync(supplierId, ct);
            return Ok(new ReturnResponse<SupplierDTO>
            {
                StatusCode = 200,
                Message = $"{result.SupplierName.ToUpper()} has been deleted",
                Data = null
            });
        }

        /// <summary>
        ///  Update supplier information
        /// </summary>
        /// <param name="supplierDTO"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        [HttpPut("update-supplier")]
        [ValidateModelState]
        public async Task<ActionResult<ReturnResponse<Supplier>>> UpdateSupplierAsync([FromBody] UpdateSupplierDTO supplierDTO,
            CancellationToken ct = default)
        {
            var result = await _supplierService.UpdateSupplierAsync(supplierDTO, ct);
            return Ok(new ReturnResponse<Supplier>
            {
                StatusCode = 200,
                Message = $"{result!.SupplierName.ToUpper()} has been updated",
                Data = result
            });
        }

    }
}

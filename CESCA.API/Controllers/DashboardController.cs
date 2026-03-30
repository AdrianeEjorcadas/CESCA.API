using CESCA.API.Models.Dtos.Dashboard;
using CESCA.API.Models.Response;
using CESCA.API.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CESCA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("initial-dashboard-data")]
        public async Task<ActionResult<ReturnResponse<InitialDashboardPayloadDTO>>> GetInitialDashboardDataAsync(CancellationToken ct)
        {
            var payload = await _dashboardService.GetInitialDashboardDataAsync(ct);

            return Ok(new ReturnResponse<InitialDashboardPayloadDTO>
            {
                StatusCode = 200,
                Message = "Succesfully retrieve the dashboard payload",
                Data = payload
            });
        }
    
    }
}

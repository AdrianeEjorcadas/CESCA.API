using CESCA.API.Models.Dtos.Dashboard;

namespace CESCA.API.Services.Interface
{
    public interface IDashboardService
    {
        Task<IEnumerable<LineChartDTO>> GetDailySaleAndRevTrendAsync(CancellationToken ct, DateTimeOffset? date = null);
        Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct);
    }
}

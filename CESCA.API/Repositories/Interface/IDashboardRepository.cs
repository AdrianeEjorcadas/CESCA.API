using CESCA.API.Models.Dtos.Dashboard;

namespace CESCA.API.Repositories.Interface
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<LineChartDTO>> GetDailySaleAndRevTrendAsync(DateTimeOffset date, CancellationToken ct);
        Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct);
    }
}

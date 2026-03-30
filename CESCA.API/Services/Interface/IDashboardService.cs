using CESCA.API.Models.Dtos.Dashboard;

namespace CESCA.API.Services.Interface
{
    public interface IDashboardService
    {
        Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct);
    }
}

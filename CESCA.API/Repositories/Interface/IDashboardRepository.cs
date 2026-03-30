using CESCA.API.Models.Dtos.Dashboard;

namespace CESCA.API.Repositories.Interface
{
    public interface IDashboardRepository
    {
        Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct);
    }
}

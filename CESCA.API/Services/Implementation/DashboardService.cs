using CESCA.API.Models.Dtos.Dashboard;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Interface;

namespace CESCA.API.Services.Implementation
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepo;
        public DashboardService(IDashboardRepository dashboardRepo)
        {
            _dashboardRepo = dashboardRepo;
        }

        public async Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct)
        {
            var payload = await _dashboardRepo.GetInitialDashboardDataAsync(ct);

            if (payload is null)
                throw new InvalidOperationException("Unable to retrieve dashboard payload");

            return payload;
        }
    }
}

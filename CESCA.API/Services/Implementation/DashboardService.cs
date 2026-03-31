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

        public async Task<IEnumerable<LineChartDTO>> GetDailySaleAndRevTrendAsync(CancellationToken ct, DateTimeOffset? date = null)
        {
            //check if date from user exist
            var targetDate = date ?? DateTimeOffset.UtcNow.Date;

            var payload = await _dashboardRepo.GetDailySaleAndRevTrendAsync(targetDate, ct);

            if (payload is null)
                throw new InvalidOperationException("Unable to retrieve sales and revenue trend payload");

            return payload;

        }
    }
}

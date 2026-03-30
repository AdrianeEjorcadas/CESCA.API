using CESCA.API.Data;
using CESCA.API.Models.Dtos.Dashboard;
using CESCA.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CESCA.API.Repositories
{
    public class DashboardRepository :IDashboardRepository
    {
        private readonly ApplicationDBContext _context;
        public DashboardRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<InitialDashboardPayloadDTO> GetInitialDashboardDataAsync(CancellationToken ct)
        {
            var today = DateTimeOffset.UtcNow.Date;
            var tomorrow = today.AddDays(1);
            var monthStart = new DateTimeOffset(today.Year, today.Month, 1, 0, 0, 0, TimeSpan.Zero);

            var payload = new InitialDashboardPayloadDTO
            {
                TodaysOrder = await _context.Orders.CountAsync(o => o.OrderDate >= today && o.OrderDate <= tomorrow),
                MonthsOrder = await _context.Orders.CountAsync(o => o.OrderDate >= monthStart),
                TodaysRevenue = await _context.Orders.Where(o => o.OrderDate >= today && o.OrderDate <= tomorrow)
                                    .SumAsync(o => o.FinalAmount),
                MonthsRevenue = await _context.Orders.Where(o => o.OrderDate >= monthStart).SumAsync(o => o.FinalAmount)
            };

            return payload;
        }
    }
}

namespace CESCA.API.Models.Dtos.Dashboard
{
    public class InitialDashboardPayloadDTO
    {
        public int TodaysOrder { get; set; }
        public int MonthsOrder { get; set; }
        public decimal TodaysRevenue { get; set; }
        public decimal MonthsRevenue { get; set; }
    }
}

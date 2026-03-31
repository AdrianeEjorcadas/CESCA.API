namespace CESCA.API.Models.Dtos.Dashboard
{
    public class LineChartDTO
    {
        public DateTimeOffset TransactionDate { get; set; }
        public int Sales { get; set; }
        public decimal Revenue { get; set; }
    }
}

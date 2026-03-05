namespace CESCA.API.Helpers.Pagination.Parameters
{
    public class OrderParameters: RequestParamaters 
    {
        public DateTimeOffset? OrderFrom { get; set; }
        public DateTimeOffset? OrderTo { get; set; }
        public bool DiscountApplied { get; set; }
    }
}

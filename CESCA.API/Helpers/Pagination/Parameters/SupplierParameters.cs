using CESCA.API.Helpers.Pagination;

namespace CESCA.API.Helpers.Pagination.Parameters
{
    /// <summary>
    ///  include fields base on supplier
    /// </summary>
    public class SupplierParameters : RequestParamaters
    {
        public string? Address { get; set; }
    }
}

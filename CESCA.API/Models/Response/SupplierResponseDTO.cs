using CESCA.API.Helpers.Pagination;
using CESCA.API.Models.Dtos.Supplier;

namespace CESCA.API.Models.Response
{
    public class SupplierResponseDTO
    {
        public IEnumerable<SupplierDTO> Suppliers { get; set; }
        public MetaData MetaData { get; set; }
    }
}

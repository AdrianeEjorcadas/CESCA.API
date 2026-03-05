using CESCA.API.Helpers.Pagination;

namespace CESCA.API.Models.Dtos.Order
{
    public class GetOrderWithMetadataDTO
    {
        public IEnumerable<OrderResponseDTO> Orders { get; set; }
        public MetaData MetaData { get; set; }
    }
}

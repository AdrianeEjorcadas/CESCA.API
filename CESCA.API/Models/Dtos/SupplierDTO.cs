namespace CESCA.API.Models.Dtos
{
    public class SupplierDTO
    {
        public Guid SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string? Email { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
        public bool IsDeleted { get; set; }
    }
}

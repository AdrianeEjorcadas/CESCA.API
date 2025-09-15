using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos
{
    public class AddSupplierDTO
    {
        [StringLength(100, ErrorMessage = "Supplier name should not exceed to 100 characters.")]
        public string SupplierName { get; set; }
        public string? Email { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
    }
}

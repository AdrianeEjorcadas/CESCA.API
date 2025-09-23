using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos.Supplier
{
    public class SupplierDTO
    {
        [Required]
        public Guid SupplierId { get; set; }

        [StringLength(100, ErrorMessage = "Supplier name should not exceed to 100 characters.")]
        public string SupplierName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
        public bool IsDeleted { get; set; }
    }
}

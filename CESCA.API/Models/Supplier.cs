using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models
{
    public class Supplier
    {
        [Key]
        public Guid SupplierId { get; set; }

        [StringLength(100)]
        public string SupplierName { get; set; }

        [EmailAddress(ErrorMessage = "Enter valid email address")]
        public string? Email { get; set; }

        public string? ContactNumber { get; set; }
        public string? Address { get; set; }

        public ICollection<Product> Products { get; set; }
        public bool IsArchived { get; set; }


        // Audit fields
        public Guid CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTimeOffset? DeletedAt { get; set; }
        public Guid? DeletedBy { get; set; }
    }
}

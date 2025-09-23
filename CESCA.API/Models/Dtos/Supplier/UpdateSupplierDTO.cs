using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos.Supplier
{
    public class UpdateSupplierDTO : SupplierDTO
    {
        [Required]
        public Guid UpdatedBy { get; set; }
    }
}

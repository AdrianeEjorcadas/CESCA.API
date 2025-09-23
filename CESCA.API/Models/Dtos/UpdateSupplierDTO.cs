using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos
{
    public class UpdateSupplierDTO : SupplierDTO
    {
        [Required]
        public Guid UpdatedBy { get; set; }
    }
}

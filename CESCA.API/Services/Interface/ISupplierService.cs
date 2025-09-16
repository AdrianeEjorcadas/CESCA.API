using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Services.Interface
{
    public interface ISupplierService
    {
        Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO);

        Task<Supplier> GetSupplierAsync();

        Task<SupplierOutputDTO> GetSupplierByIdAsync(Guid supplierId);

        Task<Supplier> UpdateSupplierAsync();

        Task<Supplier> DeleteSupplierAsync(Guid supplierId);
    }
}

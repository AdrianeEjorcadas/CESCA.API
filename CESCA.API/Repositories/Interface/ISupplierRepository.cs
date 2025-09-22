using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Repositories.Interface
{
    public interface ISupplierRepository
    {
        Task<Supplier> AddSupplierAsync(Supplier supplier);

        Task<IEnumerable<Supplier>> GetSupplierAsync();

        Task<SupplierOutputDTO?> GetSupplierByIdAsync(Guid supplierId);

        Task<Supplier> UpdateSupplierAsync();

        Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId);
    }
}

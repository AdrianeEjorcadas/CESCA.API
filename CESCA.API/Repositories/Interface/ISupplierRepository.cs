using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Repositories.Interface
{
    public interface ISupplierRepository
    {
        Task<Supplier> AddSupplierAsync(Supplier supplier);

        Task<Supplier> GetSupplierAsync();

        Task<Supplier> GetSupplierByIdAsync(Guid supplierId);

        Task<Supplier> UpdateSupplierAsync();

        Task<Supplier> DeleteSupplierAsync(Guid supplierId);
    }
}

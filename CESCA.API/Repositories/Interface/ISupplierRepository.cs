using CESCA.API.Helpers;
using CESCA.API.Helpers.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Repositories.Interface
{
    public interface ISupplierRepository
    {
        Task<Supplier> AddSupplierAsync(Supplier supplier, CancellationToken cancellationToken = default);

        Task<PagedList<SupplierOutputDTO>> GetSupplierAsync(SupplierParameters supplierParameters, CancellationToken cancellationToken = default);

        Task<SupplierOutputDTO?> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken = default);

        Task<Supplier> UpdateSupplierAsync(CancellationToken cancellationToken = default);

        Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken = default);
    }
}

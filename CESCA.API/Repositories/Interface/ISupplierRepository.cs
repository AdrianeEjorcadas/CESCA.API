using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Supplier;

namespace CESCA.API.Repositories.Interface
{
    public interface ISupplierRepository
    {
        Task<Supplier> AddSupplierAsync(Supplier supplier, CancellationToken cancellationToken);

        Task<PagedList<SupplierDTO>> GetSupplierAsync(SupplierParameters supplierParameters, CancellationToken cancellationToken = default);

        Task<SupplierDTO?> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken);

        Task<Supplier?> UpdateSupplierAsync(Supplier supplier, CancellationToken cancellationToken);

        Task<SupplierDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken);

        Task<SupplierDTO?> ArchivedSupplierAsync(Guid supplierId, CancellationToken cancellationToken);
    }
}

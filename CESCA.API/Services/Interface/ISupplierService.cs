using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Services.Interface
{
    public interface ISupplierService
    {
        Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO);

        Task<(IEnumerable<SupplierOutputDTO> suppliers, MetaData metaData)> GetSupplierAsync(SupplierParameters supplierParameters,
            CancellationToken cancellationToken);

        Task<SupplierOutputDTO> GetSupplierByIdAsync(Guid supplierId);

        Task<Supplier> UpdateSupplierAsync();

        Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId);
    }
}

﻿using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;

namespace CESCA.API.Services.Interface
{
    public interface ISupplierService
    {
        Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO, CancellationToken ct);

        Task<(IEnumerable<SupplierDTO> suppliers, MetaData metaData)> GetSupplierAsync(SupplierParameters supplierParameters,
            CancellationToken ct);

        Task<SupplierDTO> GetSupplierByIdAsync(Guid supplierId, CancellationToken ct);

        Task<Supplier?> UpdateSupplierAsync(SupplierDTO supplierDTO,CancellationToken ct);

        Task<SupplierDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken ct);
    }
}

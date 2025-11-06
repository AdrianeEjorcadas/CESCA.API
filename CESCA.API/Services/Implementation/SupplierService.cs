using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Supplier;
using CESCA.API.Repositories.Interface;
using CESCA.API.Services.Interface;
using static CESCA.API.Middleware.Exceptions.Exceptions;

namespace CESCA.API.Services.Implementation
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO, CancellationToken ct)
        {
            var supplier = new Supplier
            {
                SupplierName = addSupplierDTO.SupplierName,
                Email  = addSupplierDTO.Email,
                ContactNumber = addSupplierDTO.ContactNumber,
                Address = addSupplierDTO.Address
            };

            var result = await _supplierRepository.AddSupplierAsync(supplier, ct);

            if (result is null)
            {
                throw new SupplierCreationException("Error occured while adding supplier");
            }

            return result;
        }

        public async Task<SupplierDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken ct)
        {
            var result = await _supplierRepository.DeleteSupplierAsync(supplierId, ct);

            if (result is null)
            {
                throw new InvalidOperationException("Error occured while deleting supplier");
            }

            return result;
        }

        public async Task<(IEnumerable<SupplierDTO> suppliers, MetaData metaData)> GetSupplierAsync(SupplierParameters supplierParameters, 
            CancellationToken ct)
        {
            var result = await _supplierRepository.GetSupplierAsync(supplierParameters, ct);

            return (suppliers: result, metaData: result.MetaData);
        }

        public async Task<SupplierDTO> GetSupplierByIdAsync(Guid supplierId, CancellationToken ct)
        {
            var result = await _supplierRepository.GetSupplierByIdAsync(supplierId, ct);

            if (result is null) 
            {
                throw new NotFoundException("Supplier not found");
            }

            return result;
        }

        public async Task<Supplier> UpdateSupplierAsync(UpdateSupplierDTO updateSupplierDTO, CancellationToken ct)
        {
            var supplierToUpdate = new Supplier
            {
                SupplierId = updateSupplierDTO.SupplierId,
                SupplierName = updateSupplierDTO.SupplierName,
                Address = updateSupplierDTO.Address,
                Email = updateSupplierDTO.Email,
                ContactNumber = updateSupplierDTO.ContactNumber,
                UpdatedBy = updateSupplierDTO.UpdatedBy
            };

            var result = await _supplierRepository.UpdateSupplierAsync(supplierToUpdate, ct);

            if (result is null)
            {
                throw new InvalidOperationException("Error on updating supplier");
            }

            return result;
        }

        public async Task<SupplierDTO> ArchivedSupplierAsync(Guid supplierId, CancellationToken ct)
        {
            var result = await _supplierRepository.ArchivedSupplierAsync(supplierId, ct);

            if (result is null)
            {
                throw new InvalidOperationException("Error on archiving or restoring supplier");
            }

            return result;
        }
    }
}



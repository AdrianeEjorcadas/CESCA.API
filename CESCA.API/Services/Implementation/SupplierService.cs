using CESCA.API.Helpers;
using CESCA.API.Helpers.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;
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

        public async Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO)
        {
            var supplier = new Supplier
            {
                SupplierName = addSupplierDTO.SupplierName,
                Email  = addSupplierDTO.Email,
                ContactNumber = addSupplierDTO.ContactNumber,
                Address = addSupplierDTO.Address
            };

            var result = await _supplierRepository.AddSupplierAsync(supplier);

            if (result is null)
            {
                throw new SupplierCreationException("Error occured while adding supplier");
            }

            return result;
        }

        public async Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId)
        {
            var result = await _supplierRepository.DeleteSupplierAsync(supplierId);

            if (result is null)
            {
                throw new InvalidOperationException("Error occured while deleting supplier");
            }

            return result;
        }

        public async Task<(IEnumerable<SupplierOutputDTO> suppliers, MetaData metaData)> GetSupplierAsync(SupplierParameters supplierParameters, 
            CancellationToken cancellationToken = default)
        {
            var result = await _supplierRepository.GetSupplierAsync(supplierParameters, cancellationToken);

            return (suppliers: result, metaData: result.MetaData);
        }

        public async Task<SupplierOutputDTO> GetSupplierByIdAsync(Guid supplierId)
        {
            var result = await _supplierRepository.GetSupplierByIdAsync(supplierId);

            if (result is null) 
            {
                throw new NotFoundException("Supplier not found");
            }

            return result;
        }

        public Task<Supplier> UpdateSupplierAsync()
        {
            throw new NotImplementedException();
        }
    }
}

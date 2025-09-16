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

        public Task<Supplier> DeleteSupplierAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> GetSupplierAsync()
        {
            throw new NotImplementedException();
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

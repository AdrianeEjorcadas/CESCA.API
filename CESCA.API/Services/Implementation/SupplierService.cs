using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Services.Interface;

namespace CESCA.API.Services.Implementation
{
    public class SupplierService : ISupplierService
    {
        public Task<Supplier> AddSupplierAsync(AddSupplierDTO addSupplierDTO)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> DeleteSupplierAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> GetSupplierAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> GetSupplierByIdAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> UpdateSupplierAsync()
        {
            throw new NotImplementedException();
        }
    }
}

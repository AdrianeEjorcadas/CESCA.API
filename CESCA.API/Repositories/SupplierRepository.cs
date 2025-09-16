using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Repositories.Interface;

namespace CESCA.API.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly ApplicationDBContext _context;

        public SupplierRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<Supplier> AddSupplierAsync(Supplier supplier)
        {
            var result = await _context.Suppliers
                .AddAsync(supplier);

            await _context.SaveChangesAsync();

            return supplier;
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

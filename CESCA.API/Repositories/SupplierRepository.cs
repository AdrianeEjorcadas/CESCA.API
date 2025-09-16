using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Supplier>> GetSupplierAsync()
        {
            return await _context.Suppliers
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<SupplierOutputDTO> GetSupplierByIdAsync(Guid supplierId)
        {
            #pragma warning disable CS8603 // Possible null reference return.
            return await _context.Suppliers
                .AsNoTracking()
                .Where(s => s.SupplierId == supplierId)
                .Select(s => new SupplierOutputDTO
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    Email = s.Email ?? "No email address",
                    ContactNumber = s.ContactNumber,
                    Address = s.Address ?? "No Address",
                    IsDeleted = s.IsDeleted
                })
                .FirstOrDefaultAsync();
            #pragma warning restore CS8603 // Possible null reference return.
        }

        public Task<Supplier> UpdateSupplierAsync()
        {
            throw new NotImplementedException();
        }
    }
}

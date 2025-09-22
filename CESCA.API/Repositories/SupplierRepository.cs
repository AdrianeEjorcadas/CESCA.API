using CESCA.API.Data;
using CESCA.API.Models;
using CESCA.API.Models.Dtos;
using CESCA.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

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

        public async Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId)
        {
            var result = await _context.Suppliers
                .FindAsync(supplierId);

            if (result is null)
            {
                return null;
            }

            _context.Suppliers.Remove(result);
            await _context.SaveChangesAsync();

            return new SupplierOutputDTO
            {
                SupplierId = result.SupplierId,
                SupplierName = result.SupplierName,
                Email = result.Email,
                Address = result.Address,
                ContactNumber = result.ContactNumber,
                IsDeleted = result.IsDeleted
            };
        }

        public async Task<IEnumerable<Supplier>> GetSupplierAsync()
        {
            return await _context.Suppliers
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<SupplierOutputDTO?> GetSupplierByIdAsync(Guid supplierId)
        {
            var result = await _context.Suppliers
                .AsNoTracking()
                .Where(s => s.SupplierId == supplierId)
                .Select(s => new SupplierOutputDTO
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    Email = s.Email,
                    ContactNumber = s.ContactNumber,
                    Address = s.Address,
                    IsDeleted = s.IsDeleted
                })
                .FirstOrDefaultAsync();

           return result;
        }

        public Task<Supplier> UpdateSupplierAsync()
        {
            throw new NotImplementedException();
        }
    }
}

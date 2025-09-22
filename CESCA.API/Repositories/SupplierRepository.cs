using CESCA.API.Data;
using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
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


        public async Task<Supplier> AddSupplierAsync(Supplier supplier, CancellationToken cancellationToken = default)
        {
            var result = await _context.Suppliers
                .AddAsync(supplier, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return supplier;
        }

        public async Task<SupplierOutputDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken = default)
        {
            var result = await _context.Suppliers
                .FindAsync(supplierId);

            if (result is null)
            {
                return null;
            }

            _context.Suppliers.Remove(result);
            await _context.SaveChangesAsync(cancellationToken);

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

        public async Task<PagedList<SupplierOutputDTO>> GetSupplierAsync(SupplierParameters supplierParameters, CancellationToken cancellationToken = default)
        {
            var result = await _context.Suppliers
                .AsNoTracking()
                .Skip((supplierParameters.PageNumber - 1) * supplierParameters.PageSize)
                .Take(supplierParameters.PageSize)
                .OrderBy(s => s.SupplierName)
                .Select(s => new SupplierOutputDTO
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    Email = s.Email,
                    ContactNumber = s.ContactNumber,
                    Address = s.Address,
                    IsDeleted = s.IsDeleted
                })
                .ToListAsync(cancellationToken);

            var count = await _context.Suppliers .CountAsync(cancellationToken);

            return PagedList<SupplierOutputDTO>
                .ToPagedList(result, count, supplierParameters.PageNumber, supplierParameters.PageSize);
        }

        public async Task<SupplierOutputDTO?> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken = default)
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
                .FirstOrDefaultAsync(cancellationToken);

           return result;
        }

        public Task<Supplier> UpdateSupplierAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}

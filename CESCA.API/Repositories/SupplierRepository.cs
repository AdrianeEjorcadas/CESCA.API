using CESCA.API.Data;
using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Supplier;
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


        public async Task<Supplier> AddSupplierAsync(Supplier supplier, CancellationToken cancellationToken)
        {
            var result = await _context.Suppliers
                .AddAsync(supplier, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return result.Entity;
        }

        public async Task<SupplierDTO> DeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken)
        {
            var result = await _context.Suppliers
                .FindAsync(supplierId);

            if (result is null)
            {
                return null;
            }

            _context.Suppliers.Remove(result);
            await _context.SaveChangesAsync(cancellationToken);

            return new SupplierDTO
            {
                SupplierId = result.SupplierId,
                SupplierName = result.SupplierName,
                Email = result.Email,
                Address = result.Address,
                ContactNumber = result.ContactNumber,
                IsDeleted = result.IsDeleted
            };
        }

        public async Task<PagedList<SupplierDTO>> GetSupplierAsync(SupplierParameters supplierParameters, CancellationToken cancellationToken)
        {
            var result = await _context.Suppliers
                .AsNoTracking()
                .OrderBy(s => s.SupplierName)
                .Skip((supplierParameters.PageNumber - 1) * supplierParameters.PageSize)
                .Take(supplierParameters.PageSize)
                .Select(s => new SupplierDTO
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    Email = s.Email,
                    ContactNumber = s.ContactNumber,
                    Address = s.Address,
                    IsDeleted = s.IsDeleted
                })
                .ToListAsync(cancellationToken);

            var count = await _context.Suppliers.CountAsync(cancellationToken);

            return PagedList<SupplierDTO>
                .ToPagedList(result, count, supplierParameters.PageNumber, supplierParameters.PageSize);
        }

        public async Task<SupplierDTO?> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken)
        {
            var result = await _context.Suppliers
                .AsNoTracking()
                .Where(s => s.SupplierId == supplierId)
                .Select(s => new SupplierDTO
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

        public async Task<Supplier?> UpdateSupplierAsync(Supplier supplier, CancellationToken cancellationToken)
        {
            var supplierToUpdate = await _context.Suppliers
                .FindAsync(supplier.SupplierId, cancellationToken);

            if (supplierToUpdate is null)
            {
                return supplierToUpdate;
            }

            supplierToUpdate.SupplierName = supplier.SupplierName;
            supplierToUpdate.Email = supplier.Email;
            supplierToUpdate.Address = supplier.Address;
            supplierToUpdate.ContactNumber = supplier.ContactNumber;
            supplierToUpdate.UpdatedBy = supplier.UpdatedBy;

            await _context.SaveChangesAsync();

            return supplierToUpdate;
        }
    }
}

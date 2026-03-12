using AutoMapper;
using AutoMapper.QueryableExtensions;
using CESCA.API.Data;
using CESCA.API.Helpers.Pagination;
using CESCA.API.Helpers.Pagination.Parameters;
using CESCA.API.Models;
using CESCA.API.Models.Dtos.Order;
using CESCA.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using static CESCA.API.Middleware.Exceptions.Exceptions;

namespace CESCA.API.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public OrderRepository(ApplicationDBContext context, IMapper mapper )
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> GetOrderSeq(CancellationToken ct)
        {
            var count = await _context.Orders
                .CountAsync(ct);

            return count.ToString("D5");
        }

        public async Task PlaceOrderAsync(Order order, List<OrderDetails> orderDetails, CancellationToken ct)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync(ct);

            try
            {
                await _context.Orders.AddAsync(order, ct);
                await _context.OrderDetails.AddRangeAsync(orderDetails);

                foreach (var item in orderDetails)
                {
                    var product = await _context.Products.FindAsync(item.ProductId, ct);

                    if (product is null)
                    {
                        throw new ProductNotFoundException("Product not found");
                    }
                    else if (product.StockQuantity < item.Quantity)
                    {
                        throw new InsufficientProductException($"Insufficient stock for product");
                    }

                    product!.StockQuantity -= item.Quantity;
                    _context.Products.Update(product);
                }
            }
            catch
            {
                await transaction.RollbackAsync(ct);
                throw;
            }

            await _context.SaveChangesAsync(ct);
            await transaction.CommitAsync(ct);
        }

        public async Task<PagedList<OrderResponseDTO>> GetOrdersAsync(OrderParameters orderParameters, CancellationToken ct)
        {
            var query = _context.Orders.AsQueryable();
            var count = 0;

            //Search Term / Process by
            if (!string.IsNullOrEmpty(orderParameters.SearchTerm))
            {
                query = query.Where(o => o.ProcessBy.Contains(orderParameters.SearchTerm));
            }

            // Discounted Items
            if (orderParameters.DiscountApplied)
            {
                query = query.Where(o => o.DiscountApplied == orderParameters.DiscountApplied);
            }

            // Order Date
            if (orderParameters.OrderFrom.HasValue && orderParameters.OrderTo.HasValue)
            {
                query = query.Where(o => o.OrderDate >= orderParameters.OrderFrom
                                        && o.OrderDate <= orderParameters.OrderTo); 
            }

            var result = await query
                .AsNoTracking()
                .OrderByDescending(o => o.InvoiceNumber)
                .Skip((orderParameters.PageNumber - 1) * orderParameters.PageSize)
                .Take(orderParameters.PageSize)
                .ProjectTo<OrderResponseDTO>(_mapper.ConfigurationProvider) // Map from Orders to OrderResponseDTO
                .ToListAsync(ct);

            // count items 
            if (orderParameters.OrderFrom.HasValue && (orderParameters.DiscountApplied is true))
            {
                //count = result.Count();
                count = await _context.Orders
                    .AsNoTracking()
                    .Where(o => o.DiscountApplied &&
                        (o.OrderDate >= orderParameters.OrderFrom && o.OrderDate <= orderParameters.OrderTo))
                    .CountAsync(ct);
            } 
            else if (orderParameters.OrderFrom.HasValue)
            {
                count = await _context.Orders
                    .AsNoTracking()
                    .Where(o => o.OrderDate >= orderParameters.OrderFrom 
                                && o.OrderDate <= orderParameters.OrderTo)
                    .CountAsync(ct);
            } 
            else if (orderParameters.DiscountApplied)
            {
                count = await _context.Orders
                    .AsNoTracking()
                    .Where(o => o.DiscountApplied)
                    .CountAsync(ct);
            }
            else
            {
                count = await _context.Orders
                    .AsNoTracking()
                    .CountAsync(ct);
            }
                //else
                //{
                //    count = await _context.Orders
                //        .Where(s => !s.DiscountApplied)
                //        .CountAsync(ct);
                //}

                return PagedList<OrderResponseDTO>
                    .ToPagedList(result, count, orderParameters.PageNumber, orderParameters.PageSize);
        }
    }
}

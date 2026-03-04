using CESCA.API.Data;
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
        readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context)
        {
            _context = context;
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
    }
}

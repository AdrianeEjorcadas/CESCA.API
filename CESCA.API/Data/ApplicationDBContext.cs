using CESCA.API.Models;
using CESCA.API.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CESCA.API.Data
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser, Role, Guid>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        public DbSet<Supplier> Suppliers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.SupplierId)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Supplier>().HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<Product>().HasQueryFilter(e => !e.IsDeleted);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            CreatedAt();
            UpdatedAt();
            DeletedAt();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void CreatedAt()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added);

            var userForNow = Guid.NewGuid();
            DateTime now = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                if (entry.Entity is Supplier supplier)
                {
                    supplier.SupplierId = Guid.NewGuid();
                    supplier.CreatedBy = userForNow;
                    supplier.CreatedAt = now;
                    supplier.IsArchived = false;
                }
                else if (entry.Entity is Product product)
                {
                    product.ProductId = Guid.NewGuid();
                    product.CreatedBy = userForNow;
                    product.CreatedAt = now;
                }
                else if (entry.Entity is ApplicationUser appUser)
                {
                    appUser.CreatedBy = userForNow;
                    appUser.CreatedAt = now;
                }
            }
        }

        private void UpdatedAt()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Modified);

            var userForNow = Guid.NewGuid();
            DateTime now = DateTime.UtcNow;

            foreach (var entry in entries) 
            {
                if (entry.Entity is Supplier supplier)
                {
                    //supplier.UpdatedBy = userForNow;
                    supplier.UpdatedAt = now;
                } else if (entry.Entity is Product product)
                {
                    product.UpdatedBy = userForNow;
                    product.UpdatedAt = now;
                }
            }
        }

        private void DeletedAt()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);

            var userForNow = Guid.NewGuid();
            DateTime now = DateTime.UtcNow;

            foreach(var entry in entries)
            {
                if(entry.Entity is Supplier supplier)
                {
                    entry.State = EntityState.Modified;
                    supplier.IsDeleted = true;
                    supplier.DeletedBy = userForNow;
                    supplier.DeletedAt = now;
                } else if (entry.Entity is Product product)
                {
                    entry.State = EntityState.Modified;
                    product.IsDeleted = true;
                    product.DeletedBy = userForNow;
                    product.DeletedAt = now;
                }
            }
        }
    }
}

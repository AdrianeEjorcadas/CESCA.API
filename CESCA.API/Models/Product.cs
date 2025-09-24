using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models
{
    public class Product
    {
        [Key]
        [Required]
        public Guid ProductId { get; set; }                  // Unique identifier

        [Required(ErrorMessage = "Product Name is required")]
        public string ProductName { get; set; }              // Display name

        
        public string? GenericName { get; set; }              // For medicines

        [Required(ErrorMessage = "Category is required")]
        public string Category { get; set; }                 // e.g., Medicine, Personal Care

        public string? SubCategory { get; set; }              // e.g., Antibiotic, Shampoo

        public string? Brand { get; set; }                    // Brand Name

        [Required(ErrorMessage = "Form is required")]
        public string Form { get; set; }                     // e.g., Tablet, Liquid, Pack

        [Required(ErrorMessage = "Strength Or Size is required")]
        public string StrengthOrSize { get; set; }           // e.g., 500mg, 250ml

        public string? UnitSize { get; set; }                 // e.g., 10 tablets, 1 bottle

        [Required(ErrorMessage = "Price is required")]
        public decimal Price { get; set; }                   // Retail price

        [Required(ErrorMessage = "Stock Quantity is required")]
        public int StockQuantity { get; set; }               // Current inventory

        [Required(ErrorMessage = "Reorder Level is required")]
        public int ReorderLevel { get; set; }                // Threshold for restocking

        [Required(ErrorMessage = "IsPerishable is required")]
        public bool IsPerishable { get; set; }               // Flag for expiration-sensitive items

        [Required(ErrorMessage = "Expiration Date details is required")]
        public DateTimeOffset? ExpirationDate { get; set; }

        [Required(ErrorMessage = "Prescription details is required")]
        public bool IsPrescriptionOnly { get; set; }         // For regulated meds

        [Required(ErrorMessage = "Bar Code details is required")]
        public string Barcode { get; set; }                  // UPC or SKU

        [Required(ErrorMessage = "Supplier details is required")]
        public Guid SupplierId { get; set; }                 // FK to Suppliers table

        public Supplier Supplier { get; set; }               // navigation property


        // Location metadata
        public string? ShelfLocation { get; set; }            // e.g., "A3-Top"
        public string? RackNumber { get; set; }               // e.g., "Rack-12"
        public string? Aisle { get; set; }                    // e.g., "Health-2"


        //archiving 
        public bool IsArchived { get; set; } = false;


        // Audit fields
        public Guid CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTimeOffset? DeletedAt { get; set; }
        public Guid? DeletedBy { get; set; }

    }
}

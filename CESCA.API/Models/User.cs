using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models
{
    public class User
    {
        [Key]
        [Required]
        public Guid UserId { get; set; }

        [StringLength(100)]
        [Required]
        public string Auth0Id { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [StringLength(10)]
        [Required]
        public string Role { get; set; }

        // Audit fields
        public Guid CreatedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
        public Guid? UpdatedBy { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTimeOffset? DeletedAt { get; set; }
        public Guid? DeletedBy { get; set; }
    }
}

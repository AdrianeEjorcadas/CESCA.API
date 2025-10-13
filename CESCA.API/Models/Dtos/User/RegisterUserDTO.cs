using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos.User
{
    public class RegisterUserDTO
    {

        [EmailAddress(ErrorMessage = "Invalid email address!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "First name is required!")]
        public string FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Role { get; set; }

    }
}


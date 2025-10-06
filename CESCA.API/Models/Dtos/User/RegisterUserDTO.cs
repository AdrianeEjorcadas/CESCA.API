using System.ComponentModel.DataAnnotations;

namespace CESCA.API.Models.Dtos.User
{
    public class RegisterUserDTO
    {
        [Required(ErrorMessage = "First name is required!")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required(ErrorMessage = "Username is required!")]
        public string UserName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address!")]
        public string Email { get; set; }
        [Required(ErrorMessage ="Password is required!")]
        public string Password { get; set; }
    }
}

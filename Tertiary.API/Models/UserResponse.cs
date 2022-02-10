namespace Tertiary.API.Models
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "STUDENT";
        public string token { get; set; }
    }
}

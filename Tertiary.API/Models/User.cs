using System.Text.Json.Serialization;

namespace Tertiary.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "STUDENT";
        [JsonIgnore]
        public byte[] HashedPassword { get; set; } = new byte[32];
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; } = new byte[32];
        [JsonIgnore]
        public List<DeviceRequest> Requests { get; set; }
    }
}

using Tertiary.API.Models;

namespace Tertiary.API.Services
{
    public interface IJwtService
    {
        public string CreateToken(User user, IConfiguration configuration);

        public bool VerifyPassword(string password, byte[] hashedPassword, byte[] passwordSalt);

        public void CreateHashedPassword(string password, out byte[] hashedPassword, out byte[] passwordSalt);
    }
}

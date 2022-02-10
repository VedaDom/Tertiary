using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tertiary.API.Database;
using Tertiary.API.Models;
using Tertiary.API.Services;

namespace Tertiary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext db;
        private readonly IConfiguration configuration;

        public readonly IJwtService JwtService;

        public AuthController(DatabaseContext db, IConfiguration configuration, IJwtService jwtService)
        {
            this.db = db;
            this.configuration = configuration;
            this.JwtService = jwtService;
        }

        [HttpPost("Signup")]
        public async Task<ActionResult<string>> Signup(SignupDto data)
        {
            if (
                string.IsNullOrEmpty(data.Firstname) ||
                string.IsNullOrEmpty(data.Lastname) ||
                string.IsNullOrEmpty(data.Email) || 
                string.IsNullOrEmpty(data.Password)
            )
            {
                return BadRequest("Invalid data.");
            }
            JwtService.CreateHashedPassword(data.Password, out byte[] hashedPassword, out byte[] passwordSalt);
            User user = new()
            {
                Firstname = data.Firstname,
                Lastname = data.Lastname,
                Email = data.Email,
                HashedPassword = hashedPassword,
                PasswordSalt = passwordSalt
            };
            this.db.Users.Add(user);
            await this.db.SaveChangesAsync();
            UserResponse response = new()
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Role = user.Role,
                token = JwtService.CreateToken(user, configuration)
            };
            Response.Cookies.Append("jwt", response.token, new CookieOptions { HttpOnly = true });
            return Ok(response);
        }

        [HttpPost("Signin")]
        public async Task<ActionResult<string>> Signin(SigninDto data)
        {
            if (string.IsNullOrEmpty(data.Email) || string.IsNullOrEmpty(data.Password)) return BadRequest("Invalid data.");
            var user = await this.db.Users.Where(user => user.Email == data.Email).FirstOrDefaultAsync();
            if (user == null) return BadRequest("User not found.");
            if (!JwtService.VerifyPassword(data.Password, user.HashedPassword, user.PasswordSalt)) return BadRequest("Wrong password");
            UserResponse response = new()
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Role = user.Role,
                token = JwtService.CreateToken(user, configuration)
            };
            Response.Cookies.Append("jwt", response.token, new CookieOptions { HttpOnly = true });
            return Ok(response);
        }

        [HttpPost("Logout")]
        public ActionResult<string> Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "Logged out!"
            });
        }
    }
}

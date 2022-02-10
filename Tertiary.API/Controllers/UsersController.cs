using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tertiary.API.Database;
using Tertiary.API.Models;

namespace Tertiary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext db;

        public UsersController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await this.db.Users.ToListAsync());
        }
    }
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tertiary.API.Database;
using Tertiary.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tertiary.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DatabaseContext db;

        public DeviceController(DatabaseContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "STUDENT,ADMIN")]
        public async Task<ActionResult<IEnumerable<Device>>> Get()
        {
            return Ok(await this.db.Devices.ToListAsync());
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        public async Task<ActionResult<Device>> Get(int id)
        {
            var device = await this.db.Devices.FindAsync(id);
            if (device == null) { return BadRequest("Device not found"); }
            return Ok(device);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        public async Task<ActionResult<Device>> Post(DeviceDto device)
        {
            this.db.Devices.Add(new() {
                Name = device.Name,
                Type = device.Type,
                Brand = device.Brand,
                Image = device.Image,
                Quantity = device.Quantity,
                Description = device.Description,
            });
            await this.db.SaveChangesAsync();
            var devices = await this.db.Devices.ToListAsync();
            return Ok(devices.Last());
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        public async Task<ActionResult<Device>> Put(Device device)
        {
            var data = await this.db.Devices.FindAsync(device.Id);
            if (data == null) { return BadRequest("Device not found"); }
            data.Name = string.IsNullOrEmpty(device.Name) ? device.Name : data.Name;
            data.Brand = string.IsNullOrEmpty(device.Brand) ? device.Brand : data.Brand;
            data.Type = string.IsNullOrEmpty(device.Type) ? device.Type : data.Type;
            data.Quantity = device.Quantity ?? data.Quantity;
            await this.db.SaveChangesAsync();
            return Ok(await this.db.Devices.ToListAsync());
        }

        [HttpPost("Request")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "STUDENT")]
        public async Task<ActionResult<string>> DeviceRequest(DeviceRequestDto data)
        {
            var user = await this.db.Users.FindAsync(data.UserId);
            if (user == null) { return BadRequest("User not found"); }

            var deviceRequest = await this.db.DeviceRequests.Where(item => item.User.Id == data.UserId).FirstOrDefaultAsync();
            if (deviceRequest != null) { return BadRequest("You are not allowed to request more than one device."); }

            var device = await this.db.Devices.FindAsync(data.DeviceId);
            if (device == null) { return BadRequest("Device not found"); }

            DeviceRequest request = new() {
                DeviceId = data.DeviceId,
                RequestedAt = DateTime.Now,
                User = user,
                Device = device,
            };
            device.Quantity -= 1;
            this.db.DeviceRequests.Add(request);
            this.db.Devices.Update(device);
            await this.db.SaveChangesAsync();
            return Ok("Your request has been submited.");
        }

        [HttpGet("Request")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "STUDENT")]
        public async Task<ActionResult<string>> DeviceRequest(int UserId)
        {
            var user = await this.db.Users.FindAsync(UserId);
            if (user == null) { return BadRequest("User not found"); }

            var deviceRequest = this.db.DeviceRequests.Where(item => item.User.Id == user.Id).Include(item => item.Device).FirstOrDefault();
            if (deviceRequest == null) { return Ok("No data found"); }
            return Ok(deviceRequest);
        }

        [HttpGet("Requests")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "ADMIN")]
        public async Task<ActionResult<string>> DeviceRequests()
        {
            var deviceRequest = await this.db.DeviceRequests.Include(item => item.User).Include(item => item.Device).ToListAsync();
            if (deviceRequest == null) { return Ok("No data found"); }
            return Ok(deviceRequest);
        }
    }
}

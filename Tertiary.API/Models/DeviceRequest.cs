namespace Tertiary.API.Models
{
    public class DeviceRequest
    {
        public int Id { get; set; }
        public DateTime RequestedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int DeviceId { get; set; }
        public virtual Device Device { get; set; }
    }
}

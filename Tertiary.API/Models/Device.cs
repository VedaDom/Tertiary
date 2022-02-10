using System.Text.Json.Serialization;

namespace Tertiary.API.Models
{
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Quantity { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public virtual ICollection<DeviceRequest> DeviceRequests { get; set; }
    }
}

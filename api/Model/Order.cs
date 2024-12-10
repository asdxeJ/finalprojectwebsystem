using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Order
    {
        public int OrderId { get; set; }
        public string AppUserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }

        // Navigation Properties
        public AppUser AppUser { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
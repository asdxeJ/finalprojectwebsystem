using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Order
    {
        public int OrderId { get; set; }  // Primary Key
        public string AppUserId { get; set; }  // Foreign Key to User
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "pending";

        // Navigation Properties
        public AppUser AppUser { get; set; }  // Navigation property to the User entity
        public ICollection<OrderItem> OrderItems { get; set; }  // Navigation property to the related Order Items

    }
}
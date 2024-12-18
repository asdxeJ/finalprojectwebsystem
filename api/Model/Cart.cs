using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Cart
    {
        public string AppUserId { get; set; }
        public int MenuId { get; set; }
        public int Quantity { get; set; }

        // navigation property
        public Menu Menu { get; set; }
        public AppUser AppUser { get; set; }

    }
}
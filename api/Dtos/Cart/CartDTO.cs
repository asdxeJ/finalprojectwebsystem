using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Menu;

namespace api.Dtos.Cart
{
    public class CartDTO
    {
        public int Id { get; set; }
        [Required]
        public int? CustomerId { get; set; }
        [Required]
        public int? MenuId { get; set; }
        [Required]
        public int Quantity { get; set; }
        public MenuDTO MenuItem { get; set; }
    }
}
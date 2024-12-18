using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Cart
{
  public class AddToCartDTO
  {
    public int MenuId { get; set; }
    [Required]
    [Range(1, 20)]
    public int Quantity { get; set; }
  }
}
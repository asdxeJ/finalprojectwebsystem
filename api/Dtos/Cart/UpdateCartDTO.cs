using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Cart
{
  public class UpdateCartQuantityDTO
  {
    public int MenuId { get; set; }
    public int Quantity { get; set; }
  }

}
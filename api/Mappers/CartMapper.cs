using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cart;
using api.Model;

namespace api.Mappers
{
    public static class CartMapper
    {
        public static CartDTO ToCartDTO(this Cart cartModel)
        {
            return new CartDTO
            {
                Id = cartModel.Id,
                CustomerId = cartModel.CustomerId,
                MenuId = cartModel.MenuId,
                Quantity = cartModel.Quantity,
                MenuItem = cartModel.Menu?.ToMenuDTO() // Map Menu to MenuDTO
            };
        }

        public static Cart ToCreateCartDTO(this CreateCartDTO cartCreateDTO)
        {
            return new Cart
            {
                CustomerId = cartCreateDTO.CustomerId,
                MenuId = cartCreateDTO.MenuId,
                Quantity = cartCreateDTO.Quantity,
            };
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cart;
using api.Model;

namespace api.Interfaces
{
    public interface ICartRepository
    {
        // many to many 
        Task<List<CartItemDTO>> GetUserCartAsync(AppUser user);
        Task<List<CartItemDTO>> GetUserCartByIdAsync(string appUserId);
        Task<Cart> CreateAsync(Cart cart);
        Task<Cart?> FindCartItemAsync(string appUserId, int menuId);
        Task UpdateCartItemAsync(Cart cart);
        Task<Cart> DeleteCartItemAsync(AppUser appUser, int menuId);
        Task<Cart> GetCartItemAsync(string userId, int menuId);
        Task UpdateAsync(Cart cartItem);
        Task ClearCartAsync(string appUserId);

    }
}
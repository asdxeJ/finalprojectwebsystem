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
        Task<List<Cart>> GetAllAsync();
        Task<Cart> CreateAsync(Cart cartModel);
        Task<Cart?> GetByIdAsync(int id);
        Task<Cart?> DeleteAsync(int id);
        Task<Cart?> UpdateAsync(int id, UpdateCartDTO cartDTO);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Menu;
using api.Helpers;
using api.Model;

namespace api.Interfaces
{
    // repository is for database calls
    public interface IMenuRepository
    {
        // interfaces allows us to plug in this code to other placees and allows us to abstract our code
        Task<List<Menu>> GetAllAsync(QueryObject query); // pass in the QueryObject for filtering
        Task<Menu?> GetByIdAsync(int id);
        Task<Menu> CreateAsync(Menu menuModel);
        // return the update menu request dto
        Task<Menu?> UpdateAsync(int id, UpdateMenuDTO menuDTO);
        Task<Menu?> DeleteAsync(int id);
    }
}
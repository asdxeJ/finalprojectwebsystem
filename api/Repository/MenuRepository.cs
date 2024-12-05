using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Menu;
using api.Helpers;
using api.Interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MenuRepository : IMenuRepository // plugin the IMenuRepository
    {
        // A constructor is a special method in a class that is automatically called when an instance of the class is created.
        // It is used to initialize the class's properties or perform setup tasks.
        // What is Happening Here?
        // The MenuRepository class has a private field _context of type ApplicationDBContext.
        // The constructor accepts a parameter context of type ApplicationDBContext.
        // This context parameter is assigned to the _context field to make the database context available throughout the class.
        private readonly ApplicationDBContext _context; // when is initialized it stores it here

        // Dependency Injection (DI) is a design pattern in which a class does not create its own dependencies but instead receives them from an external source. In your case, the MenuRepository class does not create its own instance of ApplicationDBContext; instead, the dependency (the ApplicationDBContext) is "injected" into the class.
        public MenuRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Menu> CreateAsync(Menu menuModel)
        {
            await _context.Menus.AddAsync(menuModel);
            await _context.SaveChangesAsync();
            return menuModel;
        }

        public async Task<Menu?> DeleteAsync(int id)
        {
            var menuModel = await _context.Menus.FirstOrDefaultAsync(x => x.Id == id);

            if (menuModel == null)
            {
                return null;
            }

            _context.Menus.Remove(menuModel);
            await _context.SaveChangesAsync();
            return menuModel;
        }

        public async Task<List<Menu>> GetAllAsync(QueryObject query)
        {
            //AsQueryable:
            //Keeps the query flexible: Allows you to dynamically build a query by adding filters(Where) based on conditions.
            // Ensures efficiency: Makes sure that the query is executed directly on the database(via Entity Framework), so only the needed data is fetched.
            // Prepares for deferred execution: The query is not run immediately;  instead, it’s executed only when the ToListAsync() method is called.
            var menus = _context.Menus.AsQueryable();

            if (!string.IsNullOrEmpty(query.Name))
            {
                // Where is just filtering
                // Operations like filtering (Where) or sorting are done in the database instead of loading all data into memory.
                // Contains is a LINQ method that checks whether a string contains a specified substring.
                menus = menus.Where(s => s.Name.Contains(query.Name));
            }

            if (!string.IsNullOrEmpty(query.Category))
            {
                menus = menus.Where(s => s.Category.Contains(query.Category));
            }

            if (!string.IsNullOrEmpty(query.SortBy))
            {
                // Compares the SortBy value to the string "Name".
                // StringComparison.OrdinalIgnoreCase: Ensures the comparison is case-insensitive
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    menus = query.IsDecsending ? menus.OrderByDescending(s => s.Name) : menus.OrderBy(s => s.Name);
                }
            }

            // Skip(skipNumber): Skips the records from the previous pages.
            // Take(PageSize): Fetches the number of records defined by the page size.
            // If PageNumber = 2 and PageSize = 10, then:
            // skipNumber = (2 - 1) * 10 = 10 
            // This skips the first 10 records.
            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await menus.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Menu?> GetByIdAsync(int id)
        {
            return await _context.Menus.FindAsync(id);
        }

        public async Task<Menu?> UpdateAsync(int id, UpdateMenuDTO menuDTO)
        {
            var existingMenu = await _context.Menus.FirstOrDefaultAsync(x => x.Id == id);

            if (existingMenu == null)
            {
                return null;
            }

            existingMenu.Name = menuDTO.Name;
            existingMenu.Description = menuDTO.Description;
            existingMenu.Category = menuDTO.Category;
            existingMenu.Description = menuDTO.Description;
            existingMenu.ImageUrl = menuDTO.ImageUrl;

            await _context.SaveChangesAsync();
            return existingMenu;
        }
    }
}
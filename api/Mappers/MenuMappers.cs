using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Menu;
using api.Model;

namespace api.Mappers
{
    public static class MenuMappers
    {
        // return the MenuDTO
        public static MenuDTO ToMenuDTO(this Menu menuModel)
        {
            return new MenuDTO
            {
                Id = menuModel.Id,
                Name = menuModel.Name,
                Category = menuModel.Category,
                Price = menuModel.Price,
                Description = menuModel.Description,
                ImageUrl = menuModel.ImageUrl
            };
        }

        public static Menu ToMenuFromCreateDTO(this CreateMenuDTO menuCreateDTO)
        {
            return new Menu
            {
                Name = menuCreateDTO.Name,
                Category = menuCreateDTO.Category,
                Price = menuCreateDTO.Price,
                Description = menuCreateDTO.Description,
                // ImageUrl will be set in the controller after the file is uploaded
            };
        }
    }
}
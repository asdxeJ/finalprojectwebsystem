using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Menu;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api")]
    [ApiController]
    public class MenuController : ControllerBase // provides a lightweight and easy-to-use foundation for creating APIs, handling HTTP requests and responses.
    {
        // This declares a private, read-only field to store the database context.
        private readonly ApplicationDBContext _context;
        private readonly IMenuRepository _menuRepo;

        // Constructor for the MenuController class
        // Bring in the IMenuRepository
        public MenuController(ApplicationDBContext context, IMenuRepository menuRepo)
        {
            _menuRepo = menuRepo;
            // Assigns the injected database context (passed as a parameter) to the private field.
            _context = context;
        }

        [HttpGet]
        // IActionResult allows your method to return any kind of HTTP response. provides you with return Ok NotFound etc.
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) // pass the QueryObject here as parameter
        {
            // deferred execution query isn't run right away it waits until data is actually needed use ToList to execute query immediately
            // var menus = await _context.Menus.ToListAsync();

            var menus = await _menuRepo.GetAllAsync(query); // use the query object here
            var menuDTO = menus.Select(s => s.ToMenuDTO()); // .Select is just like a mapper a dotnet version of map returns a immutable array or list of ToMenuDTO 

            return Ok(menus);
        }

        // async/await explanation
        // addded int for url constraints/route constraints makes sure that id is an int when passed in
        [HttpGet("{id:int}")]
        // Task is just a return type that gives us the return type in the form of a task
        // async/await functions = speed, 
        // async does not actually do anything under the hood its just there devs to spot asynchronous functions for easier debugging
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            // note to put only await to codes that goes outside the system when you add await on a piece of code dotnet will add a co-routine meaning you will get the code return to you in a form of a yield it will allow the code to interupt any other process thats going on and quickly return then continues to the next piece of code.
            var menu = await _menuRepo.GetByIdAsync(id);

            if (menu == null)
            {
                return NotFound();
            }

            // IActionResult is returned here
            // IActionResult needs to be wrapped in a task because when the code below returns, something has to be there it may not have got something from the database but compiler still needs a value there to hold while it runs other stuff.
            return Ok(menu.ToMenuDTO());
        }

        // [HttpPost]
        // // FromBody because the data will be saved as json file
        // public async Task<IActionResult> Post([FromBody] CreateMenuDTO menuDTO)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);

        //     var menuModel = menuDTO.ToMenuFromCreateDTO();
        //     await _menuRepo.CreateAsync(menuModel);

        //     return CreatedAtAction(nameof(GetById), new { id = menuModel.Id }, menuModel.ToMenuDTO());
        // }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] CreateMenuDTO menuDTO) // Change FromBody to FromForm
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Upload the file
            var uploadFileHelper = new UploadFile();
            string filePath = uploadFileHelper.Upload(menuDTO.Image);

            if (filePath.StartsWith("Extension is not valid") || filePath == "Maximum size is 5mb")
            {
                return BadRequest(filePath); // Return error message
            }

            var menuModel = menuDTO.ToMenuFromCreateDTO();
            menuModel.ImageUrl = filePath; // Set the image path

            await _menuRepo.CreateAsync(menuModel);

            return CreatedAtAction(nameof(GetById), new { id = menuModel.Id }, menuModel.ToMenuDTO());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMenuDTO updateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var menuModel = await _menuRepo.UpdateAsync(id, updateDTO);

            if (menuModel == null)
            {
                return NotFound();
            }

            return Ok(menuModel.ToMenuDTO());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var menuModel = await _menuRepo.DeleteAsync(id);

            if (menuModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
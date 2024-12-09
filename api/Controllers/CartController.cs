using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cart;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMenuRepository _menuRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICartRepository _cartRepo;
        public CartController(UserManager<AppUser> userManager, IMenuRepository menuRepo, ICartRepository cartRepo)
        {
            _userManager = userManager;
            _menuRepo = menuRepo;
            _cartRepo = cartRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserCart()
        {
            // pull out all records that are associated with that is logged in with the data that we got from the claims
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            var userCart = await _cartRepo.GetUserCartAsync(appUser);

            return Ok(userCart); // This will now include Quantity
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDTO addToCartDTO)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            var menu = await _menuRepo.GetByIdAsync(addToCartDTO.MenuId);
            if (menu == null)
                return NotFound("Menu item not found.");

            // check if menu item exists in the user's cart
            var existingCartItem = await _cartRepo.FindCartItemAsync(appUser.Id, addToCartDTO.MenuId);

            if (existingCartItem != null)
            {
                // update the quantity
                existingCartItem.Quantity += addToCartDTO.Quantity;
                await _cartRepo.UpdateCartItemAsync(existingCartItem);
            }
            else
            {
                // create a new cart object
                var cartModel = new Cart
                {
                    MenuId = menu.Id,
                    AppUserId = appUser.Id,
                    Quantity = addToCartDTO.Quantity,
                };

                await _cartRepo.CreateAsync(cartModel);
            }

            return Ok(new { success = true, message = "Item added to cart successfully." });
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteCartItem(int menuId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var userCart = await _cartRepo.GetUserCartAsync(appUser);

            // dont use await because its not going in to the database
            var filteredCart = userCart.Where(m => menuId == m.MenuId).ToList();

            if (filteredCart.Count() == 1)
            {
                await _cartRepo.DeleteCartItemAsync(appUser, menuId);
            }
            else
            {
                return BadRequest("Menu item is not your cart");
            }

            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateCartQuantity([FromBody] UpdateCartQuantityDTO updateCartQuantityDTO)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            // find the cart item based on the user and menu item
            var cartItem = await _cartRepo.GetCartItemAsync(appUser.Id, updateCartQuantityDTO.MenuId);

            if (cartItem == null)
                return NotFound("Cart item not found.");

            // update the quantity
            cartItem.Quantity = updateCartQuantityDTO.Quantity;

            await _cartRepo.UpdateAsync(cartItem);

            return Ok();
        }



        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetById([FromRoute] int id)
        // {
        //     var cart = await _cartRepo.GetByIdAsync(id);

        //     if (cart == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(cart);
        // }

        // [HttpPost]
        // public async Task<IActionResult> Post([FromBody] CreateCartDTO cartDTO)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);

        //     var cartModel = cartDTO.ToCreateCartDTO();
        //     await _cartRepo.CreateAsync(cartModel);

        //     return CreatedAtAction(nameof(GetById), new { id = cartModel }, cartModel.ToCartDTO());

        // }

        // [HttpDelete]
        // [Route("{id:int}")]
        // public async Task<IActionResult> DeleteById([FromRoute] int id)
        // {
        //     var cartModel = await _cartRepo.DeleteAsync(id);

        //     if (cartModel == null)
        //         return NotFound();

        //     return NoContent();
        // }

        // [HttpPut]
        // [Route("{id:int}")]
        // public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCartDTO updateDTO)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState);

        //     var cartModel = await _cartRepo.UpdateAsync(id, updateDTO);

        //     if (cartModel == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(cartModel.ToCartDTO());
        // }
    }
}
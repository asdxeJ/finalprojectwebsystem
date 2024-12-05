using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cart;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepo;
        public CartController(ICartRepository cartRepos)
        {
            _cartRepo = cartRepos;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cart = await _cartRepo.GetAllAsync();
            return Ok(cart);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var cart = await _cartRepo.GetByIdAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateCartDTO cartDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cartModel = cartDTO.ToCreateCartDTO();
            await _cartRepo.CreateAsync(cartModel);

            return CreatedAtAction(nameof(GetById), new { id = cartModel }, cartModel.ToCartDTO());

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var cartModel = await _cartRepo.DeleteAsync(id);

            if (cartModel == null)
                return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCartDTO updateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cartModel = await _cartRepo.UpdateAsync(id, updateDTO);

            if (cartModel == null)
            {
                return NotFound();
            }

            return Ok(cartModel.ToCartDTO());
        }
    }
}
using api.Dtos.Order;
using api.Extensions;
using api.Interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICartRepository _cartRepository;

        public OrderController(IOrderRepository orderRepository, UserManager<AppUser> userManager, ICartRepository cartRepository)
        {
            _orderRepository = orderRepository;
            _userManager = userManager;
            _cartRepository = cartRepository;
        }

        // Get all orders for a logged-in user
        [HttpGet]
        public async Task<IActionResult> GetUserOrders()
        {
            var userName = User.GetUsername();

            if (string.IsNullOrEmpty(userName))
                return Unauthorized("User not found.");

            var appUser = await _userManager.FindByNameAsync(userName);
            if (appUser == null)
                return Unauthorized("User not found.");

            var orders = await _orderRepository.GetUserOrdersAsync(appUser.Id);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> PostUserOrders()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            // retrieve user cart
            var userCart = await _cartRepository.GetUserCartAsync(appUser);
            if (userCart == null || !userCart.Any())
                return BadRequest("Cart is empty. Cannot create an order.");

            // Create a new Order object
            var newOrder = new Order
            {
                AppUserId = appUser.Id,
                OrderDate = DateTime.UtcNow,
                TotalAmount = userCart.Sum(item => item.Quantity * item.Price),
                OrderItems = userCart.Select(cartItem => new OrderItem
                {
                    MenuId = cartItem.MenuId,
                    Quantity = cartItem.Quantity,
                    Price = cartItem.Price
                }).ToList(),
                Status = "Pending" // Default status
            };

            await _orderRepository.CreateOrderAsync(newOrder);

            await _cartRepository.ClearCartAsync(appUser.Id);

            return Ok(new { success = true, message = "Order created successfully.", orderId = newOrder.OrderId });
        }

    }
}

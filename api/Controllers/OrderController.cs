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

            var orders = await _orderRepository.GetUserOrdersAsync(userName);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDTO orderDTO)
        {
            var userName = User.GetUsername();

            if (string.IsNullOrEmpty(userName))
                return Unauthorized("User not found.");

            var appUser = await _userManager.FindByNameAsync(userName);
            if (appUser == null)
                return Unauthorized("User not found.");

            // Fetch the user's cart items
            var userCart = await _cartRepository.GetUserCartAsync(appUser);
            if (userCart == null || !userCart.Any())
                return BadRequest("No items in cart to create an order.");

            var orderItems = new List<OrderItem>();

            foreach (var cartItemDTO in userCart)
            {
                // Create the order item directly from the CartItemDTO
                var orderItem = new OrderItem
                {
                    MenuId = cartItemDTO.MenuId,
                    Quantity = cartItemDTO.Quantity,
                    Price = cartItemDTO.Price  // Price is now directly available in CartItemDTO
                };

                orderItems.Add(orderItem);
            }

            // Create the order and set the total amount
            var order = new Order
            {
                AppUserId = userName,
                OrderDate = DateTime.UtcNow,
                TotalAmount = orderItems.Sum(oi => oi.Quantity * oi.Price),  // Calculate total from order items
                OrderItems = orderItems
            };

            // Save the order to the database
            var createdOrder = await _orderRepository.CreateOrderAsync(order);

            // Optionally, clear the cart after the order is placed
            // await _cartRepository.ClearCartAsync(appUser);

            return Ok(createdOrder);
        }

    }
}

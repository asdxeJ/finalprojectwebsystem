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

        // Get all orders
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();

            if (orders == null || !orders.Any())
                return NotFound("No orders found.");

            return Ok(orders);
        }

        [HttpGet("user")]
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

        [HttpPut("{orderId}")]
        public async Task<IActionResult> UpdateOrder(int orderId, [FromBody] UpdateOrderDTO updateOrderDTO)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null || order.AppUserId != appUser.Id)
                return NotFound("Order not found.");

            order.Status = updateOrderDTO.Status ?? order.Status;

            await _orderRepository.UpdateOrderAsync(order);

            return Ok(new { success = true, message = "Order updated successfully." });
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return Unauthorized("User not found.");

            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null || order.AppUserId != appUser.Id)
                return NotFound("Order not found.");

            await _orderRepository.DeleteOrderAsync(order);

            return Ok(new { success = true, message = "Order deleted successfully." });
        }

        [HttpDelete("admin/delete/{orderId}")]
        public async Task<IActionResult> AdminDeleteOrder(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null)
                return NotFound("Order not found.");

            await _orderRepository.DeleteOrderAsync(order);

            return Ok(new { success = true, message = "Order deleted successfully." });
        }

        [HttpPut("admin/update/{orderId}")]
        public async Task<IActionResult> AdminUpdateOrder(int orderId, [FromBody] UpdateOrderDTO updateOrderDTO)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null)
                return NotFound("Order not found.");

            order.Status = updateOrderDTO.Status ?? order.Status;

            await _orderRepository.UpdateOrderAsync(order);

            return Ok(new { success = true, message = "Order updated successfully." });
        }
    }
}

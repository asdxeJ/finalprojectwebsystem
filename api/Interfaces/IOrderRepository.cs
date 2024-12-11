using api.Model;
using api.Dtos.Order;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<OrderDTO>> GetUserOrdersAsync(string userName);
        Task<List<OrderDTO>> GetAllOrdersAsync();
        Task<Order> CreateOrderAsync(Order order);
        Task<Order> GetOrderByIdAsync(int orderId);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(Order order);
    }
}

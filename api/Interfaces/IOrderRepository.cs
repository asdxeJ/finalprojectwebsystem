using api.Model;
using api.Dtos.Order;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<OrderDTO>> GetUserOrdersAsync(string userId);
        Task<Order> CreateOrderAsync(Order order);
    }
}

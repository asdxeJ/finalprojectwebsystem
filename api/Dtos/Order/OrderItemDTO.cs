namespace api.Dtos.Order
{
    public class OrderItemDTO
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}

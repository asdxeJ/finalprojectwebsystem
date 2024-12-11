namespace api.Dtos.Order
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Pending";
        public decimal TotalAmount { get; set; }
        public string DeliveryAddress { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
    }
}

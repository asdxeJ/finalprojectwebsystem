// Interface for individual order items
export interface OrderItem {
  menuId: number;
  menuName: string;
  quantity: number;
  price: number;
}

// Interface for an order
export interface Order {
  id: number;
  orderDate: string; // Use ISO date string
  totalAmount: number;
  orderItems: OrderItem[];
  status: string;
}

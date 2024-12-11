import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  orderDeleteApi,
  orderGetAllApi,
  orderUpdateApi,
} from "../../Services/OrderService";
import OrderItemsModal from "./OrderItemsModal";

type OrderItem = {
  menuId: number;
  menuName: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  appUserId: string;
  customerName: string;
  phoneNumber: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  orderItems: OrderItem[];
};

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await orderGetAllApi();
        setOrders(data);
      } catch (error) {
        toast.error("Error fetching orders");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId: number) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await orderDeleteApi(orderId);
      setOrders(
        (prevOrders) =>
          prevOrders?.filter((order) => order.id !== orderId) || null
      );
      toast.success("Order deleted");
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await orderUpdateApi(id, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const handleViewItems = (orderItems: OrderItem[]) => {
    setSelectedOrderItems(orderItems);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Manage Orders
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="statusFilter" className="mr-2 text-sm text-gray-600">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto shadow-md border rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Customer Name
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Customer Phone
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Order Date
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Delivery Address
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Order Items
                </th>
                <th className="py-3 px-4 border-b text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-sm">
                  <td className="py-3 px-4 border-b text-gray-800">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    {order.customerName}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    {order.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order.id, e.target.value)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    {order.deliveryAddress}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    <button
                      onClick={() => handleViewItems(order.orderItems)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      View Items
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderItems={selectedOrderItems}
      />
    </div>
  );
};

export default ManageOrders;

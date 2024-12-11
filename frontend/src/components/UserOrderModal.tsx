import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderGetApi, orderDeleteApi } from "../Services/OrderService";
import { Order } from "../Models/Order";

interface UserOrderModalProps {
  onClose: () => void;
}

const UserOrderModal = ({ onClose }: UserOrderModalProps) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderGetApi();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setLoading(true);
    try {
      await orderDeleteApi(orderId);
      setOrders(
        (prevOrders) =>
          prevOrders?.filter((order) => order.id !== orderId) || null
      );
      toast.success("Order canceled");
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
        {/* Toast Container */}
        <div>
          <ToastContainer />
        </div>

        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          My Orders
        </h2>

        {orders && orders.length === 0 ? (
          <p className="text-center text-gray-400">
            You have no current orders.
          </p>
        ) : orders ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-700 rounded-md p-4 bg-gray-900 shadow-sm"
              >
                {/* Order Summary */}
                <div className="mb-3">
                  <p className="text-sm text-gray-400">
                    <strong className="text-gray-300">Status:</strong>{" "}
                    {order.status}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className="text-gray-300">Date Ordered:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className="text-gray-300">Total Amount:</strong> $
                    {order.totalAmount.toFixed(2)}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Order Items:
                  </h3>
                  <ul className="space-y-2">
                    {order.orderItems.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex justify-between text-sm text-gray-400"
                      >
                        <div>
                          <p className="font-medium text-gray-300">
                            {item.menuName}
                          </p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <p>${item.price.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Cancel Order"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default UserOrderModal;

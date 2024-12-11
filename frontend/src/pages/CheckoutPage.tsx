import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { CartGet } from "../Models/Cart";
import { cartGetApi } from "../Services/CartService";
import { getUser } from "../../api";
import { UserInfo } from "../../Menu";
import { orderPostApi } from "../Services/OrderService";

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cartItems, setCartItems] = useState<CartGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Fetch cart items when the page loads
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await cartGetApi();
        setCartItems(items);
      } catch (err) {
        setError("Failed to load cart items.");
        toast.error("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Fetch user info when the page loads
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUserInfo(user);
          setFormData({
            name: user.fullName || "",
            email: user.email || "",
            address: user.address || "",
            phone: user.phoneNumber || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user info.");
        toast.error("Failed to fetch user info.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        orderDate: new Date().toISOString(),
        totalAmount: calculateTotal(),
        orderItems: cartItems.map((item) => ({
          menuId: item.menuId,
          menuName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        userId: userInfo?.userName,
      };

      const response = await orderPostApi(orderData);
      toast.success("Order placed successfully!");
      console.log("Order created successfully", response);

      setTimeout(() => navigate("/menu"), 2000);
    } catch (err) {
      console.error("Failed to place order", err);
      toast.error("Failed to place the order.");
    }
  };

  return (
    <div className="checkout-page p-6 bg-gray-900 text-gray-200 min-h-screen">
      <ToastContainer theme="dark" />
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {/* Order Summary */}
      <div className="order-summary mb-6 bg-gray-800 p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.menuId} className="flex justify-between">
                <p>
                  {item.name} x{item.quantity}
                </p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="flex justify-between font-semibold mt-4">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      {/* Payment Information Form */}
      <div className="payment-info bg-gray-800 p-4 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="address"
            >
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleCheckout}
            className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-green-500 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

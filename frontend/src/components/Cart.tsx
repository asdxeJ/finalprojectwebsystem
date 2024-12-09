import { useState, useEffect } from "react";
import { cartGetApi, cartDeleteApi } from "../Services/CartService";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  menuId: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

interface Props {
  isOpen: boolean; // Controls if the cart is visible
  onClose: () => void; // Function to close the cart
}

const Cart = ({ isOpen, onClose }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const items = await cartGetApi(); // Fetching cart items from API
        setCartItems(items); // Storing the fetched items in state
      } catch (error) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const handleQuantityChange = (menuId: number, quantity: number) => {
    if (quantity < 1) return; // Prevent negative quantities
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.menuId === menuId ? { ...item, quantity } : item
      )
    );
  };

  const handleDeleteItem = async (menuId: number) => {
    try {
      const result = await cartDeleteApi(menuId);
      console.log("Item deleted:", result);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.menuId !== menuId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] p-4 z-50 overflow-y-auto overflow-x-hidden`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-white"
      >
        &times;
      </button>
      <h1 className="text-xl font-bold mb-4 text-center">My Cart</h1>
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.menuId}
              className="flex items-center border-b border-gray-700 pb-4"
            >
              <img
                src={
                  item.imageUrl
                    ? `http://localhost:5026/Uploads/${item.imageUrl}`
                    : "https://via.placeholder.com/50"
                }
                alt={item.name}
                className="w-14 h-14 rounded-md mr-4 object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-400">{item.category}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <label
                    htmlFor={`quantity-${item.menuId}`}
                    className="text-sm text-gray-300"
                  >
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${item.menuId}`}
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(
                        item.menuId,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-12 px-2 py-1 bg-gray-600 rounded text-center text-white"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDeleteItem(item.menuId)}
                  className="text-red-600 hover:text-red-400 transition"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Your cart is empty</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-2xl text-green-500">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => navigate("/Checkout")}
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    id: 0,
    name: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    // Simulate fetching orders and menu items from an API
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace with actual API calls
        const fetchedOrders: Order[] = [
          {
            id: 1,
            customerName: "John Doe",
            total: 120,
            status: "Delivered",
            date: "2024-12-09",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            total: 85,
            status: "Pending",
            date: "2024-12-08",
          },
          {
            id: 3,
            customerName: "Alice Brown",
            total: 200,
            status: "Shipped",
            date: "2024-12-07",
          },
        ];

        const fetchedMenuItems: MenuItem[] = [
          { id: 1, name: "Burger", price: 5.99, category: "Fast Food" },
          { id: 2, name: "Pizza", price: 9.99, category: "Italian" },
          { id: 3, name: "Sushi", price: 14.99, category: "Japanese" },
        ];

        setOrders(fetchedOrders);
        setMenuItems(fetchedMenuItems);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add Menu Item
  const addMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price > 0 && newMenuItem.category) {
      setMenuItems((prev) => [
        ...prev,
        { ...newMenuItem, id: Date.now() }, // Unique ID
      ]);
      setNewMenuItem({ id: 0, name: "", price: 0, category: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete Menu Item
  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update Menu Item
  const updateMenuItem = (id: number, updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Orders Section */}
      <div className="bg-gray-800 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {loading ? (
          <p className="text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customerName}</td>
                    <td className="px-4 py-2 text-right">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : order.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Menu Management Section */}
      <div className="bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Menu</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Add Menu Item</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Name"
              value={newMenuItem.name}
              onChange={(e) =>
                setNewMenuItem((prev) => ({ ...prev, name: e.target.value }))
              }
              className="p-2 rounded bg-gray-700 text-gray-100"
            />
            <input
              type="number"
              placeholder="Price"
              value={newMenuItem.price}
              onChange={(e) =>
                setNewMenuItem((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }))
              }
              className="p-2 rounded bg-gray-700 text-gray-100"
            />
            <input
              type="text"
              placeholder="Category"
              value={newMenuItem.category}
              onChange={(e) =>
                setNewMenuItem((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="p-2 rounded bg-gray-700 text-gray-100"
            />
            <button
              onClick={addMenuItem}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              Add
            </button>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Menu Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-right">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() =>
                        updateMenuItem(item.id, {
                          ...item,
                          price: item.price + 1,
                        })
                      }
                      className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

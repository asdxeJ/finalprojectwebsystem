import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderGetAllApi } from "../../Services/OrderService";
import { getAllUsers } from "../../Services/UserService";
import { getMenu } from "../../../api";

type Order = {
  id: number;
  status: string;
};

type User = {
  Id: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const Dashboard = () => {
  const navigate = useNavigate();

  // State variables
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // For storing menu items
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        // Fetch orders
        const allOrders = await orderGetAllApi();
        setOrders(allOrders);
        setTotalOrders(allOrders.length);

        // Fetch users
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setTotalUsers(allUsers.length);

        // Fetch menu items (this replaces the previous pending orders section)
        const items = await getMenu(); // Assuming this API fetches all menu items
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchOrdersAndUsers();
  }, []); // Empty dependency array means this will run once when the component mounts

  if (loading) {
    return (
      <div className="text-center mt-6">
        <p>Loading...</p> {/* You can show a loader here if needed */}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Admin!</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="font-medium text-blue-800">Total Users</h3>
          <p className="text-xl font-bold text-gray-800 mt-2">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="font-medium text-green-800">Total Orders</h3>
          <p className="text-xl font-bold text-gray-800 mt-2">{totalOrders}</p>
        </div>
        <div className="p-4 bg-orange-100 rounded-lg shadow">
          <h3 className="font-medium text-orange-800">Menu Items</h3>
          <p className="text-xl font-bold text-gray-800 mt-2">
            {menuItems.length}
          </p>{" "}
          {/* Displaying the number of menu items */}
        </div>
      </div>

      {/* Order Management Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Order Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">View All Orders</h3>
            <p className="text-sm text-gray-600 mt-2">
              Access a complete list of customer orders.
            </p>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/Admin/ManageOrders")}
            >
              Go to Orders
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">Menu Items</h3>
            <p className="text-sm text-gray-600 mt-2">
              Review and manage all available menu items.
            </p>
            <button
              className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              onClick={() => navigate("/admin/ManageMenu")}
            >
              View Menu Items
            </button>
          </div>
          {/* <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">Completed Orders</h3>
            <p className="text-sm text-gray-600 mt-2">
              Check past orders and their details.
            </p>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View Completed
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

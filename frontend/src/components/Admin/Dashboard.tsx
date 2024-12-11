const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Order Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">View All Orders</h3>
            <p className="text-sm text-gray-600 mt-2">
              Access a complete list of customer orders.
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Go to Orders
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">Pending Orders</h3>
            <p className="text-sm text-gray-600 mt-2">
              Review and process orders awaiting confirmation.
            </p>
            <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              View Pending
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-medium text-gray-800">Completed Orders</h3>
            <p className="text-sm text-gray-600 mt-2">
              Check past orders and their details.
            </p>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

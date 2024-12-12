import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

const AdminSidenav = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 text-lg font-bold text-center border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="mt-4 space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/managemenu"
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manageorders"
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout} // Call the logout method on button click
          className="w-full py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidenav;

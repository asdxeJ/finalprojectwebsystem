import AdminSidenav from "../components/AdminSidenav";
import { Outlet } from "react-router-dom";

type Props = {};

const Admin = (props: Props) => {
  return (
    <div className="flex h-screen">
      {/* Sidenav */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminSidenav />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

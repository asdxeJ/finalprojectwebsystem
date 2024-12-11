import { ShoppingBasket, SquareUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/useAuth";
import UserOrderModal from "./UserOrderModal";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // Manage modal visibility
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleOrderModal = () => {
    setIsOrderModalOpen((prev) => !prev);
    setIsDropdownOpen(false); // Close the dropdown when opening the modal
  };

  return (
    <>
      <nav className="flex items-center justify-between px-3 py-1 text-white font-inknut border-b border-gray-300">
        <div className="flex gap-3">
          <Link to="/">HOME</Link>
          <Link to="/Menu">MENU</Link>
          <Link to="/About">ABOUT US</Link>
          {!user && (
            <>
              <Link to="/Register">Register</Link>
              <Link to="/Login">Login</Link>
            </>
          )}
          <Link to="/Admin">Admin</Link>
        </div>

        <div className="mr-5 tracking-[3px] text-base">
          District <span className="text-orange-600 text-xl">Silog</span>
        </div>

        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <div
                className="cursor-pointer flex items-center"
                onClick={toggleDropdown}
              >
                <SquareUserRound />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-gray-200 rounded shadow-md">
                  <ul className="py-2">
                    <li className="px-4 py-2">
                      <span className="text-gray-400">
                        Hello, {user.userName.toUpperCase()}
                      </span>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={toggleOrderModal} // Open modal on click
                    >
                      My Order
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      <button onClick={logout} className="w-full text-left">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : null}
          <div
            className="flex items-center ml-2 cursor-pointer"
            onClick={onCartClick}
          >
            <strong className="pr-1">MY CART</strong>
            <ShoppingBasket className="text-orange-600" />
          </div>
        </div>
      </nav>

      {isOrderModalOpen && <UserOrderModal onClose={toggleOrderModal} />}
    </>
  );
};

export default Navbar;

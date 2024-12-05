import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-3 py-1 text-white font-inknut border-b border-gray-300">
      <div className="flex gap-3">
        <Link to="/">HOME</Link>
        <Link to="/Menu">MENU</Link>
        <Link to="/About">ABOUT US</Link>
      </div>
      <div className="mr-5 tracking-[3px] text-base">
        District <span className="text-orange-600 text-xl">Silog</span>
      </div>
      <div className="flex" onClick={onCartClick}>
        <strong className="pr-1">MY CART</strong>
        <ShoppingBasket className="text-orange-600" />
      </div>
    </nav>
  );
};

export default Navbar;

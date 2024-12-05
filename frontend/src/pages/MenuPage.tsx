import { useEffect, useState } from "react";
import MenuCardList from "../components/MenuCardList";
import Navbar from "../components/Navbar";
import { getMenu } from "../../api";
import { Menu } from "../../Menu";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

interface Props {}

const MenuPage = (props: Props) => {
  const [menu, setMenu] = useState<Menu[] | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu(); // fetch menu data
      setMenu(data); // updates state
    };

    fetchData(); // trigger the fetch on component mount
  }, []);

  return (
    <>
      <div className="bg-home-bg h-screen bg-cover">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <div className="flex">
          <div className="mt-10 ml-10">
            <SideNav />
          </div>
          <div className="flex-1">
            {/* Conditional rendering: only render MenuCardList if menu is defined */}
            {menu ? <MenuCardList menu={menu} /> : <p>Loading menu...</p>}
          </div>
        </div>
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
};

export default MenuPage;

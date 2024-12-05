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
      <div className="bg-home-bg min-h-screen bg-cover flex flex-col">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <div className="mt-10 ml-5">
            <SideNav />
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {menu ? <MenuCardList menu={menu} /> : <p>Loading menu...</p>}
          </div>
        </div>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;

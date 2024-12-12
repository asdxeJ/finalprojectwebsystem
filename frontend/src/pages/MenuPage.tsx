import { useEffect, useState } from "react";
import MenuCardList from "../components/MenuCardList";
import Navbar from "../components/Navbar";
import { getMenu } from "../../api";
import { Menu } from "../../Menu";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { cartGetApi } from "../Services/CartService";

interface Props {}

const MenuPage = (props: Props) => {
  const [menu, setMenu] = useState<Menu[] | undefined>(undefined);
  const [filteredMenu, setFilteredMenu] = useState<Menu[] | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0); // State to store the cart count

  // Fetch the menu data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu(); // fetch menu data
      setMenu(data); // update menu state
      setFilteredMenu(data); // initialize filtered menu
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      setCategories(["All", ...uniqueCategories]); // include "All" option
    };

    fetchData(); // trigger the fetch on component mount
  }, []);

  // Fetch the cart data and update the cart count
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await cartGetApi(); // Fetch the cart data
      setCartCount(cartData.reduce((acc, item) => acc + item.quantity, 0)); // Compute the cart count based on quantity
    };

    fetchCart(); // trigger the fetch on component mount
  }, []);

  // Filter menu items based on selected category and search query
  useEffect(() => {
    if (menu) {
      const filtered = menu.filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setFilteredMenu(filtered);
    }
  }, [menu, selectedCategory, searchQuery]);

  return (
    <>
      <div className="bg-home-bg min-h-screen bg-cover flex flex-col">
        <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />{" "}
        {/* Pass cartCount to Navbar */}
        <div className="flex flex-col flex-1 p-5 m-8 ml-10">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-3 ml-3">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1 border rounded bg-gray-800 text-white text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1 border rounded bg-gray-800 text-white text-sm w-full sm:w-1/4"
            />
          </div>

          {/* Menu List */}
          {filteredMenu ? (
            filteredMenu.length > 0 ? (
              <MenuCardList menu={filteredMenu} />
            ) : (
              <p className="text-center text-gray-600 text-sm">
                No items match your criteria.
              </p>
            )
          ) : (
            <p className="text-center text-gray-600 text-sm">Loading menu...</p>
          )}
        </div>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;

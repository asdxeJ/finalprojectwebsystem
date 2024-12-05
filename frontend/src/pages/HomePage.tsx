import Navbar from "../components/Navbar";
import logo from "../assets/HomePage/logo.png";
import sisig from "../assets/HomePage/sisig.png";
import chef1 from "../assets/HomePage/About/chef-1.jpg";
import chef2 from "../assets/HomePage/About/chef-2.jpg";
import bangusH from "../assets/HomePage/CustomerFavorites/bangusH.jpg";
import tapaS from "../assets/HomePage/CustomerFavorites/tapaS.jpg";
import chickenF from "../assets/HomePage/CustomerFavorites/chickenF.jpg";
import porkS from "../assets/HomePage/CustomerFavorites/porkS.jpg";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { useState } from "react";
import Cart from "../components/Cart";

interface Props {}

const Home = (props: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="bg-home-bg bg-cover min-h-[695px]">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <div>
          <img className="h-22 w-16 ml-5" src={logo} />
        </div>

        <div className="flex ml-28">
          <div className="flex flex-col flex-1 justify-center text-white tracking-widest">
            <div className="text-4xl font-semibold">
              AUTHENTIC <span className="block">FILIPINO CUISINE</span>
            </div>
            <div className="text-2xl pl-10 w-[30rem] mt-2">
              Discover the essence of the Philippines, where every meal is
              crafted with love and tradition.
            </div>
            <div className="ml-20 mt-4 pl-10">
              <Button>Order Now</Button>
            </div>
          </div>

          <div className="flex-1">
            <img src={sisig} alt="" />
          </div>
        </div>
      </div>
      {/* About Us */}
      <div className="h-90 bg-black flex items-center gap-5 p-5">
        <div className="flex-1 ">
          <img src={chef2} alt="" />
        </div>
        <div className="flex-1 ">
          <img src={chef1} alt="" />
        </div>
        <div className="flex-1 text-white">
          <h3 className="text-3xl mb-1">About Us</h3>
          <p className="text-base mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, corrupti tempora ab dolore velit iste, quam aspernatur
            sequi ipsum nesciunt temporibus commodi, molestias neque aliquam
            deleniti quos sed? Modi praesentium necessitatibus consectetur culpa
            ea consequuntur quaerat ex tempora animi ipsa incidunt, perspiciatis
            quod harum maxime autem beatae aperiam inventore earum.
          </p>
          <Button>Read More</Button>
        </div>
      </div>
      {/* Customer Favorites */}
      <div className="min-h-90 bg-home-bg text-white font-inknut">
        <div className="text-center text-3xl py-3">CUSTOMER FAVOURITES</div>
        <div className="flex items-center justify-between text-center text-2xl px-14 pb-4">
          <div>
            <img
              className="border border-orange-600 min-h-[270px] mb-1"
              src={bangusH}
            />
            <div>BangSilog</div>
          </div>
          <div>
            <img
              className="border border-orange-600 min-h-[270px] mb-1"
              src={tapaS}
            />
            <div>TapSilog</div>
          </div>
          <div>
            <img
              className="border border-orange-600 min-h-[270px] mb-1"
              src={chickenF}
            />
            <div>ChickSilog</div>
          </div>
          <div>
            <img
              className="border border-orange-600 min-h-[270px] mb-1"
              src={porkS}
            />
            <div>PorkSilog</div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div>Testimonials</div>
      {/* Footer */}
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Home;

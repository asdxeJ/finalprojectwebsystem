import Navbar from "../components/Navbar";
import logo from "../assets/HomePage/logo.png";
import sisig from "../assets/HomePage/sisig.png";
import malupiton from "../assets/HomePage/Testimonial/malupiton.jpeg";
import lebron from "../assets/HomePage/Testimonial/lebron.jpg";
import peter from "../assets/HomePage/Testimonial/spiderman.jpg";
import manny from "../assets/HomePage/Testimonial/manny.jpg";
import star from "../assets/HomePage/Testimonial/star.png";
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
      <div className="min-h-[460px] bg-gradient-to-b from-slate-900 to-black text-white flex flex-col">
        <div className="text-center text-[30px] py-[15px] font-inknut">
          <h1 className="text-orange-600">TESTIMONIALS</h1>
        </div>
        <div className="flex flex-row gap-[40px] mx-[80px] mb-[40px]">
          {/* Testimonial 1 */}
          <div className="bg-slate-800 flex-1 p-[20px] flex flex-col items-center rounded-[20px] shadow-lg">
            <img
              className="h-[115px] w-[115px] rounded-full mt-[10px] mb-[20px] border-2 border-orange-600"
              src={malupiton}
              alt="Malupiton"
            />
            <p className="text-center px-[30px] pb-[15px] text-[16px] text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Sit commodo non nunc nisl
              id semper enim gravida eget.
            </p>
            <div className="flex flex-row justify-center gap-[5px] mb-2">
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
            </div>
            <h1 className="text-orange-500 font-bold text-[19px]">MALUPITON</h1>
            <p className="text-gray-400 leading-none text-[14px]">
              Content Creator
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-slate-800 flex-1 p-[20px] flex flex-col items-center rounded-[20px] shadow-lg">
            <img
              className="h-[115px] w-[115px] rounded-full mt-[10px] mb-[20px] border-2 border-orange-600"
              src={lebron}
              alt="Lebron James"
            />
            <p className="text-center px-[30px] pb-[15px] text-[16px] text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Sit commodo non nunc nisl
              id semper enim gravida eget.
            </p>
            <div className="flex flex-row justify-center gap-[5px] mb-2">
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
            </div>
            <h1 className="text-orange-500 font-bold text-[19px]">
              LEBRON JAMES
            </h1>
            <p className="text-gray-400 leading-none text-[14px]">
              NBA Superstar
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-slate-800 flex-1 p-[20px] flex flex-col items-center rounded-[20px] shadow-lg">
            <img
              className="h-[115px] w-[115px] rounded-full mt-[10px] mb-[20px] border-2 border-orange-600"
              src={peter}
              alt="Peter Parker"
            />
            <p className="text-center px-[30px] pb-[15px] text-[16px] text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Sit commodo non nunc nisl
              id semper enim gravida eget.
            </p>
            <div className="flex flex-row justify-center gap-[5px] mb-2">
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
            </div>
            <h1 className="text-orange-500 font-bold text-[19px]">
              PETER PARKER
            </h1>
            <p className="text-gray-400 leading-none text-[14px]">Spider-Man</p>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-slate-800 flex-1 p-[20px] flex flex-col items-center rounded-[20px] shadow-lg">
            <img
              className="h-[115px] w-[115px] rounded-full mt-[10px] mb-[20px] border-2 border-orange-600"
              src={manny}
              alt="Manny Pacquiao"
            />
            <p className="text-center px-[30px] pb-[15px] text-[16px] text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Sit commodo non nunc nisl
              id semper enim gravida eget.
            </p>
            <div className="flex flex-row justify-center gap-[5px] mb-2">
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
              <img src={star} alt="Star" className="w-[20px]" />
            </div>
            <h1 className="text-orange-500 font-bold text-[19px]">
              MANNY PACQUIAO
            </h1>
            <p className="text-gray-400 leading-none text-[14px]">
              Professional Boxer
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Home;

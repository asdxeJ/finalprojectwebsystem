import { useState } from "react";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import aboutbg from "../assets/About/aboutusbg.jpeg";
import pic1 from "../assets/About/pic1.jpg";
import pic2 from "../assets/About/pic2.jpg";
import pic3 from "../assets/About/pic3.jpg";
import pic4 from "../assets/About/pic4.jpg";
import Footer from "../components/Footer";

interface Props {}

const About = (props: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="bg-black h-screen">
        {/* Navbar */}
        <Navbar onCartClick={() => setIsCartOpen(true)} />

        {/* Hero Section */}
        <div
          className="relative w-full min-h-screen flex items-center justify-center text-white font-inknut"
          style={{
            backgroundImage: `url(${aboutbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text Content */}
          <div className="relative z-10 text-center p-6 max-w-[700px]">
            <h1 className="text-xl lg:text-2xl mb-4">ABOUT US</h1>
            <h2 className="lg:text-3xl font-bold leading-tight mb-6">
              WE ALWAYS SERVE THE BEST
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Congue praesent ipsum
              tincidunt phasellus velit commodo dictum quis. Libero ligula massa
              sed id facilisi nunc morbi nunc ligula massa sed id facilisi nunc
              morbi nunc. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Maxime, placeat? Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Itaque, blanditiis. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black h-[600px] flex flex-row items-center px-[250px]">
        <div className="grid grid-cols-2 min-w-[420px]">
          <div className="pb-[10px] mr-[10px]">
            <img
              className="border border-white h-[220px] w-[210px]"
              src={pic3}
              alt=""
            />
          </div>
          <div className="mt-[10px]">
            <img
              className="border border-white h-[220px] w-[210px]"
              src={pic2}
              alt=""
            />
          </div>
          <div className="ml-[10px]">
            <img
              className="border border-white h-[220px] w-[210px]"
              src={pic1}
              alt=""
            />
          </div>
          <div className="mt-[10px] ml-[10px]">
            <img
              className="border border-white h-[220px] w-[210px]"
              src={pic4}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 text-white ml-[200px] font-inknut">
          <h1 className="text-[30px] text-orange-600">OUR STORY</h1>
          <p className="leading-[30px]">
            Lorem ipsum dolor sit amet consectetur. Elit euismod pulvinar
            tristique est at enim diam. Est sed et mollis tellus cursus semper
            posuere lobortis. Nisi consectetur dolor leo lacinia arcu eget
            scelerisque luctus. Sapien ornare dolor sed vel phasellus sapien
            tincidunt feugiat in. Nisi consectetur dolor leo lacinia arcu eget
            scelerisque luctus. Sapien ornare dolor sed vel phasellus sapien
            tincidunt feugiat in.
          </p>
        </div>
      </div>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default About;

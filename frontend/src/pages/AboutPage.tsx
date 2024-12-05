import { useState } from "react";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";

interface Props {}

const About = (props: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="bg-home-bg h-screen bg-cover">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <div className="text-white">About us page</div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default About;

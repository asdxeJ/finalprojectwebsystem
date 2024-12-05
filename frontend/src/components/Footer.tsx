import logo from "../assets/Footer/logo.jpg";
import fb from "../assets/Footer/fb.png";
import ig from "../assets/Footer/ig.png";
import x from "../assets/Footer/x.png";

function Footer() {
  return (
    <div>
      <div className="min-h-[190px] flex flex-row gap-[50px] leading-[35px]">
        <div className="flex flex-1 items-center justify-center">
          <img className="w-[110px] h-[110px] object-cover" src={logo} alt="" />
        </div>
        <div className="flex-1 m-auto">
          <h5 className="text-[25px]">Quick Links</h5>
          <p>Home</p>
          <p>About Us</p>
          <p>Our Menu</p>
        </div>
        <div className="flex-1 m-auto pt-[32px]">
          <p>Services</p>
          <p>Contact us</p>
          <p>Terms And Conditions</p>
        </div>
        <div className="flex-1 m-auto text-[22px]">
          <h5 className="mb-[5px]">Lets Stay Connected</h5>
          <div className="w-[35px] flex flex-row gap-[25px]">
            <img className="h-[34px] ml-[20px]" src={fb} alt="" />
            <img src={ig} alt="" />
            <img className="h-[32px]" src={x} alt="" />
          </div>
        </div>
      </div>
      <div className="text-center border border-t-gray-400 py-[10px] text-[13px]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
          tempor.
        </p>
      </div>
    </div>
  );
}

export default Footer;

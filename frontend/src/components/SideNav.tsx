import { NavLink } from "react-router-dom";

export default function SideNav() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-orange-600" : "hover:opacity-60";

  return (
    <div className="h-[400px] w-[190px] flex flex-col text-white border border-gray-300 items-center font-inknut leading-[40px] pt-[30px]">
      <div className="mb-[15px] px-[8px] border-b-[2px] border-b-orange-600 leading-[28px]">
        <p>MENU</p>
      </div>
      <div>
        <NavLink to="BestSeller" className={navLinkClass}>
          Best Seller
        </NavLink>
      </div>
      <div>
        <NavLink to="SilogMeals" className={navLinkClass}>
          Silog Meals
        </NavLink>
      </div>
      <div>
        <NavLink to="ComboMeals" className={navLinkClass}>
          Combo Meals
        </NavLink>
      </div>
      <div>
        <NavLink to="SingleOrder" className={navLinkClass}>
          Single Order
        </NavLink>
      </div>
      <div>
        <NavLink to="Burgers" className={navLinkClass}>
          Burgers
        </NavLink>
      </div>
    </div>
  );
}

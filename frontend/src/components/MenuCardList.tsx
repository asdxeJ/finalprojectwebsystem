import React from "react";
import { Menu } from "../../Menu";
import MenuCard from "./MenuCard";

interface Props {
  menu: Menu[];
}

const MenuCardList: React.FC<Props> = ({ menu }: Props): JSX.Element => {
  return (
    <>
      <div className="flex flex-wrap gap-10 m-10">
        {menu.map((menuItem) => (
          <MenuCard key={menuItem.id} menu={menuItem} />
        ))}
      </div>
    </>
  );
};

export default MenuCardList;

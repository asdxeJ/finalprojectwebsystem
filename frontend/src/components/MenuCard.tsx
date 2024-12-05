import React, { useState } from "react";
import { Button } from "./Button";
import { Menu } from "../../Menu";
import Modal from "./Modal";

interface Props {
  menu: Menu;
}

const MenuCard: React.FC<Props> = ({ menu }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const imageUrl = menu.imageUrl
    ? `http://localhost:5026/Uploads/${menu.imageUrl}`
    : "fallback-image.jpg"; // Use a placeholder image if menu.imageUrl is empty

  return (
    <>
      <div className="bg-black p-3 max-w-[230px]">
        <img
          className="border border-orange-600"
          src={imageUrl}
          alt={menu.name}
        />
        <div className="text-white flex flex-col items-center justify-center font-inknut">
          <h3>{menu.name}</h3>
          <div className="flex gap-3">
            <p>${menu.price}</p>
            <Button onClick={handleOpenModal}>Order Now</Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add To Cart"
      >
        <div className="flex flex-col items-center">
          <img
            className="border border-orange-600 mb-4 "
            src={imageUrl}
            alt={menu.name}
          />
          <div className="flex gap-2">
            <p className="font-inknut text-lg">{menu.name}</p>
            <p className="text-orange-600">${menu.price}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuCard;

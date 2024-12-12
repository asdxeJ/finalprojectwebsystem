import React, { useState } from "react";
import { Button } from "./Button";
import { Menu } from "../../Menu";
import Modal from "./Modal";
import { useAuth } from "../../src/Context/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  menu: Menu;
}

const MenuCard: React.FC<Props> = ({ menu }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth(); // access the authentication context
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (!isLoggedIn()) {
      toast.warning("Please log in to place an order.");
      navigate("/Login"); // redirect to login if not logged in
      return;
    }
    setIsModalOpen(true); // Open the modal if the user is logged in
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const imageUrl = menu.imageUrl
    ? `http://localhost:5026/Uploads/${menu.imageUrl}`
    : "fallback-image.jpg";

  return (
    <>
      <div className="bg-black p-3 w-[200px] h-[250px]">
        <img
          className="border border-orange-600 w-full h-40 object-cover"
          src={imageUrl}
          alt={menu.name}
        />
        <div className="text-white flex flex-col items-center justify-center font-inknut">
          <h3>{menu.name}</h3>
          <div className="flex gap-3">
            <p>₱{parseFloat(menu.price).toFixed(2)}</p>

            <Button onClick={handleOpenModal}>Order Now</Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add To Cart"
        menuId={menu.id}
      >
        <div className="flex flex-col items-center">
          <img
            className="border border-orange-600 mb-4 w-40 h-40 object-cover"
            src={imageUrl}
            alt={menu.name}
          />
          <div className="flex gap-2">
            <p className="font-inknut text-lg">{menu.name}</p>
            <p className="text-orange-600">
              ₱{parseFloat(menu.price).toFixed(2)}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuCard;

import React, { useState } from "react";
import { Menu } from "../../Menu";

interface EditModalProps {
  isOpen: boolean;
  menu: Menu;
  onClose: () => void;
  onSave: (updatedMenu: Menu) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  menu,
  onClose,
  onSave,
}) => {
  const [updatedMenu, setUpdatedMenu] = useState<Menu>(menu);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedMenu({ ...updatedMenu, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedMenu);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center border-b border-gray-600 pb-2">
          <h2 className="text-xl font-bold text-white">Edit Menu Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✖
          </button>
        </div>

        <div className="mt-4 text-white">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={updatedMenu.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />

          <label className="block mt-4 mb-2">Description</label>
          <textarea
            name="description"
            value={updatedMenu.description}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />

          <label className="block mt-4 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={updatedMenu.price}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1 bg-orange-600 text-white rounded hover:bg-orange-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

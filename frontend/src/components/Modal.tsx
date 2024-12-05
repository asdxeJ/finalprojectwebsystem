import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-600 pb-2">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4 text-white">
          {children}
          <div className="mt-6 flex items-center gap-4">
            <label htmlFor="quantity" className="text-gray-400">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 text-black rounded"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-1 bg-orange-600 text-white rounded hover:bg-orange-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

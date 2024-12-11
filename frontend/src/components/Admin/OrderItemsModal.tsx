import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderItems: { menuName: string; quantity: number; price: number }[];
};

const OrderItemsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  orderItems,
}) => {
  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Order Items
        </h2>
        <ul className="space-y-2 mb-4">
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-700">
              <span>{item.menuName}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsModal;

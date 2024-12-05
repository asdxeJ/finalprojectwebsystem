interface Props {
  isOpen: boolean; // Controls if the cart is visible
  onClose: () => void; // Function to close the cart
}

const Cart = ({ isOpen, onClose }: Props) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 text-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out w-[300px] p-4 z-50`}
    >
      <button
        onClick={onClose}
        className="text-white bg-red-600 px-3 py-1 rounded-md mb-4"
      >
        Close
      </button>
      <h1 className="text-lg font-bold mb-4">My Cart</h1>
      <div className="space-y-4">
        {/* Example item in the cart */}
        <div className="flex items-center border-b border-gray-700 pb-2">
          {/* Item Image */}
          <img
            src="https://via.placeholder.com/50"
            alt="Tapsilog"
            className="w-12 h-12 rounded-md mr-3 object-cover"
          />
          {/* Item Details */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold">Tapsilog</h2>
            <p className="text-sm text-gray-400">Quantity: 2</p>
          </div>
          {/* Item Price */}
          <p className="font-semibold">$10.00</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { Menu } from "../../Menu";
import { toast } from "react-toastify";
import { deleteMenu, getMenu, updateMenu } from "../../api";
import EditModal from "./EditModal";
import AddMenuModal from "./AddMenuModal";

const MenuPage = () => {
  const [menu, setMenu] = useState<Menu[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for AddMenuModal visibility

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getMenu();
      setMenu(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getImageUrl = (imageName: string | undefined) => {
    return imageName
      ? `http://localhost:5026/Uploads/${imageName}`
      : "fallback-image.jpg";
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMenu(id.toString());
      setMenu(menu?.filter((item) => item.id !== id));
      toast.success("Menu item deleted successfully");
    } catch (error) {
      toast.error("Error deleting menu item");
    }
  };

  const handleEdit = (item: Menu) => {
    setSelectedMenu(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (updatedMenu: Menu) => {
    try {
      const response = await updateMenu(updatedMenu.id.toString(), updatedMenu);
      setMenu(
        menu?.map((item) =>
          item.id === updatedMenu.id ? { ...item, ...updatedMenu } : item
        )
      );
      toast.success("Menu item updated successfully");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Error updating menu item");
    }
  };

  // Function to add the new menu item to the current menu state
  const handleAddNewMenu = (newMenu: Menu) => {
    setMenu((prevMenu) => (prevMenu ? [...prevMenu, newMenu] : [newMenu]));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Menu
      </h1>

      <button
        onClick={() => setIsAddModalOpen(true)} // Open AddMenuModal
        className="bg-green-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-green-700"
      >
        Add New Menu Item
      </button>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menu?.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <img
                src={getImageUrl(item.imageUrl)}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Category: {item.category}
                </p>
                <p className="text-gray-800 font-medium text-base mb-3">
                  Price: {item.price}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditModalOpen && selectedMenu && (
        <EditModal
          isOpen={isEditModalOpen}
          menu={selectedMenu}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdate}
        />
      )}

      {/* AddMenuModal */}
      {isAddModalOpen && (
        <AddMenuModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddNewMenu={handleAddNewMenu} // Pass the function to update the menu
        />
      )}
    </div>
  );
};

export default MenuPage;

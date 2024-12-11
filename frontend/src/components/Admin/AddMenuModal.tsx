import React, { useState } from "react";
import { AddMenuApi } from "../../Services/MenuService";
import { toast } from "react-toastify"; // Import toast
import { Menu } from "../../../Menu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddNewMenu: (newMenu: Menu) => void; // New prop to add the new menu
}

const AddMenuModal: React.FC<Props> = ({ isOpen, onClose, onAddNewMenu }) => {
  const [menuData, setMenuData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("category", menuData.category);
      formData.append("price", menuData.price);
      formData.append("description", menuData.description);
      if (imageFile) formData.append("image", imageFile);

      const newMenu = await AddMenuApi(formData); // Assuming API returns the new menu item
      toast.success("Menu item added successfully!");
      onAddNewMenu(newMenu); // Add the new menu to the state in MenuPage
      onClose(); // Close the modal
    } catch (error) {
      toast.error("Error adding menu item.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={menuData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={menuData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={menuData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={menuData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;

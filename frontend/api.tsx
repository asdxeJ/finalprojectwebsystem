import { Cart, Menu } from "./Menu";
import axios from "axios";

export const getMenu = async () => {
  try {
    const response = await axios.get<Menu[]>(`http://localhost:5026/api`);
    console.log("API response data:", response.data); // log for debugging
    return response.data; // Return the data
  } catch (error: any) {
    console.log("Error fetching menu:", error.message);
  }
};

// Function to add an item to the cart
export const addToCart = async (cartItem: Cart) => {
  try {
    const response = await axios.post<Cart>(
      `http://localhost:5026/api/cart`,
      cartItem
    );
    console.log("Added to cart:", response.data); // log for debugging
    return response.data; // Return the added cart item
  } catch (error: any) {
    console.log("Error adding to cart:", error.message);
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get<Cart[]>(`http://localhost:5026/api`);
    console.log("API response data:", response.data); // log for debugging
    return response.data; // Return the data
  } catch (error: any) {
    console.log("Error fetching CartItems:", error.message);
  }
};

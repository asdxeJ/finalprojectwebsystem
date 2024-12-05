import { Cart, Login, Menu, Register } from "./Menu";
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

export const register = async (formData: Register) => {
  try {
    const response = await axios.post<Register>(
      `http://localhost:5026/api/account/register`,
      formData
    );
    console.log("Registration successful:", response.data); // log for debugging
    return response.data; // Return the data
  } catch (error: any) {
    console.error("Error during registration:", error.message);
    throw error; // Throw error for further handling
  }
};

export const login = async (loginData: Login) => {
  try {
    const response = await axios.post(
      "http://localhost:5026/api/account/login",
      loginData
    );
    console.log("API response data:", response.data); // Log the response for debugging
    return response.data; // Return the response data (e.g., token)
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw new Error("Login failed");
  }
};

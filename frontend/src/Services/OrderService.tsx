import axios from "axios";
import { Order } from "../Models/Order";
import { handleError } from "../Helpers/ErrorHandler";

// Define the API endpoint for orders
const api = "http://localhost:5026/api/orders/";

// Function to post an order
export const orderPostApi = async (orderData: Partial<Order>) => {
  try {
    const response = await axios.post<Order>(api, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization token
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Rethrow to handle it elsewhere if needed
  }
};

// Function to get orders (optional user-specific logic)
export const orderGetApi = async () => {
  try {
    const response = await axios.get<Order[]>(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization token
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    return []; // Return an empty array on error
  }
};

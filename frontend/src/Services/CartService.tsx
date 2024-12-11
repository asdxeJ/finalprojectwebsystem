import axios from "axios";
import { CartGet, CartPost, CartUpdate } from "../Models/Cart";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5026/api/cart/";

export const cartPostApi = async (menuId: number, quantity: number) => {
  try {
    const cartPostData: CartPost = { menuId, quantity }; // Request body
    const response = await axios.post(`${api}`, cartPostData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const cartDeleteApi = async (menuId: number) => {
  try {
    // Construct URL with query parameter
    const url = `${api}?menuId=${menuId}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const cartGetApi = async () => {
  try {
    const response = await axios.get<CartGet[]>(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const cartUpdateApi = async (menuId: number, quantity: number) => {
  try {
    const cartUpdateData: CartUpdate = { menuId, quantity };
    const response = await axios.put(`${api}`, cartUpdateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

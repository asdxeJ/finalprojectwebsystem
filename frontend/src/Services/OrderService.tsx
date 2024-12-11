import axios from "axios";
import { Order } from "../Models/Order";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5026/api/orders/";

export const orderPostApi = async (orderData: Partial<Order>) => {
  try {
    const response = await axios.post<Order>(api, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const orderGetAllApi = async () => {
  try {
    const response = await axios.get<Order[]>(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const orderGetApi = async () => {
  try {
    const response = await axios.get<Order[]>(api + "user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update an existing order
export const orderUpdateApi = async (
  orderId: number,
  updateData: Partial<Order>
) => {
  try {
    const response = await axios.put(api + orderId, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete an order
export const orderDeleteApi = async (orderId: number) => {
  try {
    const response = await axios.delete(api + orderId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

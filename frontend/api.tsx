import { Menu, UserInfo } from "./Menu";
import axios from "axios";

const api = "http://localhost:5026/api";

export const getMenu = async () => {
  try {
    const response = await axios.get<Menu[]>(api);
    console.log("API response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching menu:", error.message);
  }
};

export const getUser = async (): Promise<UserInfo | null> => {
  try {
    // Retrieve the token from localStorage or any other secure storage
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found. Please log in.");
      return null;
    }

    const response = await axios.get<UserInfo>(`${api}/account/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User info fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
    return null;
  }
};

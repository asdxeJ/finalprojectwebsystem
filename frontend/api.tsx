import { Menu } from "./Menu";
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

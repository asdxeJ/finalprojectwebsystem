import axios from "axios";
import { Menu } from "../../Menu";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5026/api/";

export const AddMenuApi = async (formData: FormData) => {
  try {
    const response = await axios.post<Menu>(api, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

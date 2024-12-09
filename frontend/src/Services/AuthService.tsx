import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5026/api/";

export const loginApi = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerApi = async (
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string,
  address: string,
  phonenumber: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      username: username,
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phonenumber: phonenumber,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

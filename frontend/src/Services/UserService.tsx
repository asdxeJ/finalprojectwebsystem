import axios from "axios";

type User = {
  Id: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
};

const api = "http://localhost:5026/api/account";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${api}/users`);
    console.log("Fetched users:", response.data);
    return response.data; // Return the array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

import React, { useState } from "react";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await register(formData);
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/Login"); // navigate to login page after successful registration
      }, 1500); // delay before navigating
    } catch (error: any) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-[350px] space-y-3"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

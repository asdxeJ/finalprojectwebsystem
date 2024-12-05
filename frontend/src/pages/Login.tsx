import React, { useState } from "react";
import { login } from "../../api"; // Assuming you have a login function in your API service
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await login(formData); // Assuming this is an API function to handle login
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/Menu"); // navigate to login page after successful registration
      }, 1000); // delay before navigating
    } catch (error: any) {
      setError("Login failed. Please try again.");
    }
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Navigate to the register page when the user clicks "Sign up"
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Sign up option */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleSignUpClick}
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

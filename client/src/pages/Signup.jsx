import { useState } from "react";
import AuthService from "../services/auth.service.js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newUser = await AuthService.register(
        user.username,
        user.name,
        user.email,
        user.password
      );

      if (newUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: newUser.data.message,
          icon: "success",
        }).then(() => {
          setUser({
            username: "",
            name: "",
            email: "",
            password: "",
          });
          navigate("/signin");
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.response?.data?.message || "Registeration Failed!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          NICE TO MEET YOU MY NEW USER
        </h1>

        <div className="mt-2">
          <legend className="block text-gray-700 font-medium mb-1">
            USERNAME:
          </legend>
          <input
            type="text"
            name="username"
            value={user.username}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
            placeholder="username"
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <legend className="block text-gray-700 font-medium mb-1">
            PASSWORD:
          </legend>
          <input
            type="password"
            name="password"
            value={user.password}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <div className="mt-2">
          <legend className="block text-gray-700 font-medium mb-1">
            NAME:
          </legend>
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
            placeholder="name"
            onChange={handleChange}
          />

          <legend className="block text-gray-700 font-medium mb-1 mt-4">
            EMAIL:
          </legend>
          <input
            type="email"
            name="email"
            value={user.email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
            placeholder="email"
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            SIGN UP
          </button>
          <button className="w-full py-2 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

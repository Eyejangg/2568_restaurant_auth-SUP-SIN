import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const Signin = () => {
  const [signin, setSignin] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const { signin: signinFn, user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignin((signin) => ({ ...signin, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        signin.username,
        signin.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          title: "USER SIGNIN",
          text: "Signin Successfully",
          icon: "success",
        }).then(() => {
          signinFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "USER SIGNIN",
        text: error?.response?.data?.message || "Signin Failed!",
        icon: "error",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h6 className="text-3xl font-bold text-center text-gray-800 mb-6">
      WELCOME TO GRAB RESTAURANT!
    </h6>

    <div className="mt-2">
      <legend className="block text-gray-700 font-medium mb-1">USERNAME:</legend>
      <input
        type="text"
        name="username"
        value={signin.username}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
        placeholder="username"
        onChange={handleChange}
      />
    </div>

    <div className="mt-2">
      <legend className="block text-gray-700 font-medium mb-1">PASSWORD:</legend>
      <input
        type="password"
        name="password"
        value={signin.password}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black"
        placeholder="password"
        onChange={handleChange}
      />
    </div>

    <div className="mt-4 flex justify-between space-x-2">
      <a
        onClick={handleSubmit}
        className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg text-center hover:bg-green-600 transition cursor-pointer"
      >
        SIGN IN
      </a>
      <button className="w-full py-2 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition">
        CANCEL
      </button>
    </div>

    <div className="mt-6 text-center">
      <h2 className="text-gray-700 mb-2">Don't have an account yet?</h2>
      <a href="/signup" className="text-purple-500 font-semibold hover:underline">
        Click Here!
      </a>
    </div>
  </div>
</div>

  );
};

export default Signin;

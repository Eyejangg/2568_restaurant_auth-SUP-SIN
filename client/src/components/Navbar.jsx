import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user } = useAuthContext();
  const menuItems = [
    {
      name: "Add Restaurant",
      url: "/newRestaurant",
      roles: ["admin", "moderator"],
    },
    {
      name: "About Us",
      url: "/",
    },
  ];

  return (
    <div className="navbar bg-white shadow-md px-6 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {user && user.authorities.includes("ROLES_ADMIN") && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-52 p-2 shadow-lg"
            >
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    className="hover:bg-purple-100 rounded-md px-2 py-1 text-black"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a href="/" className="btn btn-ghost text-xl font-bold text-black">
          Grab Restaurant
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.url}
                className="text-black hover:text-purple-600 transition"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-3">
        {user ? (
          <UserProfile />
        ) : (
          <>
            <a
              href="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              SIGN UP
            </a>
            <a
              href="/signin"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            >
              SIGN IN
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";

const Signup = () => {
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/",
        {
          method: "POST",
          body: JSON.stringify(restaurant),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        alert("Restaurant added to successfully!");
        setRestaurants({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">NICE TO MEET YOU MY NEW USER</h1>
      <div className="mt-2">
        <legend className="mt-2">USERNAME:</legend>
        <input
          type="text"
          name="username"
          value={restaurant.username}
          className="input"
          placeholder="username"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">PASSWORD:</legend>
        <input
          type="text"
          name="password"
          value={restaurant.password}
          className="input"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">NAME:</legend>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          className="input"
          placeholder="name"
          onChange={handleChange}
        />
        <legend className="mt-2">EMAIL:</legend>
        <input
          type="text"
          name="email"
          value={restaurant.email}
          className="input"
          placeholder="email"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3 space-x-2">
        <a
          href="/"
          onClick={handleSubmit}
          className="btn btn-soft btn-success "
        >
          SIGN UP
        </a>
        <button className="btn btn-soft btn-error">CANCEL</button>
      </div>
    </div>
  );
};

export default Signup;

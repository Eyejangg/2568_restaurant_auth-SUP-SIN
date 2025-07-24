import React, { useState } from "react";

const Signin = () => {
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
        "http://localhost:5000/api/v1/restaurants/login",
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
      <h6 className="text-2xl mt-3">WELCOME TO GRAB RESTAURANT!</h6>
      <div className="mt-2">
        <legend className="mt-2">USERNAME:</legend>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          className="input"
          placeholder="username"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">PASSWORD:</legend>
        <input
          type="text"
          name="type"
          value={restaurant.type}
          className="input"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3 space-x-2">
        <a
          href="/"
          onClick={handleSubmit}
          className="btn btn-soft btn-success "
        >
          SIGN IN
        </a>
        <button className="btn btn-soft btn-error">CANCEL</button>
      </div>
      <h2>you have an account yet?</h2>
      <a href="/signup" className="link link-success text-center">
        Click Here!
      </a>
    </div>
  );
};

export default Signin;

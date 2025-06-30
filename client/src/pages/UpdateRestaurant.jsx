import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const UpdateRestaurant = () => {
  //1. Get Id from URL
  const { id } = useParams();
  const [restaurant, setRestaurants] = useState({
    title: "",
    type: "",
    img: "",
  });

  //2. Get Restaurant by ID
  useEffect(() => {
    fetch("http://localhost:5000/restaurants/" + id)
      .then((res) => {
        //convert to JSON format
        return res.json();
      })
      //save to state
      .then((response) => {
        setRestaurants(response);
      })
      //catch error !!!
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/restaurants/" + id, {
        method: "PUT",
        body: JSON.stringify(restaurant),
      });
      if (response.ok) {
        alert("Restaurant had been update!!");
        setRestaurants({
          title: "",
          type: "",
          img: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">Update Your Restaurant</h1>
      <div className="mt-2">
        <legend className="mt-2">What is your restaurant title?</legend>
        <input
          type="text"
          name="title"
          value={restaurant.title}
          className="input"
          placeholder="Type here"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="text-center mt-2">
          What is your restaurant type?
        </legend>
        <input
          type="text"
          name="type"
          value={restaurant.type}
          className="input"
          placeholder="Type here"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="text-center">What is your restaurant img?</legend>
        <label className="input">
          <input
            type="text"
            name="img"
            value={restaurant.img}
            className="grow"
            placeholder="your img link"
            onChange={handleChange}
          />
          <span className="badge badge-neutral badge-xs">*Must Type</span>
        </label>
      </div>
      {restaurant.img && (
        <div className="flex items-center gap-2">
          <img className="h-32" src={restaurant.img}></img>
        </div>
      )}
      <div className="mt-3 space-x-2">
        <button onClick={handleSubmit} className="btn btn-soft btn-success ">
          Update
        </button>
        <a href="/" className="btn btn-soft btn-error">
          Cancel
        </a>
      </div>
    </div>
  );
};

export default UpdateRestaurant;

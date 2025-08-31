import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";

const UpdateRestaurant = () => {
  //1. Get Id from URL
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  //2. Get Restaurant by ID
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await RestaurantService.getRestaurantById(id);
        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get restaurant failed",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getRestaurant();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await RestaurantService.editRestaurantById(
        id,
        restaurant
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Restaurant updated successfully",
          icon: "success",
          timer: 2000,
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setRestaurant({
          name: "",
          type: "",
          imageUrl: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(response.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">Update Your Restaurant</h1>
      <div className="mt-2">
        <legend className="mt-2">What is your restaurant name?</legend>
        <input
          type="text"
          name="name"
          value={restaurant.name}
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
        <legend className="text-center">
          What is your restaurant imageUrl?
        </legend>
        <label className="input">
          <input
            type="text"
            name="imageUrl"
            value={restaurant.imageUrl}
            className="grow"
            placeholder="your imageUrl link"
            onChange={handleChange}
          />
          <span className="badge badge-neutral badge-xs">*Must Type</span>
        </label>
      </div>
      {restaurant.imageUrl && (
        <div className="flex items-center gap-2">
          <img className="h-32" src={restaurant.imageUrl}></img>
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

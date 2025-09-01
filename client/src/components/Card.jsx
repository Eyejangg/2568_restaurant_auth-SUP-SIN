import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";
//card
const Card = (props) => {
  const { user } = useAuthContext();
  const handleDelete = async (id) => {
    try {
      const response = await RestaurantService.deleteRestaurant(id);
      if (response.status === 200) {
        await Swal.fire({
          title: "Deleted!",
          text: "Restaurant has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.imageUrl} alt="IMAGE" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        {user && user.authorities.includes("ROLES_ADMIN") && (
          <div className="card-actions justify-end">
            <a href={"/update/" + props.id} className="btn btn-warning">
              Edit
            </a>
            <button
              onClick={() => handleDelete(props.id)}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        )}
        {user && user.authorities.includes("ROLES_MODERATOR") && (
          <div className="card-actions justify-end">
            <a href={"/update/" + props.id} className="btn btn-warning">
              Edit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

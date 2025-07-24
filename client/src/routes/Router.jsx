import { createBrowserRouter } from "react-router";
import AddRestaurant from "../pages/AddRestaurant";
import Home from "../pages/Home";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newRestaurant",
    element: <AddRestaurant />,
  },
  {
    path: "/update/:id",
    element: <UpdateRestaurant />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
export default router;

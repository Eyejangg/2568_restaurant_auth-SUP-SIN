import { createBrowserRouter } from "react-router";
import AddRestaurant from "../pages/AddRestaurant";
import Home from "../pages/Home";
import UpdateRestaurant from "../pages/UpdateRestaurant";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/NewRestaurant",
    element: <AddRestaurant />,
  },
  {
    path: "/Update/:id",
    element: <UpdateRestaurant />,
  },
]);
export default router;

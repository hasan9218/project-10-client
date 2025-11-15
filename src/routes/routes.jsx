import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/HomePage";
import AvailableFoods from "../pages/AvailableFoods";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddFood from "../pages/AddFood";
import FoodDetails from "../pages/FoodDetails";
import ManageMyFoods from "../pages/ManageMyFoods";
import UpdateFood from "../pages/UpdateFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import PageNotFound from "../pages/PageNotFound";

import PrivateRoute from "../privateRoute/PrivateRoute";
import Spinner from "../components/Spinner";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <MainLayout />
        </>
      ),
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/registration", element: <Registration /> },
        { path: "/login", element: <Login /> },

        {
          path: "availablefoods",
          element: <AvailableFoods />,
          loader: () => fetch("http://localhost:3000/foods"),
        },

        {
          path: "addfood",
          element: (
            <PrivateRoute>
              <AddFood />
            </PrivateRoute>
          ),
        },

        {
          path: "food/:id",
          element: (
            <PrivateRoute>
              <FoodDetails />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const res = await fetch(`http://localhost:3000/foods/${params.id}`);
            if (!res.ok) throw new Error("Failed to fetch food details");
            return res.json();
          },
        },

        {
          path: "manage-my-foods",
          element: (
            <PrivateRoute>
              <ManageMyFoods />
            </PrivateRoute>
          ),
        },

        {
          path: "update-food/:id",
          element: (
            <PrivateRoute>
              <UpdateFood />
            </PrivateRoute>
          ),
          loader: async ({ params }) => {
            const res = await fetch(`http://localhost:3000/foods/${params.id}`);
            if (!res.ok) throw new Error("Failed to fetch food for update");
            return res.json();
          },
        },

        {
          path: "my-food-requests",
          element: (
            <PrivateRoute>
              <MyFoodRequests />
            </PrivateRoute>
          ),
        },

        { path: "*", element: <PageNotFound /> },
      ],
    },
  ],
  {
    fallbackElement: <Spinner />,
  }
);

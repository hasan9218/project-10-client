import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Homepage from "../pages/HomePage";
import AvailableFoods from "../pages/AvailableFoods";
import Registration from "../pages/Registration";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainLayout />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </>
    ),
    children: [
      { path: "/", element: <Homepage /> },
      //{ path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/registration", element: <Registration></Registration> },
      { path: "/login", element: <Login /> },
      { path: "availablefoods", element: <AvailableFoods />,
        loader: () => fetch('http://localhost:3000/foods')
       },

      //{ path: "skill-details/:id", element: <ProtectedRoute><SkillDetailsPage /></ProtectedRoute> },
      { path: "*", element: <PageNotFound></PageNotFound>}
    ],
  },
]);
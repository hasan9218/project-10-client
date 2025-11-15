import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const AvailableFoods = () => {
  const allFoods = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Loading state added
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);


  if (loading) {
    return <Spinner />;
  }


  const foods = allFoods.filter((food) => food.foodStatus === "Available");


  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {foods.map((food) => (
        <div
          key={food._id}
          className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
        >
          {/* Food Image */}
          <img
            src={
              food.foodImage || "https://i.ibb.co/4V8s1Db/food-placeholder.jpg"
            }
            alt={food.foodName}
            className="w-full h-80 object-cover"
          />

          {/* Food Info */}
          <div className="p-5 space-y-2">
            <h3 className="text-2xl capitalize font-semibold text-green-700">
              {food.foodName}
            </h3>
            <div className="flex items-center gap-2">
              {food.donatorImage ? (
                <img
                  src={food.donatorImage}
                  alt={food.donatorName}
                  className="w-8 h-8 rounded-full border border-green-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-200"></div>
              )}
              <p className="text-gray-700 text-sm font-medium">
                {food.donatorName}
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Quantity:</span>{" "}
              {food.foodQuantity}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Location:</span>{" "}
              {food.pickupLocation}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Expire Date:</span>{" "}
              {new Date(food.expireDate).toLocaleDateString()}
            </p>

         
            <button
              onClick={() => handleViewDetails(food._id)}
              className="mt-4 text-xl bg-green-700 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableFoods;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaUtensils } from "react-icons/fa";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => {
        
        const sorted = [...data].sort((a, b) => {
          const qtyA = parseInt(a.foodQuantity.match(/\d+/)?.[0] || 0);
          const qtyB = parseInt(b.foodQuantity.match(/\d+/)?.[0] || 0);
          return qtyB - qtyA;
        });
        setFoods(sorted.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  return (
    <section className="py-20 bg-green-100">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-10 flex justify-center items-center gap-2">
          <FaUtensils className="text-green-600" /> Featured Foods
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-[#F0FDF4] rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
            >
              <img
                src={food.foodImage || "https://i.ibb.co/4V8s1Db/food-placeholder.jpg"}
                alt={food.foodName}
                className="w-full h-80 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-2xl font-semibold capitalize text-green-700">{food.foodName}</h3>
                <p className="text-gray-600 mt-1">
                  Quantity: <span className="font-medium">{food.foodQuantity}</span>
                </p>
                <p className="text-gray-600">
                  Location: <span className="font-medium">{food.pickupLocation}</span>
                </p>

              
                <button
                  onClick={() => navigate(`/food/${food._id}`)}
                  className="mt-4 bg-green-700 cursor-pointer text-xl hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
                onClick={() => navigate("/availablefoods")}
                className="bg-green-700 cursor-pointer mt-20 hover:bg-green-600 text-white px-20 py-3 text-xl font-semibold rounded-lg shadow-md transition"
              >
                Show All
              </button>
      </div>
    </section>
  );
};

export default FeaturedFoods;

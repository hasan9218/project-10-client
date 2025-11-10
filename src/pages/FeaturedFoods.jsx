import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaUtensils } from 'react-icons/fa';

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from backend API
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/featured-foods') // Adjust URL if server is hosted elsewhere
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch foods');
        return res.json();
      })
      .then((data) => {
        setFoods(data); // Data is already sorted by server
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching foods:', err);
        setError('Unable to load. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-5 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-5 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-5 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3 flex justify-center items-center gap-2">
          <FaUtensils className="text-green-600" /> Featured Foods
        </h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Explore some of the most generous food shares — freshly cooked and ready to serve the community.
        </p>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
            >
              <img
                src={food.foodImage || 'https://i.ibb.co/4V8s1Db/food-placeholder.jpg'}
                alt={food.foodName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-green-900">{food.foodName}</h3>
                <p className="text-gray-600 mt-1">
                  Quantity: <span className="font-medium">{food.foodQuantity}</span>
                </p>
                <p className="text-gray-600">
                  Location: <span className="font-medium">{food.pickupLocation}</span>
                </p>
                <button
                  onClick={() => navigate(`/foods/${food._id}`)}
                  className="mt-4 bg-green-700 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate('/availablefoods')}
            className="bg-green-800 cursor-pointer hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Show All
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFoods;
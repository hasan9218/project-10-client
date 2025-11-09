import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-green-50 overflow-hidden">
      <div className="relative w-full h-[400px] md:h-[700px] container mx-auto px-6  flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 mb-5">
          Share Food, Spread Love
        </h1>

        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
          PlateShare connects people with surplus food to those who need it — reducing food waste and building a caring community.
        </p>

        <button
          onClick={() => navigate("/foods")}
          className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition"
        >
          View All Foods
        </button>
      </div>
    </section>
  );
};

export default Banner;

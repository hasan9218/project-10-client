import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[400px] md:h-[700px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner3}
              alt="banner1"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Share Food, Spread Love
              </h2>
              <p className="text-sm md:text-2xl mb-24 text-green-900">
                PlateShare connects people with surplus food to those who need it — reducing food waste and building a caring community.
              </p>
              <button
                onClick={() => navigate("/availablefoods")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                View All Foods
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner2}
              alt="banner2"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Share Food, Spread Love
              </h2>
              <p className="text-sm md:text-2xl mb-24 text-green-900">
                PlateShare connects people with surplus food to those who need it — reducing food waste and building a caring community.
              </p>
              <button
                onClick={() => navigate("/availablefoods")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                View All Foods
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={banner1}
              alt="banner3"
              className="w-full h-full object-cover"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center lg:px-5">
              <h2 className="text-green-700 text-xl lg:text-7xl md:text-4xl font-semibold mb-5">
                Share Food, Spread Love
              </h2>
              <p className="text-sm md:text-2xl mb-24 text-green-900">
                PlateShare connects people with surplus food to those who need it — reducing food waste and building a caring community.
              </p>
              <button
                onClick={() => navigate("/availablefoods")}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-12 py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md transition"
              >
                View All Foods
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

import React from 'react';
import img1 from '../assets/60159.jpg'
import img2 from '../assets/51948.jpg'
import img3 from '../assets/7853929.jpg'

const OurMission = () => {
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className='max-w-5xl mx-auto'>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0D542B]">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              At <span className="font-semibold text-green-600">PlateShare</span>, our mission is to
              build a world where no food goes to waste and no one goes hungry.
              We connect communities through food sharing, helping people donate their surplus meals
              to those who need them most — fostering kindness, sustainability, and unity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-2xl shadow">
              <img src={img1} alt="" />
              <h3 className="text-2xl font-bold text-green-700 my-5">Sustainability</h3>
              <p className="text-gray-600">Reducing food waste to protect our planet’s resources.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl shadow">
              <img src={img2} alt="" />
              <h3 className="text-2xl font-bold text-green-700 my-5">Community</h3>
              <p className="text-gray-600">Bringing people together through sharing and care.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl shadow">
              <img src={img3} alt="" />
              <h3 className="text-2xl font-bold text-green-700 my-5">Compassion</h3>
              <p className="text-gray-600">Helping those in need with generosity and love.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurMission;
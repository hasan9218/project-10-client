import React from 'react';
import collectimg from '../assets/3790532.jpg'
import findimg from '../assets/4864434.jpg'
import postimg from '../assets/9969525.jpg'
const HowItWorks = () => {
  return (
    <div>
      <section className="py-16 bg-[#F0FDF4]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0D542B]">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow">
              
              <img src={postimg} alt="" />
              <h3 className="text-2xl font-semibold mb-2 text-[#0D542B]">Post Food</h3>
              <p className="text-gray-600">
                Share your surplus food by creating a quick post with details and pickup info.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <img src={findimg} alt="" />
              <h3 className="text-2xl font-semibold mb-2 text-[#0D542B]">Find Food</h3>
              <p className="text-gray-600">
                Browse available food items posted by others in your community.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow">
              <img src={collectimg} alt="" />
              <h3 className="text-2xl font-semibold mb-2 text-[#0D542B]">Collect Food</h3>
              <p className="text-gray-600">
                Connect with the donor and collect your food safely and conveniently.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
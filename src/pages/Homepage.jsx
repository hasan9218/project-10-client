import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "../components/Banner";
import FeaturedFoods from "../pages/FeaturedFoods";
import HowItWorks from "../components/HowItWorks";
import OurMission from "../components/OurMission";

const Homepage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div data-aos="fade-down" data-aos-duration="1200">
        <Banner />
      </div>

      {/* Featured Food Section */}
      <div data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
        <FeaturedFoods />
      </div>

      {/* How It Work Section */}
      <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
        <HowItWorks />
      </div>

      {/* Our Mission Section */}
      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <OurMission />
      </div>
    </>
  );
};

export default Homepage;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "../components/Banner";
import FeaturedFoods from "./FeaturedFoods";
// import Cards from "../components/Cards";
// import TopRatedProviders from "../components/TopRatedProviders";
// import HowItWorks from "../components/HowItWorks";
// import FeaturedCategories from "../components/FeaturedCategories";

const Homepage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <>

      <div data-aos="fade-down">
        <Banner />
      </div>


      <div data-aos="fade-up">
        {/* <Cards /> */}
      </div>


      <div data-aos="fade-right">
        <FeaturedFoods></FeaturedFoods>
      </div>


      <div data-aos="fade-left">
        {/* <HowItWorks /> */}
      </div>


      <div data-aos="zoom-in">
        {/* <FeaturedCategories /> */}
      </div>
    </>
  );
};

export default Homepage;

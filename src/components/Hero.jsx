import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";

const ResponsiveHero = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const [heading, setHeading] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [subheading, setSubheading] = useState("");

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-5kh4.onrender.com"
      : "http://localhost:5001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/hero`);
        console.log("Hero API Response:", response.data);
        if (response.data) {
          setHeading(response.data.heading || "No content available");
          setHeroImage(`${response.data.image}` || "/default-image.jpg");
          setSubheading(response.data.subheading || "No subheading available");
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative w-full h-[90vh] md:h-screen">
      <img
        src={heroImage}
        alt="Background"
        className="absolute inset-0 w-full h-[90vh] md:h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit(searchQuery);
          }}  className="bg-white shadow-md w-full max-w-2xl h-10 flex items-center mt-20">
          <div className="flex flex-1 items-center">
            <input
              type="text"
              placeholder="Search For Properties"
              className="flex-1 w-full px-4 py-2 border-none focus:outline-none text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)} // Changed from onSubmit
            />
            <button 
              type="submit"
              className="flex text-black items-center p-2 pl-4 font-semibold hover:bg-[#00603A] hover:text-[#ffffff] transition duration-300"
            >
              Search
              <FiArrowRight className="text-xl sm:ml-2" />
            </button>
          </div>
        </form>
        <div className="mt-12">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-5xl lg:text-5xl mt-12 mb-4 leading-tight">
            {heading}
          </h1>
          <p className="font-inter text-sm sm:text-base md:text-base pt-2 max-w-4xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveHero;
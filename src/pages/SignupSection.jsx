import React, { useState, useEffect } from "react"; // Add useEffect
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import Mockupimg from "../assests/Magaine Page Image.gif";
import logo from "../assests/TMM_Logo_Non-responsive.svg";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignupSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [iconicData, setIconicData] = useState(null); // State to store fetched data

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-5kh4.onrender.com"
      : "http://localhost:5001";

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchIconicData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/iconic`);
        // Assuming the API returns an array, take the first item (or adjust based on your needs)
        if (res.data && res.data.length > 0) {
          setIconicData(res.data[0]); // Set the first item from the response
        }
      } catch (err) {
        console.error("Error fetching iconic data:", err);
      }
    };

    fetchIconicData();
  }, []); // Empty dependency array to run only on mount

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/newsletter`, {
        email,
        category: "Magazine",
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 space-y-8">
        {/* Title and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 relative">
          <Link to="/">
            <img
              src={logo}
              className="w-[250px] md:w-[400px] cursor-pointer"
              alt="logo"
            />
          </Link>

          <div className="flex gap-2 w-full md:w-auto items-center">
            <div className="flex items-center w-full md:w-[300px] border border-[#000000] overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Country, Area, District..."
                className="w-full px-4 py-2 text-[#000000] text-sm bg-[#f5f5f5] focus:outline-none"
              />
            </div>

            <button className="bg-[#00603A] px-4 py-[10px] flex items-center justify-center border border-[#00603A] text-white hover:text-[#00603A] hover:bg-transparent transition">
              <FaSearch className="font-thin hover:text-[#00603A]" />
            </button>

            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-[#000000]" />
              ) : (
                <Menu className="w-6 h-6 text-[#000000]" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-2">
            <div className="bg-white shadow-md p-4 z-50 absolute w-full right-0 px-12 md:px-20">
              {[
                { name: "Home", href: "/" },
                { name: "Mansions", href: "/mansions" },
                { name: "Penthouses", href: "/penthouses" },
                { name: "Developments", href: "/newdevelopment" },
                { name: "Magazine", href: "/magazine" },
                { name: "Luxe Collectibles", href: "/listedcollectibles" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-inter py-2 text-gray-800 hover:text-[#00603A] text-lg"
                >
                  {link.name}
                </a>
              ))}

              <p
                className="flex justify-start border-t border-[#000000] space-x-0 mt-3 pt-4"
                style={{ textTransform: "capitalize" }}
              >
                FOLLOW THE MANSION MARKET
              </p>
              <div className="flex justify-start mt-4 py-4 space-x-6 mb-2">
                <a
                  href="https://www.facebook.com/themansionmarketcom"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/the_mansion_m"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://www.instagram.com/themansionmarketcom"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/the-mansion-market"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@TheMansionMarket"
                  className="text-[#00603A] hover:text-gray-400 text-2xl"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center px-4 py-12 md:px-8 lg:px-16">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start lg:ml-8">
          {/* Title */}
          <h2 className="text-xl md:text-2xl mb-8">
            <span className="text-[#00603A] font-playfair">
              {iconicData?.title || "The Spotlight On Iconic Estate"}
            </span>{" "}
            <span className="text-[#000000] font-inter font-thin pr-2">|</span>
            <span className="text-black font-inter tracking-[4px]">
              {iconicData?.year || "2025"}
            </span>
            <span className="text-[#000000] font-inter font-thin">
              {" "}
              EDITION
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 w-full md:w-[400px] mb-6 leading-relaxed">
            {iconicData?.description ||
              "Be the first to receive our 2025 edition of SPOTLIGHTS ON by subscribing now!"}
          </p>

          {/* Subtext */}
          <p className="text-gray-700 font-medium mb-8">
            {iconicData?.subtitle ||
              "Luxury Living | Expert Interviews | Travel to Luxury"}
          </p>

          {/* Input & Button Container */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-4">
            <form onSubmit={handleSubscribe}>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 p-3 w-full sm:flex-1 focus:outline-none"
                  />
                  <button className="bg-[#00603A] text-white px-5 py-3 border border-[#00603A] hover:bg-[#ffffff] hover:text-[#00603A] transition-all">
                    {iconicData?.btnText || "SIGN UP"}
                  </button>
                </div>
              </div>
              <span>{message && <p>{message}</p>}</span>
            </form>
          </div>
        </div>

        {/* Right Image with Left Border */}
        <div className="md:w-1/2 flex justify-center items-center mt-6 md:mt-0 border-0 lg:border-l lg:border-l-[#000000] pl-6">
          <img
            src={iconicData?.photoHome || Mockupimg} // Use fetched image if available
            alt="Magazine Preview"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignupSection;

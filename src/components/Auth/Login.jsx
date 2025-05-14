import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assests/TMM_Logo_Non-responsive.svg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-5kh4.onrender.com"
      : "http://localhost:5001";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      console.log("API Response:", response.data);
      if (!response.data.token) {
        throw new Error("No token received from server");
      }
      // Clear localStorage to avoid stale data
      localStorage.clear();
      // Store new data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role || "");
      localStorage.setItem("firstName", response.data.firstName || "");
      localStorage.setItem("lastName", response.data.lastName || "");
      localStorage.setItem("muted", "false"); // Explicitly set muted
      console.log("Local Storage:", { ...localStorage });
      setLoading(false);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <img src={logo} alt="Logo image" />
        {/* <h2 className="text-center text-3xl font-bold text-[#00603A] font-inter">
          Login
        </h2> */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <input
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-inter px-20 py-[6px] text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          {/* <p className="text-sm text-center">
            No account?{" "}
            <Link to="/signup" className="text-[#00603A] hover:text-indigo-500">
              Sign up
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;

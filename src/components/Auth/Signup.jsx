import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assests/TMM_Logo_Non-responsive.svg";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, payload);
      console.log("Signup Response:", response.data);
      if (!response.data.token) {
        throw new Error("No token received from server");
      }
      // Clear localStorage to avoid stale data
      localStorage.clear();
      // Store new data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role || formData.role);
      localStorage.setItem("firstName", response.data.firstName || "");
      localStorage.setItem("lastName", response.data.lastName || "");
      localStorage.setItem("muted", "false"); // Explicitly set muted
      console.log("Stored in localStorage:", { ...localStorage });
      setLoading(false);
      // Navigate based on role with replace: true
      if (formData.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (formData.role === "superadmin") {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error.response);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.map((err) => err.msg).join(", ") ||
        "Signup failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="max-w-md w-full space-y-8">
        <img src={logo} alt="Logo image" />
        {/* <h2 className="text-center text-3xl font-bold font-inter text-[#00603A]">
          Sign up
        </h2> */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <input
              name="firstName"
              type="text"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              type="text"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
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
            <input
              name="confirmPassword"
              type="password"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <select
              name="role"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#00603A]"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-inter px-20 py-[6px] text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
          <p className="text-sm text-center">
            Have an account?{" "}
            <Link to="/login" className="text-[#00603A] hover:text-indigo-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

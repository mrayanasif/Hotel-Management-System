import React, { useState } from "react";
import api from "../api/axios";
import registerBannerImg from "../assets/images/register banner.jpg";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  // Handle Input Change

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/users/register", formData);

    toast.success(response.data.message);

    // Clear Form

    setFormData({
      name: "",
      email: "",
      contact: "",
      password: "",
    });

    // Redirect after 2 seconds

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    toast.error(error.response?.data?.message || "Registration Failed");
  }
};

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}

      <img
        src={registerBannerImg}
        alt="Register Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Register Card */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
            <h1 className="text-5xl font-bold text-center text-white">
              Create Account
            </h1>

            <p className="text-center text-amber-200 mt-3 mb-8">
              Join Luxury Stay and enjoy a premium experience
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}

              <div>
                <label className="block text-white mb-2">Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block text-white mb-2">Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Contact */}

              <div>
                <label className="block text-white mb-2">Contact Number</label>

                <input
                  type="text"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Password */}

              <div>
                <label className="block text-white mb-2">Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Register Button */}

              <button className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300">
                Create Account
              </button>

              {/* Login */}

              <p className="text-center text-gray-200">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-amber-300 hover:text-amber-400 font-semibold"
                >
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;

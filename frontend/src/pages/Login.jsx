import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import loginBannerImg from "../assets/images/login-banner.jpg";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);

  // Handle Input Change

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login

 // Handle Login

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post("/users/login", formData);

    const { token, user, message } = response.data;

    // Success Message
    toast.success(message);

    // Save to Local Storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Update Context
    setUser(user);

    // Redirect According to Role
    if (user.role === "admin") {

      navigate("/admin", { replace: true });

    } else if (user.role === "housekeeping") {

      navigate("/housekeeping", { replace: true });

    } else if (user.role === "receptionist") {

      // We'll create this later
      navigate("/", { replace: true });

    } else {

      navigate("/", { replace: true });

    }

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Login Failed"
    );

  }
};
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}

      <img
        src={loginBannerImg}
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
            <h1 className="text-5xl font-bold text-center text-white">
              Welcome Back
            </h1>

            <p className="text-center text-amber-200 mt-3 mb-8">
              Login to continue your luxury experience
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label className="block text-white mb-2">Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Password */}

              <div>
                <label className="block text-white mb-2">Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Remember */}

              <div className="flex justify-between items-center text-sm"></div>

              {/* Login Button */}

              <button className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold hover:scale-105 transition-all duration-300">
                Login
              </button>

              {/* Register */}

              <p className="text-center text-gray-200">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-amber-300 cursor-pointer hover:text-amber-400 font-semibold"
                >
                  Register
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

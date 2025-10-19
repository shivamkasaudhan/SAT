import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      toast.error("Phone and password are required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Logged in successfully!");
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

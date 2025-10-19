import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.name || !formData.phone || !formData.password || !formData.addressLine1 || !formData.pincode) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Phone must be 10 digits.");
      return;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      toast.error("Pincode must be 6 digits.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          address: {
            firstLine: formData.addressLine1,
            secondLine: formData.addressLine2,
            pincode: formData.pincode,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Signup failed");
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
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
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2 (Optional)"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

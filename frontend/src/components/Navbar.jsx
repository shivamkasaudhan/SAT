import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "./Sat.png"
const Navbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Shri Ashok Traders"
              className="w-10 h-10 rounded-full shadow-md"
            />
            <span className="text-xl font-bold tracking-wide">Shri Ashok Traders</span>
          </div>

          {/* Center: Nav Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/legacy"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Legacy
            </Link>
          </div>

          {/* Right: User Icon or Sign In Button */}
          <div className="relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="w-5 h-5" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => alert("Signed Out!")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-yellow-300 hover:text-black transition duration-300"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 text-white px-4 pb-4 space-y-2 transition-all duration-300">
          <Link
            to="/"
            className="block py-2 border-b border-white/10 hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block py-2 border-b border-white/10 hover:text-yellow-300"
          >
            Products
          </Link>
          <Link
            to="/legacy"
            className="block py-2 border-b border-white/10 hover:text-yellow-300"
          >
            Legacy
          </Link>
          {!isLoggedIn && (
            <Link
              to="/login"
              className="block mt-2 py-2 text-center rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

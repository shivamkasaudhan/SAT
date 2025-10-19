import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-10 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Shri Ashok Traders</h2>
          <p className="text-sm text-gray-200">
            Delivering quality and trust since 1995.  
            Your reliable partner for all trading and supply needs.
          </p>
        </div>

        {/* Middle Section - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={18} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@shriashoktraders.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> 21 Industrial Area, Kanpur, India
            </li>
          </ul>
        </div>

        {/* Right Section - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Line */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Shri Ashok Traders. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold flex">
              <span className="text-white">Skill</span>
              <span className="text-yellow-400">Swap</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-yellow-400">
              Home
            </Link>
            <Link to="/explore" className="text-white hover:text-yellow-400">
              Explore
            </Link>
            <Link to="/about" className="text-white hover:text-yellow-400">
              About Us
            </Link>
            <Link to="/contactus" className="text-white hover:text-yellow-400">
              Contact Us
            </Link>
            <Link to="/faq" className="text-white hover:text-yellow-400">
              FAQs
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-full flex items-center px-4 py-2 space-x-2">
              <Link to="/login" className="text-black">
                Login
              </Link>
              <span className="border-l border-black h-4" />
              <Link to="/register" className="text-black">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

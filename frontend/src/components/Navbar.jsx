import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center no-underline">
              <span className="text-2xl font-bold text-white">Skill</span>
              <span className="text-2xl font-bold text-yellow-400 ml-1">Swap</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { to: "/", label: "Home" },
              { to: "/explore", label: "Explore" },
              { to: "/about", label: "About Us" },
              { to: "/contactus", label: "Contact Us" },
              { to: "/faq", label: "FAQs" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="no-underline text-white hover:text-yellow-400 px-3 py-2 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="no-underline bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded-full transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="no-underline bg-transparent border border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-black font-medium px-4 py-2 rounded-full transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {/* You can hook this button up to open a mobile menu */}
            <button className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2">
              <svg
                className="h-6 w-6"
                fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

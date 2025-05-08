import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold">
              <span className="text-white">Skill</span>
              <span className="text-yellow-400">Swap</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white hover:text-yellow-400">Home</a>
            <a href="#" className="text-white hover:text-yellow-400">Explore</a>
            <a href="#" className="text-white hover:text-yellow-400">About Us</a>
            <a href="#" className="text-white hover:text-yellow-400">Contact Us</a>
            <a href="#" className="text-white hover:text-yellow-400">FAQs</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-full flex items-center px-4 py-2">
              <a href="#" className="text-black">Login</a>
              <span className="border-l border-black h-4 mx-2"></span>
              <a href="#" className="text-black">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

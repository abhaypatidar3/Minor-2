import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 rounded-lg ">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start">
        {/* Left Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-6xl font-bold text-gray-300">SkillSwap</h2>
          <p className="mt-2 text-gray-500">Find Your Match, Fuel Your Mission.</p>
        </div>

        {/* Divider and Links + Social Icons */}
        <div className="md:w-2/4 flex">
          {/* Links Column */}
          <ul className="flex-1 space-y-2 pr-8 border-r border-gray-700">
            <li><a href="#" className="text-gray-400 hover:text-white">Terms &amp; Conditions</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About SkillSwap</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Our Team</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
          </ul>

          {/* Social Icons Column */}
          <div className="flex flex-col justify-start items-center ml-8 space-y-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

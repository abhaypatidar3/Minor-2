import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTimes,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 rounded-t-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-5xl font-bold">
            <span className="text-gray-400">Skill</span>
            Swap
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Find Your Match, Fuel Your Mission.
          </p>
        </div>

        {/* center divider */}
        <div className="hidden md:block h-24 border-l border-gray-700 mx-8" />

        {/* Right section */}
        <div className="md:w-1/2 flex">
          {/* Links */}
          <ul className="flex-1 space-y-2 text-sm">
            {[
              "Terms & Conditions",
              "Privacy Policy",
              "About SkillSwap",
              "Our Team",
              "About Us",
              "Contact Us",
            ].map((text) => (
              <li key={text}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="flex flex-col ml-8 space-y-4 text-xl">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTimes />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green via-green-900 to-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-gray-600 border border-gray-700 rounded-2xl shadow-xl p-10 ring-1 ring-yellow-400/30">
        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-4 tracking-wide">
          Contact SkillSwap
        </h2>
        <p className="text-center text-gray-400 mb-10">
          We’re here to help. Feel free to reach out to us anytime.
        </p>

        <div className="space-y-6 text-base">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-800 rounded-full">
              <FiPhone className="text-yellow-400 text-xl" />
            </div>
            <span>+91 82505 05226</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-800 rounded-full">
              <FiPhone className="text-yellow-400 text-xl" />
            </div>
            <span>+91 99332 33349</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-800 rounded-full">
              <FiMail className="text-yellow-400 text-xl" />
            </div>
            <span>skillswap@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-800 rounded-full">
              <FiMapPin className="text-yellow-400 text-xl" />
            </div>
            <span>Indore, Madhya Pradesh, India</span>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} SkillSwap. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-lg p-10">
        <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-4">
          Contact SkillSwap
        </h2>
        <p className="text-center text-gray-400 mb-8">
          We're here to help. Reach out to us through any of the methods below.
        </p>

        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <FiPhone className="text-yellow-400 text-2xl" />
            <span>+91 82505 05226</span>
          </div>
          <div className="flex items-center gap-4">
            <FiPhone className="text-yellow-400 text-2xl" />
            <span>+91 99332 33349</span>
          </div>
          <div className="flex items-center gap-4">
            <FiMail className="text-yellow-400 text-2xl" />
            <span>skillswap@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FiMapPin className="text-yellow-400 text-2xl" />
            <span>Indore, Madhya Pradesh, India</span>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SkillSwap. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

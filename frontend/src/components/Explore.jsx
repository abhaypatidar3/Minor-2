import React from "react";
import { FiSearch, FiUserPlus, FiRefreshCw, FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
const Explore = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Let’s Get You Connected.
        </h1>
        <p className="mt-2 text-gray-600">
          Hire talent, swap skills, and grow together — all in one place.
        </p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Explore Skills Card */}
        <div className="bg-black rounded-2xl p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-800 rounded-full">
              <FiSearch className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-white">Explore Skills</h2>
          </div>
          <p className="mt-4 text-gray-400">
            Browse available talents by category or availability.
          </p>

          <Link
            to="/exploreProfile"
            className="self-end mt-6 inline-block bg-yellow-400 text-black font-medium py-2 px-4 rounded-full hover:opacity-90"
          >
            Explore
          </Link>
        </div>

        {/* Hire Talent Card */}
        <div className="bg-black rounded-2xl p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-800 rounded-full">
              <FiUserPlus className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-white">Hire Talent</h2>
          </div>
          <p className="mt-4 text-gray-400">
            Post a hiring request or hire someone directly.
          </p>
          <Link
            to="/hireme"
            className="self-end mt-6 bg-yellow-400 text-black font-medium py-2 px-4 rounded-full hover:opacity-90"
          >
            Explore
          </Link>
        </div>

        {/* Skill Exchange Card */}
        <div className="bg-black rounded-2xl p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-800 rounded-full">
              <FiRefreshCw className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Project collaboration
            </h2>
          </div>
          <p className="mt-4 text-gray-400">
            Collborate on a project with someone else.
          </p>
          <Link
            to="/projects"
            className="self-end mt-6 bg-yellow-400 text-black font-medium py-2 px-4 rounded-full hover:opacity-90"
          >
            Explore
          </Link>
        </div>

        {/* Manage Profile Card */}
        <div className="bg-black rounded-2xl p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gray-800 rounded-full">
              <FiUserCheck className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-white">Manage Profile</h2>
          </div>
          <p className="mt-4 text-gray-400">
            Update skills, bio, endorsements, availability.
          </p>
          <button className="self-end mt-6 bg-yellow-400 text-black font-medium py-2 px-4 rounded-full hover:opacity-90">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;

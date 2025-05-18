import React from "react";
import { FiSearch, FiUserPlus, FiRefreshCw, FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: <FiSearch size={24} />,
    title: "Explore Skills",
    desc: "Browse available talents by category or availability.",
    to: "/exploreProfile",
  },
  {
    icon: <FiUserPlus size={24} />,
    title: "Hire Talent",
    desc: "Post a hiring request or hire someone directly.",
    to: "/hireme",
  },
  {
    icon: <FiRefreshCw size={24} />,
    title: "Project Collaboration",
    desc: "Collaborate on a project with someone else.",
    to: "/projects",
  },
  {
    icon: <FiUserCheck size={24} />,
    title: "Manage Profile",
    desc: "Update skills, bio, endorsements, availability.",
    to: "/getProfile",
  },
];

export default function Explore() {
  return (
    <div className="bg-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extralight text-gray-900">
          Let’s Get You Connected.
        </h1>
        <p className="mt-2 text-gray-600">
          Hire talent, swap skills, and grow together — all in one place.
        </p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cards.map(({ icon, title, desc, to }) => (
          <div
            key={title}
            className="relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden group hover:shadow-2xl transition bg-yellow-900"
          >
            {/* Gradient overlay accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-20 transition" />

            {/* Content */}
            <div className="relative z-10 flex items-center space-x-4">
              <div className="p-3 bg-gray-800 rounded-full text-yellow-400">
                {icon}
              </div>
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
            </div>
            <p className="relative z-10 mt-4 text-gray-300">{desc}</p>

            <Link
              to={to}
              className="relative z-10 self-end mt-6 inline-flex items-center space-x-2 bg-yellow-400 text-black font-medium py-2 px-5 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              <span>Explore</span>
              <FiSearch className="text-black" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

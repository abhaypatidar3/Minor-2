import React from 'react';
import { FiTarget, FiEye, FiTool, FiUsers } from 'react-icons/fi';

const stats = [
  {
    icon: <FiTarget size={28} />,
    title: "Our Mission",
    text:
      "We empower individuals by enabling skill-sharing and fostering collaboration across diverse fields. By creating a trusted environment, we help members grow, learn, and succeed together."
  },
  {
    icon: <FiEye size={28} />,
    title: "Our Vision",
    text:
      "To become the world’s leading skill exchange network where expertise knows no boundaries and every member can thrive on mutual growth and opportunity."
  },
  {
    icon: <FiTool size={28} />,
    title: "What We Do",
    text:
      "From browsing verified profiles to posting hiring requests, SkillSwap provides a comprehensive suite of tools designed to simplify talent discovery and skill exchange."
  },
  {
    icon: <FiUsers size={28} />,
    title: "Get Involved",
    text:
      "Join SkillSwap today to start your journey. Share your expertise, find new collaborators, and fuel your mission with our vibrant community."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100  py-16 px-4 text-gray-900">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold ">
          About <span className="font-semibold">SkillSwap</span>
        </h1>
        <p className="text-lg text-gray-900">
          SkillSwap is a platform designed to connect talent with opportunity. Whether you're looking to
          hire skilled professionals or exchange expertise, SkillSwap brings the community together
          in a seamless, intuitive experience.
        </p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.map(({ icon, title, text }) => (
          <div
            key={title}
            className="relative bg-green-300 rounded-2xl p-6 flex flex-col hover:shadow-xl transition-shadow"
          >
            {/* icon badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black p-3 rounded-full shadow-lg">
              {icon}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-900">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

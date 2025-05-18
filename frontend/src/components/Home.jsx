import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      className="relative w-full h-[92vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/image/homeBackground.png')" }}
    >
      {/* subtle dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between h-full px-6 lg:px-4">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Want to <span className="font-bold">hire</span> talent or{" "}
            <span className="font-bold">exchange</span> expertise?
          </h1>
          <p className="text-lg text-yellow-300">
            You’re in the right place.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
          >
            Get Started
          </Link>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src="/image/boy.png"
            alt="Boy using laptop"
            className="w-3/4 max-w-sm animate-fade-in"
          />
        </div>
      </div>

      {/* simple fade-in keyframes */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(1rem); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Home;

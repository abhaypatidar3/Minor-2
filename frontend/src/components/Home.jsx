import React from "react";

const Home = () => {
  return (
    <section
      className="w-full bg-cover bg-center bg-black h-[92vh]"
      style={{ backgroundImage: "url('/image/homeBackground.png')" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-30">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight">
            Wanted to <span className="font-bold">hire</span> talent or{" "}
            <span className="font-bold">exchange</span> expertise?
          </h1>
          <p className="mt-4 text-lg text-yellow-400">
            You are at the right place.
          </p>
          <button className="mt-8 bg-yellow-400 text-black font-medium px-6 py-3 rounded-full hover:opacity-90">
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src="/image/boy.png"
            alt="Boy using laptop"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;

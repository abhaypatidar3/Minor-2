import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About SkillSwap</h1>
        <p className="text-lg text-gray-300 mb-12">
          SkillSwap is a platform designed to connect talent with opportunity. Whether you're looking
          to hire skilled professionals or exchange expertise, SkillSwap brings the community together
          in a seamless, intuitive experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-900 rounded-2xl p-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-400">
              We aim to empower individuals by enabling skill-sharing and fostering collaboration
              across diverse fields. By creating a trusted environment, we help members grow,
              learn, and succeed together.
            </p>
          </section>

          <section className="bg-gray-900 rounded-2xl p-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-400">
              To become the world’s leading skill exchange network where expertise knows no
              boundaries and every member can thrive on mutual growth and opportunity.
            </p>
          </section>

          <section className="bg-gray-900 rounded-2xl p-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
            <p className="text-gray-400">
              From browsing verified profiles to posting hiring requests, SkillSwap provides a
              comprehensive suite of tools designed to simplify talent discovery and skill
              exchange.
            </p>
          </section>

          <section className="bg-gray-900 rounded-2xl p-6 text-left">
            <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
            <p className="text-gray-400">
              Join SkillSwap today to start your journey. Share your expertise, find new
              collaborators, and fuel your mission with our vibrant community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

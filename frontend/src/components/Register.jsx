import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstSkill: '',
    secondSkill: '',
    thirdSkill: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: form validation and submission logic
    console.log('Register data:', formData);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">
          Create Your SkillSwap Account
        </h2>
        <p className="mt-2 text-gray-400 text-center">
          Sign up to start sharing and exchanging skills.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="firstSkill" className="block text-gray-300 mb-1">
                First Skill
              </label>
              <input
                id="firstSkill"
                name="firstSkill"
                type="text"
                value={formData.firstSkill}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div>
              <label htmlFor="secondSkill" className="block text-gray-300 mb-1">
                Second Skill
              </label>
              <input
                id="secondSkill"
                name="secondSkill"
                type="text"
                value={formData.secondSkill}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div>
              <label htmlFor="thirdSkill" className="block text-gray-300 mb-1">
                Third Skill
              </label>
              <input
                id="thirdSkill"
                name="thirdSkill"
                type="text"
                value={formData.thirdSkill}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-300 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

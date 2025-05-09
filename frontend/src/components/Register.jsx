import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineHome,
  HiOutlineHashtag,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
import client from '../api/client';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    firstSkill: '',
    secondSkill: '',
    thirdSkill: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await client.post('/user/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const inputClasses =
    'w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl p-8 shadow-xl transform hover:-translate-y-1 transition-all">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Create Your SkillSwap Account
        </h2>
        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineUser size={20} />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineMail size={20} />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className={inputClasses}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineLockClosed size={20} />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className={`${inputClasses} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>

          {/* Phone */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlinePhone size={20} />
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className={inputClasses}
            />
          </div>

          {/* Address */}
          <div className="relative">
            <span className="absolute top-2 left-0 flex items-start pl-3 text-gray-400">
              <HiOutlineHome size={20} />
            </span>
            <textarea
              id="address"
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Address"
              className={`${inputClasses} resize-none pl-10 py-2`}
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['firstSkill', 'secondSkill', 'thirdSkill'].map((field, i) => (
              <div key={field} className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <HiOutlineHashtag size={20} />
                </span>
                <input
                  id={field}
                  name={field}
                  type="text"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={`Skill ${i + 1}`}
                  className={inputClasses}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-yellow-400 text-black font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

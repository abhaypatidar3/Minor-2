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

  const inputBase =
    'w-full pl-10 pr-4 py-2 bg-gray-800 text-white border-2 border-transparent rounded-lg focus:outline-none transition';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-500 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-gray-400 bg-opacity-90 rounded-3xl p-10 shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-6">
          Create Your SkillSwap Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-600 bg-opacity-70 text-white rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'name',     placeholder: 'Full Name',     icon: HiOutlineUser,       type: 'text' },
            { name: 'email',    placeholder: 'Email Address', icon: HiOutlineMail,       type: 'email' },
            { name: 'phone',    placeholder: 'Phone Number',  icon: HiOutlinePhone,      type: 'tel' },
          ].map(({ name, placeholder, icon: Icon, type }) => (
            <div key={name} className="relative">
              <Icon className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className={`${inputBase} focus:border-yellow-400`}
              />
            </div>
          ))}

          {/* Password */}
          <div className="relative">
            <HiOutlineLockClosed className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className={`${inputBase} pr-12 focus:border-yellow-400`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>

          {/* Address */}
          <div className="relative">
            <HiOutlineHome className="absolute top-3 left-3 text-gray-400" size={20} />
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Address"
              className={`${inputBase} resize-none pt-3 focus:border-yellow-400`}
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['firstSkill', 'secondSkill', 'thirdSkill'].map((field, i) => (
              <div key={field} className="relative">
                <HiOutlineHashtag className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
                <input
                  name={field}
                  type="text"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={`Skill ${i + 1}`}
                  className={`${inputBase} focus:border-yellow-400`}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-yellow-400 text-black font-bold rounded-full shadow hover:shadow-lg transform hover:-translate-y-0.5 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

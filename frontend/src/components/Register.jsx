import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // POST /api/v1/user/register expects: name, email, phone, address, password, firstSkill, secondSkill, thirdSkill
      await client.post('/user/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">
          Create Your SkillSwap Account
        </h2>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
            <input
              id="name" name="name" type="text"
              value={formData.name} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
            <input
              id="email" name="email" type="email"
              value={formData.email} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
            <input
              id="password" name="password" type="password"
              value={formData.password} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-1">Phone</label>
            <input
              id="phone" name="phone" type="tel"
              value={formData.phone} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-300 mb-1">Address</label>
            <textarea
              id="address" name="address" rows="2"
              value={formData.address} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 resize-none"
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['firstSkill','secondSkill','thirdSkill'].map((field, i) => (
              <div key={field}>
                <label htmlFor={field} className="block text-gray-300 mb-1">
                  {`Skill ${i+1}`}
                </label>
                <input
                  id={field} name={field} type="text"
                  value={formData[field]} onChange={handleChange} required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
                />
              </div>
            ))}
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
          <Link to="/login" className="text-yellow-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

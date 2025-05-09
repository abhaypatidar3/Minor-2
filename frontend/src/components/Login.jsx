import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(c => ({ ...c, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await client.post('/user/login', credentials);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">
          Welcome Back
        </h2>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
            <input
              id="email" name="email" type="email"
              value={credentials.email} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
            <input
              id="password" name="password" type="password"
              value={credentials.password} onChange={handleChange} required
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="text-yellow-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi';
import client from '../api/client';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // on mount, check auth status
  useEffect(() => {
    (async () => {
      try {
        await client.get('/user/me');
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(c => ({ ...c, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await client.post('/user/login', credentials);
      setLoggedIn(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await client.get('/user/logout');
    } catch {
      // ignore
    } finally {
      setLoggedIn(false);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600">Checking authentication…</p>
      </div>
    );
  }

  // already logged in
  if (loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            You’re already logged in
          </h2>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow hover:from-red-500 hover:to-pink-600 transition"
          >
            🔒 Log Out
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Click to securely end your session.
          </p>
        </div>
      </div>
    );
  }

  // login form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400 px-4">
      <div className="w-full max-w-md  rounded-2xl p-8 shadow-lg bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-500">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <HiOutlineLockClosed className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword 
                ? <HiOutlineEyeOff size={20} /> 
                : <HiOutlineEye size={20} />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-full shadow hover:bg-yellow-600 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-yellow-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

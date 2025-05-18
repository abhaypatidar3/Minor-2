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
  const [showPassword, setShowPassword]   = useState(false);
  const [error, setError]                 = useState('');
  const [loading, setLoading]             = useState(true);
  const [loggedIn, setLoggedIn]           = useState(false);
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
      // ignore errors
    } finally {
      setLoggedIn(false);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication…</p>
      </div>
    );
  }

  // if already logged in, show logout only
  if (loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            You’re already logged in
          </h2>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  // otherwise show login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl transform hover:-translate-y-1 transition-all">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Welcome Back
        </h2>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineMail size={20} />
            </span>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineLockClosed size={20} />
            </span>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword
                ? <HiOutlineEyeOff size={20} />
                : <HiOutlineEye     size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-yellow-400 hover:underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

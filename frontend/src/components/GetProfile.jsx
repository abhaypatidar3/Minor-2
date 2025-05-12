import React, { useState, useEffect } from 'react';
import { FiMapPin, FiCheckCircle, FiClock, FiBookmark } from 'react-icons/fi';
import client from '../api/client';

export default function GetProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await client.get('/user/me');
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  const { firstSkill, secondSkill, thirdSkill } = user.skills || {};

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src="/image/avatar.png"
          alt={user.name}
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <div className="flex items-center space-x-4 mt-3">
            <span className="flex items-center text-gray-600">
              <FiMapPin className="mr-1" /> {user.address}
            </span>
            <span className="flex items-center">
              <FiCheckCircle className="text-green-500 mr-1" /> Available
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-black text-white font-medium rounded-full hover:opacity-90">
            Hire Me
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100">
            Swap Me
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <FiBookmark size={24} />
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[firstSkill, secondSkill, thirdSkill].map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
        <p className="text-gray-600">
          Joined on: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Reviews Placeholder */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example review cards, replace with real data */}
          <div className="p-4 bg-gray-100 rounded-lg">Review 1</div>
          <div className="p-4 bg-gray-100 rounded-lg">Review 2</div>
          <div className="p-4 bg-gray-100 rounded-lg">Review 3</div>
        </div>
      </div>
    </div>
  );
}
// src/components/ViewOtherProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';
import client from '../api/client';

export default function ViewOtherProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
               const res = await client.get(`/user/profile/${username}`);

        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const { name, email, address, createdAt, skills = {}, status } = user;
  const skillList = [
    skills.firstSkill,
    skills.secondSkill,
    skills.thirdSkill
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FiChevronLeft className="mr-1" /> Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.avatarUrl || '/image/avatar.png'}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <p className="text-gray-600">{email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <FiMapPin /> <span>{address}</span>
              <FiCheckCircle
                className={status === 'active' ? 'text-green-500' : 'text-red-500'}
              />{' '}
              <span
                className={
                  status === 'active' ? 'text-green-600' : 'text-red-600'
                }
              >
                {status === 'active' ? 'Available' : status}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillList.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
            {skillList.length === 0 && (
              <span className="text-gray-500">No skills listed</span>
            )}
          </div>
        </div>

        {/* Joined */}
        <div>
          <h2 className="font-semibold mb-1">Joined On</h2>
          <p className="text-gray-700">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

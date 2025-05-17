// src/components/Hire.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import client from '../api/client';

export default function Hire() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // form state
  const [form, setForm] = useState({
    taskTitle: '',
    description: '',
    amount: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  // load profile
  useEffect(() => {
    (async () => {
      try {
        const res = await client.get(`/user/profile/${username}`);
        setTarget(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccessMsg('');
    setSubmitError('');
    try {
      await client.post('/projects/request-user', {
        userEmail: target.email,          // target’s email
        projectName: form.taskTitle,
        description: form.description,
        amount: form.amount
      });
      setSuccessMsg('Request sent successfully!');
      setForm({ taskTitle: '', description: '', amount: '' });
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to send request');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const { name, email, address, skills = {}, status } = target;
  const skillList = [skills.firstSkill, skills.secondSkill, skills.thirdSkill].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800">
          <FiChevronLeft className="mr-1" /> Back to Explore
        </button>
      </div>
      <div className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b">
            <h1 className="text-2xl font-semibold">Hire {name}</h1>
            <p className="text-gray-600 mt-1">Set task details, confirm rates, and hire with ease.</p>
          </div>

          {/* Profile summary */}
          <div className="px-8 py-4 border-b flex items-center space-x-4">
            <img src="/image/avatar.png" alt={name} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-medium">{name}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiMapPin /> <span>{address}</span>
                <FiCheckCircle className={status==='active'?'text-green-500':'text-red-500'} />
                <span className={status==='active'?'text-green-600':'text-red-600'}>
                  {status==='active'?'Available':status}
                </span>
              </div>
              <div className="mt-2 flex space-x-2 text-xs text-blue-600">
                {skillList.map((s,i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left */}
            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="taskTitle"
                  value={form.taskTitle}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Design Homepage"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe what you need done..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
              </div>
              {/* Amount */}
              <div>
                <label className="block text-gray-700 mb-1">Amount</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 1500"
                    className="w-full border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {successMsg && <p className="text-green-600">{successMsg}</p>}
              {submitError && <p className="text-red-600">{submitError}</p>}
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:opacity-90 transition"
              >
                Send a Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skillsRequired: '', // comma-separated
    projectType: 'paid',
    budget: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()),
        projectType: formData.projectType,
        budget: formData.budget
      };
      await client.post('/projects/create', payload);
      setMessage('Project created successfully');
      // Optionally redirect to projects list
      navigate('/projects');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Create New Project</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Skills Required</label>
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              placeholder="e.g. JavaScript, C, Tailwind"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Budget</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}


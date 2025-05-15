import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import client from '../api/client';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '',
    skillsText: '',  // comma-separated input
    about: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load current user data
  useEffect(() => {
    (async () => {
      try {
        const res = await client.get('/user/me');
        const u = res.data.user;
        setFormData({
          firstName: u.name || '',
          skillsText: Array.isArray(u.skills)
            ? u.skills.join(', ')
            : (u.skills && typeof u.skills === 'object'
                ? Object.values(u.skills).join(', ')
                : ''),
          about: u.about || ''
        });
      } catch {
        setError('Failed to load user data');
      }
    })();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleAddSkill = () => {
    if (formData.skillsText.trim()) {
      setFormData(fd => ({ skillsText: fd.skillsText + ', ' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(''); setError('');

    // split into up to three skills
    const parts = formData.skillsText.split(',').map(s => s.trim());
    const [firstSkill = '', secondSkill = '', thirdSkill = ''] = parts;

    try {
      await client.put('/user/me/update', {
        name: formData.firstName,
        skills: { firstSkill, secondSkill, thirdSkill },
        status: 'active',
        about: formData.about
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Update Profile</h1>
      <div className="bg-white rounded-lg shadow p-8">
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error   && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Skills */}
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Skills (3 max)</label>
              <input
                name="skillsText"
                value={formData.skillsText}
                onChange={handleChange}
                placeholder="e.g. frontend, backend, DSA"
                className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2"
              />
            </div>
            <button type="button" onClick={handleAddSkill} className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              <FiPlus />
            </button>
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2 resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

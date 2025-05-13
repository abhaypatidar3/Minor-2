import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    location: '',
    skills: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    // TODO: add skill logic
    console.log('Add skill:', formData.skills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit update logic
    console.log('Update Profile', formData);
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Welcome back, Aastha!</h1>
      <div className="bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Sidebar */}
       

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Update Profile</h2>
          <div className="border-b border-gray-300 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Profession & Location */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Profession:</label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Profession</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Product Manager</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Location:</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Location</option>
                  <option>Indore</option>
                  <option>West Bengal</option>
                  <option>Mumbai</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Skills:</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Add a skill"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSkill}
                className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                <FiPlus />
              </button>
            </div>

            {/* About */}
            <div>
              <label className="block text-gray-700 mb-1">About:</label>
              <textarea
                name="about"
                rows="4"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UpdateProfile;

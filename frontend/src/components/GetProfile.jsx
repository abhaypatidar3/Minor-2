import React, { useState, useEffect } from 'react';
import { FiMapPin, FiCheckCircle } from 'react-icons/fi';
import client from '../api/client';
import UpdateProfile from './UpdateProfile';
import CreateProject from './CreateProject';
import ProfileReviews from './ProfileReview';
import MyProjects from './MyProject';

const menuItems = [
  'Overview',
  'Update Profile',
  'Add a Project',
  'Requests',
  'My Projects',
  'Co-Worker project',
  'Reviews',
  'Settings'
];

export default function ProfileDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get('/user/me');
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error)   return <p className="text-red-500 text-center mt-4">{error}</p>;

  const { firstSkill, secondSkill, thirdSkill } = user.skills || {};

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            {/* Profile header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="/image/avatar.png"
                alt={user.name}
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <FiMapPin /> <span>{user.address}</span>
                  <FiCheckCircle className="text-green-500" /> <span>Available</span>
                </div>
              </div>
              <button className="ml-auto px-4 py-2 bg-black text-white rounded-full">Hire Me</button>
            </div>
            {/* Skills */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Skills:</h2>
              <div className="flex gap-2">
                {[firstSkill, secondSkill, thirdSkill].map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            {/* About */}
            <div>
              <h2 className="font-semibold mb-2">Joined On:</h2>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        );
      case 'Update Profile':
        return <UpdateProfile />;
      case 'Add a Project':
        return <CreateProject />;  
      case 'Reviews':
        return <ProfileReviews />;  
      case 'My Projects':
        return <MyProjects/>;
      default:
        return <p>{activeTab} content coming soon...</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl mx-auto overflow-hidden">
        {/* Sidebar always visible */}
        <aside className="w-64 bg-gray-200 p-6">
          <div className="flex flex-col items-center mb-8">
            <img src="/image/avatar.png" alt={user.name} className="w-20 h-20 rounded-full mb-2" />
            <h2 className="font-semibold">{user.name}</h2>
          </div>
          <nav className="flex flex-col space-y-2">
            {menuItems.map(item => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-left w-full px-2 py-1 rounded ${
                  activeTab === item ? 'bg-white font-medium' : 'text-gray-700 hover:bg-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          <h1 className="text-xl font-semibold mb-4">{activeTab}</h1>
          <div className="border-b border-gray-300 mb-6" />
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

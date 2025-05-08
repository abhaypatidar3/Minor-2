import React from 'react';
import { FiUser, FiSettings, FiClipboard, FiEdit, FiPlus, FiList, FiBookmark, FiStar, FiChevronDown } from 'react-icons/fi';

const sampleReviews = [
  {
    id: 1,
    rating: 4.8,
    count: 10,
    text: 'Jane delivered exceptional work on our project. Highly recommended!',
    reviewer: 'John Smith',
    timeAgo: 'Jan weeks ago'
  },
  {
    id: 2,
    rating: 4.8,
    count: 10,
    text: 'Jane delivered exceptional work on our project. Highly recommended!',
    reviewer: 'John Smith',
    timeAgo: 'Jan weeks ago'
  },
  {
    id: 3,
    rating: 4.8,
    count: 10,
    text: 'Jane delivered exceptional work on our project. Highly recommended!',
    reviewer: 'John Smith',
    timeAgo: 'Jan weeks ago'
  },
  {
    id: 4,
    rating: 4.8,
    count: 10,
    text: 'Jane delivered exceptional work on our project. Highly recommended!',
    reviewer: 'John Smith',
    timeAgo: 'Jan weeks ago'
  }
];

const menuItems = [
  { key: 'Overview', icon: <FiList /> },
  { key: 'Update Profile', icon: <FiEdit /> },
  { key: 'Add a Project', icon: <FiPlus /> },
  { key: 'Requests', icon: <FiClipboard /> },
  { key: 'Bookmarks', icon: <FiBookmark /> },
  { key: 'Reviews', icon: <FiStar /> },
  { key: 'Payment History', icon: <FiUser /> },
  { key: 'Settings', icon: <FiSettings /> }
];

const ProfileReviews = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Welcome back, Aastha!</h1>
      <div className="bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-6">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/image/avatar.png"
              alt="Aastha Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Aastha Kanade</h2>
          </div>
          <nav className="flex flex-col space-y-4">
            {menuItems.map(item => (
              <a
                key={item.key}
                href="#"
                className={`flex items-center space-x-2 text-gray-700 hover:text-gray-900 ${item.key === 'Reviews' ? 'font-medium' : ''}`}
              >
                {item.icon}
                <span>{item.key}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reviews</h2>
          <div className="border-b border-gray-300 mb-6" />

          <div className="space-y-4">
            {sampleReviews.map(r => (
              <div key={r.id} className="bg-gray-100 rounded-lg p-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FiStar className="text-yellow-400 text-xl" />
                    <span className="font-semibold">{r.rating}</span>
                    <span className="text-sm text-gray-600">({r.count} reviews)</span>
                  </div>
                  <span className="text-sm text-gray-500">{r.timeAgo}</span>
                </div>
                <p className="mt-2 text-gray-700">{r.text}</p>
                <p className="mt-2 text-gray-800 font-medium">{r.reviewer}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <FiChevronDown className="text-gray-500 text-2xl" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileReviews;

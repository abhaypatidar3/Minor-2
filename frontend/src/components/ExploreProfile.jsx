import React, { useState } from 'react';

const profiles = [
  { id: 1, name: 'Aastha Kanade', skills: 'UI/UX, HTML, Figma', rating: 4.8, reviews: 25, status: 'Available', avatar: '/image/avatar1.png' },
  { id: 2, name: 'Akshat Soni', skills: 'UI/UX, HTML, Figma', rating: 4.8, reviews: 25, status: 'Unavailable', avatar: '/image/avatar2.png' },
  // ...add more profiles as needed
];

const ExploreProfile= () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Category');
  const [availableOnly, setAvailableOnly] = useState(false);

  const handleSearch = () => {
    // TODO: filter logic
    console.log({ search, category, availableOnly });
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <header
        className="h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/ExploreProfileImage.png')" }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Explore Profiles</h1>
          <p className="mt-2 text-lg">Discover verified profiles, check reviews, and choose how you want to collaborate.</p>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4">
            <input
              type="text"
              placeholder="Search skills or names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Search
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          >
            <option>All Category</option>
            <option>UI/UX</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
          <div className="flex items-center space-x-2">
            <label htmlFor="availableOnly" className="text-gray-700 font-medium">
              Available Only
            </label>
            <button
              id="availableOnly"
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`w-10 h-6 rounded-full p-1 transition ${availableOnly ? 'bg-yellow-400' : 'bg-gray-300'}`}
            >
              <span
                className={`block w-4 h-4 bg-white rounded-full shadow transform transition ${availableOnly ? 'translate-x-4' : 'translate-x-0'}`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((p) => (
          <div key={p.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center space-x-4">
              <img src="/image/avatar.png" alt={p.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <span className={`text-sm ${p.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                  {p.status}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700"><strong>Skills:</strong> {p.skills}</p>
            <p className="text-sm text-gray-700"><strong>Rating:</strong> {p.rating}</p>
            <p className="text-sm text-gray-700"><strong>Reviews:</strong> {p.reviews}</p>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-white border border-gray-300 text-gray-800 py-1 rounded-lg hover:bg-gray-200 transition">
                View Profile
              </button>
              <button className="flex-1 bg-yellow-400 text-black py-1 rounded-lg hover:opacity-90 transition">
                Hire
              </button>
              <button className="flex-1 bg-gray-300 text-gray-800 py-1 rounded-lg hover:bg-gray-400 transition">
                Swap
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-5xl mx-auto mt-8 px-4 flex justify-center items-center space-x-4">
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&lt;</button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&gt;</button>
      </div>
    </div>
  );
};

export default ExploreProfile;

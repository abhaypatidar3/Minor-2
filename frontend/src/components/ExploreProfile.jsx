import React, { useState, useEffect, useMemo } from 'react';
import client from '../api/client';

const ExploreProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [skillQuery, setSkillQuery] = useState('backend');
  const [category, setCategory] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfiles = async (skill) => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get('/user/search', { params: { skill } });
      const data = res.data.users || res.data;
      const adapted = data.map(u => {
        // Normalize skills field (array or object)
        const rawSkills = u.skills;
        let skillsStr = '';
        if (Array.isArray(rawSkills)) {
          skillsStr = rawSkills.join(', ');
        } else if (rawSkills && typeof rawSkills === 'object') {
          skillsStr = Object.values(rawSkills).join(', ');
        } else {
          skillsStr = rawSkills || '';
        }

        return {
          id: u._id,
          name: u.name,
          avatar: u.avatarUrl || '/image/avatar.png',
          skills: skillsStr,
          status: u.status === 'active' ? 'Available' : u.status || 'Unknown',
          rating: u.rating || '–',
          reviews: u.reviews || 0,
        };
      });
      setProfiles(adapted);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(skillQuery);
  }, []);

  const handleSearch = () => {
    fetchProfiles(skillQuery);
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      if (category !== 'All') {
        const cats = p.skills.split(',').map(s => s.trim());
        if (!cats.includes(category)) return false;
      }
      if (availableOnly && p.status !== 'Available') return false;
      return true;
    });
  }, [profiles, category, availableOnly]);

  return (
    <div className="bg-white">
      <header className="h-64 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/image/ExploreProfileImage.png')" }}>
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Explore Profiles</h1>
          <p className="mt-2 text-lg">Discover verified profiles, check reviews, and choose how you want to collaborate.</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4">
            <input
              type="text"
              value={skillQuery}
              onChange={e => setSkillQuery(e.target.value)}
              placeholder="Search by skill..."
              className="w-full py-2 focus:outline-none"
            />
            <button onClick={handleSearch} className="ml-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:opacity-90">
              Search
            </button>
          </div>

          <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none">
            <option value="All">All Categories</option>
            <option value="UI/UX">UI/UX</option>
            <option value="HTML">HTML</option>
            <option value="Figma">Figma</option>
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Available Only</span>
            <button
              aria-label="Toggle availability"
              onClick={() => setAvailableOnly(prev => !prev)}
              className={`w-10 h-6 rounded-full p-1 transition ${availableOnly ? 'bg-yellow-400' : 'bg-gray-300'}`}
            >
              <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition ${availableOnly ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p className="col-span-full text-center">Loading...</p>}
        {!loading && filteredProfiles.length === 0 && !error && (
          <p className="col-span-full text-center text-gray-500">No profiles found.</p>
        )}

        {!loading && filteredProfiles.map(p => (
          <div key={p.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center space-x-4">
              <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <span className={`text-sm ${p.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{p.status}</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700"><strong>Skills:</strong> {p.skills}</p>
            <p className="text-sm text-gray-700"><strong>Rating:</strong> {p.rating}</p>
            <p className="text-sm text-gray-700"><strong>Reviews:</strong> {p.reviews}</p>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-white border border-gray-300 text-gray-800 py-1 rounded-lg hover:bg-gray-200 transition">View Profile</button>
              <button className="flex-1 bg-yellow-400 text-black py-1 rounded-lg hover:opacity-90 transition">Hire</button>
              <button className="flex-1 bg-gray-300 text-gray-800 py-1 rounded-lg hover:bg-gray-400 transition">Swap</button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-4 flex justify-center items-center space-x-4">
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&lt;</button>
        {[1,2,3].map(num => (
          <button key={num} className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">{num}</button>
        ))}
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&gt;</button>
      </div>
    </div>
  );
};

export default ExploreProfile;

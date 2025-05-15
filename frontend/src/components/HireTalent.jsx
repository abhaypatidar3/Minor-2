import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import client from '../api/client';

export default function HireTalent() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await client.get('/user/all');
        // assume res.data.users or res.data
        const data = res.data.users || res.data;
        // normalize skills
        const adapted = data.map(u => {
          let skillsArr = [];
          if (Array.isArray(u.skills)) skillsArr = u.skills;
          else if (u.skills && typeof u.skills === 'object') skillsArr = Object.values(u.skills);
          return {
            id: u._id,
            name: u.name,
            avatar: u.avatarUrl || '/image/avatar.png',
            skills: skillsArr.join(', '),
            rating: u.rating || '–',
            reviews: u.reviews || 0,
          };
        });
        setUsers(adapted);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = useMemo(() =>
    users.filter(u =>
      u.name.toLowerCase().includes(search.trim().toLowerCase())
    ),
    [users, search]
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)   return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Search */}
      <div className="max-w-4xl mx-auto flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r-lg hover:opacity-90">
          <FiSearch />
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No users found.</p>
        )}
        {filtered.map(u => (
          <div key={u.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center space-x-4">
              <img src={u.avatar} alt={u.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{u.name}</h3>
                <p className="text-sm text-gray-600">Skills: {u.skills}</p>
                <p className="text-sm text-gray-600">Rating: {u.rating}</p>
                <p className="text-sm text-gray-600">Reviews: {u.reviews}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/profile/${u.id}`}
                className="flex-1 text-center bg-yellow-400 text-black py-1 rounded-lg hover:opacity-90"
              >
                View Profile
              </Link>
              <button className="flex-1 text-center border border-gray-300 text-gray-800 py-1 rounded-lg hover:bg-gray-100">
                Hire
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

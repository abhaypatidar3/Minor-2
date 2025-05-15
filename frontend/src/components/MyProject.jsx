import React, { useState, useEffect } from 'react';
import { FiLoader, FiBookmark } from 'react-icons/fi';
import client from '../api/client';
import { Link } from 'react-router-dom';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await client.get('/projects/my');
        const raw = res.data.myProjects ?? res.data.projects ?? res.data.data ?? res.data;
        const data = Array.isArray(raw) ? raw : [];
        setProjects(data.map(p => ({
          id: p._id,
          title: p.title || p.name,
          description: p.description,
          status: p.status === 'open' ? 'OPEN' : 'CLOSED',
          skills: Array.isArray(p.skills)
            ? p.skills
            : (p.skills && typeof p.skills === 'object')
              ? Object.values(p.skills)
              : [],
          createdAt: p.createdAt,
        })));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchMyProjects();
  }, []);

  if (loading) return <div className="text-center py-10"><FiLoader className="animate-spin mx-auto text-2xl"/></div>;
  if (error)   return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">My Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have no projects yet.{' '}
          <Link to="/projects/new" className="text-yellow-500 hover:underline">Create one?</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">{proj.title}</h2>
                <span className={`px-2 py-1 text-xs sm:text-sm font-medium rounded ${
                  proj.status === 'OPEN'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {proj.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-2 line-clamp-3">{proj.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {proj.skills.map((s, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{s}</span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/projects/${proj.id}`}
                  className="text-sm text-yellow-500 hover:underline"
                >
                  View
                </Link>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <FiBookmark />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

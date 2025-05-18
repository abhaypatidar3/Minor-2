import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { FiLoader } from 'react-icons/fi';

export default function CoWorkerProject() {
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [replies, setReplies] = useState({});
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoWorkerProjects = async () => {
      try {
        const res = await client.get('/projects/coworker-projects');
        const raw = res.data.projects ?? res.data.data ?? res.data;

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
          createdAt: p.createdAt
        })));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load co-worker projects');
      } finally {
        setLoading(false);
      }
    };

    fetchCoWorkerProjects();
  }, []);

  const fetchComments = async projectId => {
    try {
      const res = await client.get(`/comments/${projectId}`);
      setComments(prev => ({ ...prev, [projectId]: res.data.comments || [] }));
    } catch (err) {
      console.error('Fetch comments error:', err);
    }
  };

  const handleCommentSubmit = async projectId => {
    if (!newComment[projectId]) return;

    try {
      await client.post(`/comments/${projectId}`, { message: newComment[projectId] });
      setNewComment(prev => ({ ...prev, [projectId]: '' }));
      fetchComments(projectId);
    } catch (err) {
      console.error('Post comment error:', err);
    }
  };

  const handleReply = async (commentId, projectId) => {
    const reply = replies[commentId];
    if (!reply) return;

    try {
      await client.post(`/comments/${commentId}/reply`, { message: reply });
      setReplies(prev => ({ ...prev, [commentId]: '' }));
      fetchComments(projectId);
    } catch (err) {
      console.error('Reply error:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <FiLoader className="animate-spin mx-auto text-2xl text-yellow-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Co-Worker Projects</h1>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center">
          You are not added to any co-worker projects yet.
        </p>
      ) : (
        <div className="space-y-6">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{proj.title}</h2>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {proj.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    proj.status === 'OPEN'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-gray-400">
                Joined: {new Date(proj.createdAt).toLocaleDateString()}
              </p>

              {/* Comment Section */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">Comments</h3>
                  <button
                    onClick={() => {
                      setExpanded(prev => ({ ...prev, [proj.id]: !prev[proj.id] }));
                      if (!comments[proj.id]) fetchComments(proj.id);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {expanded[proj.id] ? 'Hide' : 'Show'}
                  </button>
                </div>

                {expanded[proj.id] && (
                  <>
                    <div className="space-y-3 mb-3">
                      {(comments[proj.id] || []).map(c => (
                        <div key={c._id} className="border rounded p-3 bg-gray-50">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium text-yellow-700">
                              {c.sender.split('@')[0]}
                            </span>: {c.message}
                          </p>
                          {(c.replies || []).map((r, i) => (
                            <div key={i} className="ml-4 mt-2 text-xs text-gray-600">
                              ↳{' '}
                              <span className="font-medium text-yellow-600">
                                {r.sender.split('@')[0]}
                              </span>: {r.message}
                            </div>
                          ))}
                          <div className="flex mt-2 space-x-2">
                            <input
                              type="text"
                              placeholder="Reply..."
                              value={replies[c._id] || ''}
                              onChange={e =>
                                setReplies(prev => ({ ...prev, [c._id]: e.target.value }))
                              }
                              className="flex-1 text-sm border rounded px-2 py-1"
                            />
                            <button
                              onClick={() => handleReply(c._id, proj.id)}
                              className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment[proj.id] || ''}
                        onChange={e =>
                          setNewComment(prev => ({ ...prev, [proj.id]: e.target.value }))
                        }
                        className="flex-1 border px-3 py-2 rounded"
                      />
                      <button
                        onClick={() => handleCommentSubmit(proj.id)}
                        className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

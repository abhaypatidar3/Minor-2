// src/components/Request.jsx
import React, { useState, useEffect } from 'react';
import { FiBell, FiClock } from 'react-icons/fi';
import client from '../api/client';

export default function Request() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({}); 
  // { [notificationId]: 'accepted' | 'rejected' }

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get('/notifications');
        setNotes(res.data.notifications || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const timeAgo = iso => {
    const delta = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (delta < 60) return `${delta}s ago`;
    if (delta < 3600) return `${Math.floor(delta/60)}m ago`;
    if (delta < 86400) return `${Math.floor(delta/3600)}h ago`;
    return `${Math.floor(delta/86400)}d ago`;
  };

  const handleDecision = async (notifId, projectId, userId, action) => {
    try {
      await client.post(
        `/projects/handle-request/${projectId}`,
        { userId, action }
      );
      setResults(r => ({ ...r, [notifId]: action }));
    } catch (err) {
      console.error('handle-request failed', err);
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading…</div>;
  if (error)   return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {notes.length === 0
        ? <p className="text-gray-500">You have no notifications.</p>
        : (
          <div className="space-y-4">
            {notes.map(n => {
              const { _id, message, isRead, createdAt, metadata } = n;
              const projectId   = metadata?.projectId;
              const senderEmail = metadata?.senderEmail;
              const result = results[_id]; // 'accepted'|'rejected'

              return (
                <div key={_id} className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
                  <div className="text-yellow-500 pt-1">
                    <FiBell size={24}/>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{message}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <FiClock /> <span>{timeAgo(createdAt)}</span>
                      {isRead
                        ? <span className="ml-4 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded">Read</span>
                        : <span className="ml-4 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">New</span>
                      }
                    </div>

                    {projectId && senderEmail && (
                      <div className="mt-3 space-x-2">
                        {result
                          ? (
                            <span
                              className={`px-3 py-1 rounded-full text-white ${
                                result === 'accept' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {result === 'accept' ? 'Accepted' : 'Rejected'}
                            </span>
                          )
                          : (
                            <>
                              <button
                                onClick={() => handleDecision(_id, projectId, senderEmail, 'accept')}
                                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleDecision(_id, projectId, senderEmail, 'reject')}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </>
                          )
                        }
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      }
    </div>
  );
}

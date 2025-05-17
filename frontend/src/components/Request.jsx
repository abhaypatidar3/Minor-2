// src/components/Request.jsx
import React, { useState, useEffect } from 'react';
import { FiBell, FiClock } from 'react-icons/fi';
import client from '../api/client';

export default function Request() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // track per-notification result: { [notifId]: 'accepted'|'rejected' }
  const [results, setResults] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get('/notifications');
        setNotes(res.data.notifications || []);
      } catch (err) {
        console.error(err);
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

  const handleDecision = async (notif, action) => {
    const { _id, metadata } = notif;
    if (!metadata?.projectId || !metadata.senderEmail) return;
    try {
      await client.post(
        `/projects/handle-request/${metadata.projectId}`,
        { userId: metadata.senderEmail, action }
      );
      setResults(r => ({ ...r, [_id]: action }));
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
      {notes.length === 0 ? (
        <p className="text-gray-500">You have no notifications.</p>
      ) : (
        <div className="space-y-4">
          {notes.map(n => {
            const isProjectReq = !!n.metadata?.projectId;
            const result = results[n._id];  // 'accepted'|'rejected' or undefined
            return (
              <div key={n._id} className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
                <div className="text-yellow-500">
                  <FiBell size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{n.message}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <FiClock /> <span>{timeAgo(n.createdAt)}</span>
                    {n.isRead
                      ? <span className="ml-4 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded">Read</span>
                      : <span className="ml-4 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">New</span>
                    }
                  </div>

                  {isProjectReq && (
                    <div className="mt-3 space-x-2">
                      {result
                        ? <span className={`px-3 py-1 rounded-full text-white ${result==='accepted' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {result.charAt(0).toUpperCase() + result.slice(1)}
                          </span>
                        : (
                          <>
                            <button
                              onClick={() => handleDecision(n, 'accept')}
                              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDecision(n, 'reject')}
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
      )}
    </div>
  );
}

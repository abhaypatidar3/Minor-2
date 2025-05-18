// src/components/CommentsSection.jsx
import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { FiSend } from 'react-icons/fi';

export default function CommentsSection({ projectId }) {
  const [comments, setComments] = useState([]);
  const [newMsg, setNewMsg]     = useState('');
  const [replyMsgs, setReplyMsgs] = useState({}); // commentId → current reply text
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  // fetch comments
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await client.get(`/comments/${projectId}`);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchComments();
  }, [projectId]);

  // post a new top-level comment
  const handlePostComment = async e => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    try {
      await client.post(`/comments/${projectId}`, { message: newMsg });
      setNewMsg('');
      fetchComments();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to post comment');
    }
  };

  // post a reply to commentId
  const handlePostReply = async (commentId) => {
    const msg = (replyMsgs[commentId] || '').trim();
    if (!msg) return;
    try {
      await client.post(`/comments/${commentId}/reply`, { message: msg });
      setReplyMsgs(r => ({ ...r, [commentId]: '' }));
      fetchComments();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to post reply');
    }
  };

  if (loading) return <p>Loading comments…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* New comment form */}
      <form onSubmit={handlePostComment} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          placeholder="Write a comment…"
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
        />
        <button type="submit" className="p-2 bg-yellow-400 rounded">
          <FiSend />
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map(c => (
          <div key={c._id} className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-700"><strong>{c.sender}</strong> · <em>{new Date(c.createdAt).toLocaleString()}</em></p>
            <p className="mt-1 mb-3">{c.message}</p>

            {/* replies */}
            <div className="pl-4 border-l space-y-2">
              {(c.replies || []).map(r => (
                <div key={r._id} className="bg-gray-50 p-2 rounded">
                  <p className="text-sm text-gray-600"><strong>{r.sender}</strong> · <em>{new Date(r.createdAt).toLocaleString()}</em></p>
                  <p className="mt-1">{r.message}</p>
                </div>
              ))}

              {/* reply form */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={replyMsgs[c._id] || ''}
                  onChange={e => setReplyMsgs(r => ({ ...r, [c._id]: e.target.value }))}
                  placeholder="Write a reply…"
                  className="flex-1 border rounded px-2 py-1 focus:outline-none text-sm"
                />
                <button
                  onClick={() => handlePostReply(c._id)}
                  className="p-2 bg-gray-200 rounded"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

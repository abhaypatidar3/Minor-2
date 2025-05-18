// src/components/ProjectDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import CommentsSection from './CommentsSection';
import { FiLoader } from 'react-icons/fi';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get(`/projects/${id}`);
        setProject(res.data.project);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div><FiLoader className="animate-spin" /> Loading…</div>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="mt-2">{project.description}</p>
      {/* …any other project info… */}

      {/* ←— HERE is the comments section */}
      <CommentsSection projectId={id} />
    </div>
  );
}

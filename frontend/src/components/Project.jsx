import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiBookmark } from "react-icons/fi";
import client from "../api/client";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await client.get("/projects");
        const data = res.data.projects || res.data;
        const adapted = data.map((p) => ({
          id: p._id,
          title: p.title || p.name || "Untitled",
          image: p.imageUrl || "/image/project.png",
          skills: Array.isArray(p.skills)
            ? p.skills
            : p.skills && typeof p.skills === "object"
            ? Object.values(p.skills)
            : [],
          projectType: p.projectType || "General",
          description: p.description || "",
          duration: p.duration || "N/A",
          coWorkers: p.coWorkers || [],
          status: p.status === "open" ? "OPEN" : "CLOSED",
        }));
        setProjects(adapted);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleRequest = async (projectId) => {
    setRequestStatus((s) => ({ ...s, [projectId]: 'loading' }));
    try {
      // Send request without an empty body to match backend expectations
      await client.post(`/projects/request/${projectId}`);
      setRequestStatus((s) => ({ ...s, [projectId]: 'requested' }));
    } catch (err) {
      console.error(err);
      // Capture and show backend error message if any
      const msg = err.response?.data?.message || 'Failed to request';
      setRequestStatus((s) => ({ ...s, [projectId]: 'error' }));
      alert(`Unable to send request: ${msg}`);
    }
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const term = search.toLowerCase();
      if (
        term &&
        !(
          p.title.toLowerCase().includes(term) ||
          p.skills.join(" ").toLowerCase().includes(term)
        )
      )
        return false;
      if (category !== "All" && !p.skills.includes(category)) return false;
      if (openOnly && p.status !== "OPEN") return false;
      return true;
    });
  }, [projects, search, category, openOnly]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-white min-h-screen">
      <div
        className="h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image/ExploreProfileImage.png')" }}
      >
        <h1 className="text-4xl text-white font-semibold">Explore Projects</h1>
      </div>

      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search skills or names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none"
          />
          <button className="p-2 bg-yellow-400 hover:opacity-90">
            <FiSearch className="text-black" />
          </button>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
        >
          <option value="All">All Category</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="MERN Stack">MERN Stack</option>
        </select>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Open Now Only</span>
          <button
            onClick={() => setOpenOnly((prev) => !prev)}
            className={`w-10 h-6 rounded-full p-1 transition ${
              openOnly ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transform transition ${
                openOnly ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6 p-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-32 h-32 object-cover"
            />
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900">
                  {p.title}
                </h2>
                <span
                  className={`px-2 py-1 text-sm font-medium rounded ${
                    p.status === "OPEN"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-700">
                <strong>Project Type:</strong> {p.projectType}
              </p>
              <p className="mt-1 text-gray-600 text-sm">{p.description}</p>
              <p className="mt-1 text-gray-600 text-sm">
                <strong>Duration:</strong> {p.duration}
              </p>
              <p className="mt-1 text-gray-600 text-sm">
                <strong>Co-Workers:</strong> {p.coWorkers.join(", ")}
              </p>
              <button
                onClick={() => handleRequest(p.id)}
                className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-full hover:opacity-90"
              >
                {requestStatus[p.id] === 'loading'
                  ? 'Requesting...'
                  : requestStatus[p.id] === 'requested'
                  ? 'Requested'
                  : 'Request To Join'}
              </button>
            </div>
            <button className="p-4 text-gray-600 hover:text-gray-900">
              <FiBookmark size={24} />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex justify-center items-center space-x-4 pb-8">
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          &lt;
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          &gt;
        </button>
      </div>
    </div>
  );
}

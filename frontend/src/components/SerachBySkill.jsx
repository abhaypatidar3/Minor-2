import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchBySkill = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch skill list from your backend
    axios
      .get('/api/v1/skills')
      .then((res) => {
        setAllSkills(res.data.skills);    // expecting { skills: ['React', 'UI/UX', ...] }
      })
      .catch((err) => {
        console.error('Failed to load skills', err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to your explore-profiles page with a query param
    navigate(`/explore?skill=${encodeURIComponent(skill)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2"
    >
      <FiSearch className="text-gray-400 text-xl" />
      <input
        list="skill-options"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Search by skill..."
        className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
      />
      <datalist id="skill-options">
        {allSkills.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
      <button
        type="submit"
        className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:opacity-90 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBySkill;

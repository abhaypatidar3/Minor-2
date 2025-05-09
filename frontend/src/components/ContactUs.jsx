import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with API endpoint
    console.log('Contact form submitted', form);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">
          Get in Touch
        </h2>
        <p className="mt-2 text-gray-400 text-center">
          We'd love to hear from you. Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

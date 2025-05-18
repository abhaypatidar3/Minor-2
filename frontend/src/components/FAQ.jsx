import React, { useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const faqs = [
  {
    question: 'What is SkillSwap?',
    answer:
      'SkillSwap is a platform for connecting professionals. You can showcase your skills, browse others, and collaborate through hiring or swapping services.',
  },
  {
    question: 'How do I create a profile?',
    answer:
      'Simply register with your details, list up to three skills, and add a profile picture. Your profile will then be visible to others in Explore.',
  },
  {
    question: 'Can I hire and swap simultaneously?',
    answer:
      'Yes! You can hire someone to do work for you, or offer your own services in exchange—whatever collaboration model you prefer.',
  },
  {
    question: 'How do reviews work?',
    answer:
      'After completing a job or swap, both parties can leave a star rating (out of 5) and a short text review to build trust in the community.',
  },
  {
    question: 'Is my payment information stored?',
    answer:
      'We never store your payment details on our servers—transactions are handled securely through our third-party payment processor.',
  },
];

// A set of tailwind gradient classes to cycle through
const gradients = [
  'from-blue-800 to-blue-400',
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center bg-clip-text text-transparent mb-12 bg-gradient-to-r from-purple-400 to-pink-500">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            const grad = gradients[idx % gradients.length];
            return (
              <div
                key={idx}
                className={`
                  rounded-2xl overflow-hidden transform transition
                  ${isOpen ? 'scale-105 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
                  bg-gradient-to-r ${grad}
                `}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
                >
                  <span
                    className={`
                      text-xl font-semibold transition-colors
                      text-white
                    `}
                  >
                    {item.question}
                  </span>
                  {isOpen ? (
                    <HiOutlineChevronUp className="text-white text-2xl" />
                  ) : (
                    <HiOutlineChevronDown className="text-white text-2xl" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 bg-white/80 text-gray-800 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <HiOutlineChevronUp className="text-gray-600" />
                  ) : (
                    <HiOutlineChevronDown className="text-gray-600" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-gray-700 leading-relaxed">
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

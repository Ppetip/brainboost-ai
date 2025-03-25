import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBrain } from 'react-icons/fa';

const navLinks = [
  { href: '/study-buddy', label: 'Study Buddy' },
  { href: '/quiz-generator', label: 'Quiz Generator' },
  { href: '/teacher', label: 'Teacher Tools' },
  { href: '/resources', label: 'Learning Resources' },
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FaBrain className="text-blue-400 text-2xl" />
            <span className="text-xl font-bold text-white">BrainBoost AI</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-blue-400 transition-colors
                  ${router.pathname === href 
                    ? 'text-blue-400' 
                    : 'text-gray-300'
                  }`}
              >
                {label}
              </Link>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 
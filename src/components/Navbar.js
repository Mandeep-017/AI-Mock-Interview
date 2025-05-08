import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 py-4 px-6 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-3 rounded-full shadow-md" />
        <span className="text-white text-2xl font-bold">CrackIt.AI</span>
      </div>
      <div className="space-x-6 text-white">
        <div className="relative inline-block group">
          <span className="cursor-pointer">Interview</span>
          <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg">
            <Link to="/interview-page?type=Technical" className="block px-4 py-2 hover:bg-gray-100">Technical</Link>
            <Link to="/interview-page?type=HR" className="block px-4 py-2 hover:bg-gray-100">HR</Link>
            <Link to="/interview-page?type=Behavioral" className="block px-4 py-2 hover:bg-gray-100">Behavioral</Link>
          </div>
        </div>
        <Link to="/contact" className="hover:text-gray-300">Contact</Link>

        {/* Added Resume Link */}
        <Link to="/resume-generator" className="hover:text-gray-300">Resume</Link>

      </div>
    </nav>
  );
}

export default Navbar;

// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow text-white text-center px-4">
        <div>
          <h1 className="text-4xl font-bold mb-6">Ace Your Next Interview with AI</h1>
          <p className="text-lg mb-8">Practice technical, HR, and behavioral questions with real-time feedback, voice input, and performance evaluation.</p>
          <Link
            to="/interview"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition"
          >
            Start Mock Interview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

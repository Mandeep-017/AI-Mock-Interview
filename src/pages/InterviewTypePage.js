import React from 'react';
import { useNavigate } from 'react-router-dom';

function InterviewTypePage() {
  const navigate = useNavigate();

  const handleInterviewStart = (type) => {
    navigate(`/interview-page?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">Choose Your Interview Type</h1>
      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => handleInterviewStart('Technical')}
          className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100"
        >
          Technical Interview
        </button>
        <button
          onClick={() => handleInterviewStart('HR')}
          className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100"
        >
          HR Interview
        </button>
        <button
          onClick={() => handleInterviewStart('Behavioral')}
          className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100"
        >
          Behavioral Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewTypePage;

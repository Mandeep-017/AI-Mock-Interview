import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import InterviewPage from './pages/InterviewPage';
import InterviewTypePage from './pages/InterviewTypePage';
import SummaryPage from './pages/SummaryPage';
import Contact from './Contact';
import ResumeGeneratorPage from './pages/ResumeGeneratorPage';  // Importing the new Resume Generator page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/interview" element={<InterviewTypePage />} />
        <Route path="/interview-page" element={<InterviewPage />} /> {/* Directly called from dropdown */}
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* New route for Resume Generator */}
        <Route path="/resume-generator" element={<ResumeGeneratorPage />} /> {/* Added resume generator route */}
      </Routes>
    </Router>
  );
}

export default App;

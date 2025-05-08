import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { responses, type } = location.state || {};
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (responses) {
      generateFeedback(responses);
      calculateAndSetScore(responses);  // Calculate score when responses are available
    }
  }, [responses]);

  const generateFeedback = async (responses) => {
    if (!responses || Object.keys(responses).length === 0) {
      setFeedback("No responses to provide feedback on.");
      return;
    }

    const formattedResponses = Object.entries(responses)
      .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
      .join("\n\n");

    const messages = [
      {
        role: "system",
        content:
          "You are an expert interview coach. Give constructive feedback on interview answers.",
      },
      {
        role: "user",
        content: `Please review the following responses and provide helpful feedback:\n\n${formattedResponses}`,
      },
    ];

    const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("❌ OpenRouter API key is missing");
      setFeedback("API key missing. Please check your .env file.");
      return;
    }

    console.log("🔑 Using OpenRouter API Key:", apiKey.slice(0, 5) + "...");
    console.log("📨 Sending prompt to OpenRouter...");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: messages,
        }),
      });

      const data = await response.json();
      console.log("✅ OpenRouter Response:", data);

      if (data.choices && data.choices[0]?.message?.content) {
        setFeedback(data.choices[0].message.content.trim());
      } else {
        setFeedback("No feedback generated. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error generating feedback:", error);
      setFeedback("An error occurred while generating feedback. Please try again.");
    }
  };

  // Function to calculate a score based on responses
  const calculateAndSetScore = (responses) => {
    let score = 0;
    Object.values(responses).forEach((response) => {
      // Example scoring based on response length
      if (response.length > 50) {
        score += 10;  // Assign points for longer answers
      }
      // Example: bonus for mentioning key interview-related words
      if (response.toLowerCase().includes("react")) {
        score += 5;  // Bonus for answering React-related questions correctly
      }
    });
    setScore(Math.min(score, 100)); // Ensure the score doesn't exceed 100
  };

  const handleRetake = () => {
    localStorage.removeItem(`interview-${type}`);
    navigate(`/interview?type=${type}`);
  };

  if (!responses || !type) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-gray-600 mb-4">No data available.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        {type} Interview Summary
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {Object.entries(responses).map(([question, answer], index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow">
            <p className="font-semibold text-gray-700 mb-2">
              Q{index + 1}: {question}
            </p>
            <p className="text-gray-800 whitespace-pre-line">
              {answer || "No answer provided."}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        {feedback && (
          <div className="bg-white p-6 rounded-xl shadow mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">AI Feedback</h3>
            <p className="text-gray-800 whitespace-pre-line">{feedback}</p>
          </div>
        )}

        {/* Score Display below AI Feedback */}
        {feedback && (
          <div className="bg-white p-6 rounded-xl shadow mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Score: {score}</h3>
          </div>
        )}

        {/* Retake and Home Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleRetake}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Retake Interview
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

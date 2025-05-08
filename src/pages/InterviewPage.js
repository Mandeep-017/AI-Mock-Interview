import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') || 'Technical';

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(60);
  const [responses, setResponses] = useState({});
  const [listening, setListening] = useState(false);

  const videoRef = useRef(null);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Mock AI Function to generate random questions for each type
  const generateQuestions = async (type) => {
    const aiGeneratedQuestions = {
      Technical: [
        "Can you explain the concept of React hooks?",
        "What is the difference between a class component and a functional component in React?",
        "What is state management, and why is it important in React?",
        "How would you optimize performance in a React application?",
        "Can you explain the Virtual DOM and its role in React?",
        "What is JSX?",
        "What are React fragments?",
        "What is the useEffect hook used for?",
        "What is prop drilling and how do you avoid it?",
        "Explain the concept of lifting state up in React."
      ],
      HR: [
        "What motivates you to perform well in a job?",
        "How do you prioritize tasks in a work environment?",
        "What would you do if you faced a challenge that seemed insurmountable?",
        "How do you handle conflict with coworkers?",
        "What do you think is the key to work-life balance?",
        "What are your greatest strengths?",
        "Where do you see yourself in 5 years?",
        "Describe your ideal work environment.",
        "How do you handle constructive criticism?",
        "Why should we hire you?"
      ],
      Behavioral: [
        "Tell me about a time when you had to work under pressure.",
        "Describe a situation where you had to adapt to a significant change in the workplace.",
        "Can you give an example of a time when you failed and how you handled it?",
        "How do you handle criticism?",
        "Tell me about a time when you led a team through a difficult project.",
        "Give an example of how you handled a disagreement with a coworker.",
        "Describe a time you had to meet a tight deadline.",
        "Tell me about a time you went above and beyond at work.",
        "How do you stay motivated during long projects?",
        "Give an example of a time when you showed initiative."
      ]
    };

    // Shuffle and return 5 random questions
    const shuffled = shuffleArray(aiGeneratedQuestions[type]);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(shuffled.slice(0, 5));
      }, 500);
    });
  };

  useEffect(() => {
    generateQuestions(type).then((generatedQuestions) => {
      setQuestions(generatedQuestions);
    });
    setCurrent(0);
    setAnswer("");
    setResponses({});
    setTimer(60);
  }, [type]);

  useEffect(() => {
    if (timer > 0 && current < questions.length) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && current < questions.length) {
      handleNext();
    }
  }, [timer, current, questions]);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  useEffect(() => {
    startVideoStream();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
        speak("Listening, please speak your answer.");
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setAnswer(transcript);
      };

      recognition.start();
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();  // Stop any ongoing speech
    setResponses(prev => ({ ...prev, [questions[current]]: answer }));
    setAnswer("");
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimer(60);
      speak(questions[current + 1]);  // Speak next question
    } else {
      navigate("/summary", { state: { responses, type } });
    }
  };

  useEffect(() => {
    // Cleanup effect to cancel speech when the component unmounts or user navigates
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{type} Interview</h2>

        <div className="mb-6">
          <p className="text-lg mb-4">{questions[current]}</p>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="mt-4 text-sm">Time remaining: {timer}s</div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleVoiceInput}
            className={`px-6 py-2 rounded-lg ${listening ? 'bg-red-600' : 'bg-green-600'} text-white flex items-center`}
          >
            <span className={`material-icons ${listening ? 'animate-pulse' : ''} mr-2`}>mic</span>
            {listening ? "Listening..." : "Start Voice Input"}
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Next
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-sm h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex justify-center items-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;

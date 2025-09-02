import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { AudioLines } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";
import { User, LogOut } from "lucide-react"; // Import icons

// Modal component with a soft design
const Modal = ({ message, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 transition-opacity duration-300 animate-fade-in">
      <Header />
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-sm w-full mx-4 transform scale-95 animate-scale-in border border-red-700">
        <h3 className="text-2xl font-bold mb-4 text-red-800">Notification</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
        >
          Got It
        </button>
      </div>
    </div>,
    document.body
  );
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm your GlucoMate AI. Ask me anything about health, nutrition, or blood sugar management.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Function to navigate to voice chat page
  const goToVoiceChat = () => {
    navigate('/voicechat');
  };

  const getBotReply = async (userMessage) => {
    // Construct chat history payload for Gemini API
    let chatHistory = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "text/plain",
      },
    };
    const apiKey = ""; // <-- Add your API key here
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const maxRetries = 5;
    let retries = 0;
    let response;

    while (retries < maxRetries) {
      try {
        response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) break;
      } catch (error) {
        console.error("Fetch failed, retrying...", error);
      }
      retries++;
      await new Promise((res) => setTimeout(res, 2 ** retries * 1000));
    }

    if (!response || !response.ok) {
      console.error("API call failed after multiple retries");
      return "Sorry, I am unable to connect right now. Please try again later.";
    }

    const result = await response.json();
    return (
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText) return;

    const userMessage = { id: Date.now(), sender: "user", text: userMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponseText = await getBotReply(userMessageText);
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botResponseText,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting bot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col px-4 py-12 font-sans">
      {/* Header with back button and user icon with dropdown */}
      <div className="w-full max-w-2xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
        
        {/* User icon with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-semibold hover:bg-red-800 transition-colors duration-300"
          >
            {getUserInitials()}
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/accountpage');
                }}
                className="block w-full text-left px-4 py-3 flex items-center text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <User size={18} className="mr-2" />
                View Profile
              </button>
              <button
                className="w-full text-left px-4 py-3 flex items-center text-red-600 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setShowDropdown(false);
                }}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 z-10 flex flex-col h-[600px] md:h-[700px] overflow-hidden">
        {/* Chatbot Header */}
        <div className="p-6 bg-red-800 text-white flex items-center justify-center rounded-t-2xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.00M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h2 className="text-3xl font-bold tracking-tight">GlucoMate Chatbot</h2>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map(({ id, sender, text }) => (
            <div
              key={id}
              className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] px-5 py-3 rounded-2xl shadow-md transform transition-all duration-300 ${
                  sender === "user"
                    ? "bg-red-800 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                }`}
              >
                {text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] px-5 py-3 rounded-2xl rounded-bl-none bg-white text-gray-800 border border-gray-100 shadow-md">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Ask me about your health..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-6 py-3 text-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all duration-300 pr-12"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  isListening 
                    ? "bg-red-800 text-white animate-pulse" 
                    : "text-gray-500 hover:text-red-800 hover:bg-gray-100"
                } transition-colors duration-300`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={goToVoiceChat}
              className={`bg-red-800 text-white font-semibold p-3 rounded-full shadow-lg hover:bg-red-900 transition-colors duration-300 transform active:scale-95 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <AudioLines size={24} />
            </button>
          </div>
        </form>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-red-700 mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
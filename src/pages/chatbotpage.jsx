// src/pages/ChatbotPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Header from "../components/header";
import { AudioLines } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ==============================
// Inlined API (no separate .js)
// ==============================
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const CHAT_BASE = `${API_BASE}/api/v1/chat`;

function authHeaders() {
  const token = localStorage.getItem("accessToken") || "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function apiGetStatus() {
  const resp = await fetch(`${CHAT_BASE}/status`, { headers: authHeaders() });
  if (!resp.ok) throw new Error("Failed to get status");
  return resp.json();
}

async function apiSendMessage(message, sessionId) {
  const resp = await fetch(`${CHAT_BASE}/message`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ message, language: "en", session_id: sessionId }),
  });
  // Handle errors with status surfaced
  if (!resp.ok) {
    let body = {};
    try { body = await resp.json(); } catch {}
    const err = new Error(body?.message || `Send failed (${resp.status})`);
    err.status = resp.status;
    throw err;
  }
  return resp.json();
}

async function apiGetSessions() {
  const resp = await fetch(`${CHAT_BASE}/history`, { headers: authHeaders() });
  if (!resp.ok) throw new Error("Failed to get sessions");
  return resp.json();
}

async function apiGetSessionMessages(sessionId) {
  const resp = await fetch(`${CHAT_BASE}/history/${sessionId}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error("Failed to get session messages");
  return resp.json();
}

async function apiEndSession(sessionId) {
  const resp = await fetch(`${CHAT_BASE}/session/${sessionId}/end`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({}),
  });
  if (!resp.ok) throw new Error("Failed to end session");
  return resp.json();
}

// ==============================
// Modal
// ==============================
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

// ==============================
// Page
// ==============================
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
  const [online, setOnline] = useState(true);
  const [sessionId, setSessionId] = useState(undefined);
  const [showModal, setShowModal] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const goToVoiceChat = () => navigate("/voicechat");

  // Initial load: status + latest session
  useEffect(() => {
    (async () => {
      try {
        const status = await apiGetStatus();
        setOnline(!!status.glucomate_available);

        const hist = await apiGetSessions();
        if (hist.sessions?.length) {
          const latestId = hist.sessions[0].id;
          const full = await apiGetSessionMessages(latestId);
          setSessionId(latestId);

          const mapped = full.messages.map((m) => ({
            id: m.id,
            sender: m.sender === "user" ? "user" : "bot",
            text: m.text,
          }));

          setMessages((prev) => [prev[0], ...mapped]); // keep welcome then history
        }
      } catch (e) {
        setOnline(false);
        setShowModal(
          "Could not connect to GlucoMate. Ensure you are logged in (JWT present) and CORS is allowed."
        );
      }
    })();
  }, []);

  // Send message -> backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText) return;

    const userMessage = { id: Date.now(), sender: "user", text: userMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await apiSendMessage(userMessageText, sessionId);
      setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: data.bot_response.id || Date.now() + 1,
          sender: "bot",
          text: data.bot_response.text,
        },
      ]);
    } catch (err) {
      console.error("Send failed:", err);
      if (err?.status === 401) {
        setShowModal("Your session expired. Please log in again.");
      } else if (err?.status === 503) {
        setShowModal("GlucoMate is temporarily unavailable. Try again shortly.");
      } else if (err?.status === 400) {
        setShowModal(err.message || "Invalid request.");
      } else {
        setShowModal("Something went wrong. Please try again.");
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "Error sending message." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = async () => {
    if (!sessionId) return;
    try {
      await apiEndSession(sessionId);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: "Session ended. Start a new message to begin again." },
      ]);
      setSessionId(undefined);
    } catch (e) {
      setShowModal("Could not end session.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4 py-12 font-sans">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-10 flex flex-col h-[600px] md:h-[700px] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-800 text-white flex items-center justify-between rounded-t-2xl shadow-sm">
          <div className="flex items-center">
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
          <div className="text-sm">{online ? "Online" : "Offline"}</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map(({ id, sender, text }) => (
            <div key={id} className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
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

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Ask me about your health..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-6 py-3 text-lg focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all duration-300 pr-28"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={isLoading || !recognitionRef.current}
                  className={`p-2 rounded-full ${
                    isListening
                      ? "bg-red-800 text-white animate-pulse"
                      : "text-gray-500 hover:text-red-800 hover:bg-gray-100"
                  } transition-colors duration-300`}
                  title="Dictate"
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
                <button
                  type="button"
                  onClick={goToVoiceChat}
                  className={`bg-red-800 text-white font-semibold p-2 rounded-full shadow-lg hover:bg-red-900 transition-colors duration-300 transform active:scale-95 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                  title="Voice Chat Page"
                >
                  <AudioLines size={20} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-red-800 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-red-900 transition-colors duration-300 transform active:scale-95 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Send
            </button>

            <button
              type="button"
              onClick={endSession}
              disabled={!sessionId}
              className="px-4 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
              title="End session"
            >
              End
            </button>
          </div>
        </form>
      </div>

      {showModal && <Modal message={showModal} onClose={() => setShowModal(null)} />}
    </div>
  );
};

export default ChatbotPage;

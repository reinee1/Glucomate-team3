import React, { useState, useEffect, useRef } from "react";
import { AudioWaveform } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

const VoiceChatPage = () => {
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const { user } = useUser();

  // Function to navigate back to home page
  const goBackToHome = () => {
    navigate('/');
  };

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsUserTalking(true);
        setInterimTranscript("");
        setFinalTranscript("");
      };
      
      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        
        setInterimTranscript(interim);
        if (final) {
          setFinalTranscript(final);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsUserTalking(false);
      };
      
      recognition.onend = () => {
        setIsUserTalking(false);
        
        // If we have a final transcript, process it
        if (finalTranscript) {
          processUserInput(finalTranscript);
        } else if (interimTranscript) {
          // If we only have interim results, use them
          processUserInput(interimTranscript);
        }
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
  }, [finalTranscript, interimTranscript]);

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        // Show immediate feedback that we're listening
        setInterimTranscript("Listening...");
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Process user input and generate bot response
  const processUserInput = (userMessage) => {
    // Don't process if it's just the "Listening..." message
    if (userMessage === "Listening...") return;
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev,
      { speaker: 'user', text: userMessage }
    ]);
    
    // Clear transcripts
    setInterimTranscript("");
    setFinalTranscript("");
    
    // Show bot is thinking
    setIsBotTalking(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate response based on user input
      let botResponse = generateBotResponse(userMessage);
      
      // Add bot response to conversation
      setConversation(prev => [
        ...prev,
        { speaker: 'bot', text: botResponse }
      ]);
      
      setIsBotTalking(false);
    }, 2000);
  };

  // Generate bot response based on user input
  const generateBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Simple response logic based on keywords
    if (lowerCaseMessage.includes('sugar') || lowerCaseMessage.includes('glucose')) {
      return "Managing blood sugar levels is important. I recommend monitoring your carbohydrate intake, staying hydrated, and getting regular exercise.";
    } else if (lowerCaseMessage.includes('diet') || lowerCaseMessage.includes('food') || lowerCaseMessage.includes('eat')) {
      return "A balanced diet with plenty of vegetables, lean proteins, and whole grains can help manage diabetes. Try to limit processed foods and sugary drinks.";
    } else if (lowerCaseMessage.includes('exercise') || lowerCaseMessage.includes('workout') || lowerCaseMessage.includes('activity')) {
      return "Regular physical activity helps your body use insulin more efficiently. Aim for at least 30 minutes of moderate exercise most days of the week.";
    } else if (lowerCaseMessage.includes('medication') || lowerCaseMessage.includes('insulin') || lowerCaseMessage.includes('pill')) {
      return "It's important to take medications as prescribed by your doctor. Never adjust your medication without consulting your healthcare provider.";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello! I'm your GlucoMate AI. How can I help you with diabetes management today?";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about managing your diabetes?";
    } else {
      return "I'm here to help with diabetes management. You can ask me about nutrition, exercise, medication, or monitoring your blood sugar levels. What specific question do you have?";
    }
  };

  // Animation for the talking circle
  useEffect(() => {
    if (isUserTalking && animationRef.current) {
      const circle = animationRef.current;
      let scale = 1;
      let growing = true;
      
      const animate = () => {
        if (growing) {
          scale += 0.02;
          if (scale >= 1.2) growing = false;
        } else {
          scale -= 0.02;
          if (scale <= 1) growing = true;
        }
        
        circle.style.transform = `scale(${scale})`;
        
        if (isUserTalking) {
          requestAnimationFrame(animate);
        } else {
          circle.style.transform = 'scale(1)';
        }
      };
      
      animate();
    }
  }, [isUserTalking]);

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

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col px-4 py-12 font-sans">
      {/* Header with back button and user icon */}
      <div className="w-full max-w-2xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={goBackToHome}
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
        
        {/* User icon with initials */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-semibold">
            {getUserInitials()}
          </div>
        </div>
      </div>

      <div className="relative max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 z-10 flex flex-col h-[600px] md:h-[700px] overflow-hidden">
        {/* Header with back button */}
        <div className="p-6 bg-red-800 text-white flex items-center justify-between rounded-t-2xl shadow-sm">
          <button
            onClick={goBackToHome}
            className="p-2 rounded-full hover:bg-red-900 transition-colors duration-300"
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
          <h2 className="text-3xl font-bold tracking-tight">GlucoMate Voice Chat</h2>
          <div className="w-10"></div> {/* Spacer to balance the header */}
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {conversation.length === 0 && !isUserTalking ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="mb-6 text-red-800">
                <AudioWaveform size={64} />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Voice Chat</h3>
              <p className="text-gray-600 max-w-md">
                Press the microphone button to start a voice conversation about your health concerns.
              </p>
            </div>
          ) : (
            <>
              {conversation.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${item.speaker === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] px-5 py-3 rounded-2xl shadow-md ${
                      item.speaker === "user"
                        ? "bg-red-800 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
              
              {/* Show interim transcript while user is talking */}
              {isUserTalking && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] sm:max-w-[70%] px-5 py-3 rounded-2xl rounded-br-none bg-red-200 text-red-800 italic">
                    {interimTranscript || "Listening..."}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Voice Interaction Area */}
        <div className="p-6 border-t border-gray-100 bg-white flex flex-col items-center">
          {/* User talking indicator */}
          {isUserTalking && (
            <div className="mb-6 flex flex-col items-center">
              <div className="text-red-800 font-semibold mb-2">Speak now...</div>
              <div 
                ref={animationRef}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bot talking indicator */}
          {isBotTalking && (
            <div className="mb-6 flex flex-col items-center">
              <div className="text-red-800 font-semibold mb-2">GlucoMate is responding...</div>
              <div className="animate-pulse">
                <AudioWaveform size={48} className="text-red-800" />
              </div>
            </div>
          )}

          {/* Microphone Button */}
          <button
            onClick={startListening}
            disabled={isUserTalking || isBotTalking}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 transform active:scale-95 ${
              isUserTalking || isBotTalking
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-900"
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white" 
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
          
          {/* Instructions */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Press the microphone and speak. Your words will be transcribed automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage;
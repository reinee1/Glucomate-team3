import React, { useState } from "react";
import Header from "../components/header";
import HeroSection from "../components/herosection";
import FunFactsSection from "../components/funfacts";
import FeaturesSection from "../components/features";
import HowItWorksSection from "../components/tutorial";
import { useUser } from "../contexts/UserContext";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useUser();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // If user is authenticated, check if they've completed all forms
      // For now, just redirect to chatbot as an example
      window.location.href = "/chatbot";
    } else {
      // If not authenticated, show signup modal or redirect to signup
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-80 font-sans leading-relaxed">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />

      <FunFactsSection />
      
      <HowItWorksSection />

      {/* Modal for non-authenticated users */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-red-700 mb-4">Get Started with GlucoMate</h3>
            <p className="mb-6">Create an account to start managing your diabetes effectively.</p>
            <div className="flex gap-4">
              <a 
                href="/signuppage" 
                className="flex-1 bg-red-700 text-white text-center font-bold py-2 rounded-md hover:bg-red-800"
              >
                Sign Up
              </a>
              <a 
                href="/login" 
                className="flex-1 border border-red-700 text-red-700 text-center font-bold py-2 rounded-md hover:bg-red-50"
              >
                Login
              </a>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
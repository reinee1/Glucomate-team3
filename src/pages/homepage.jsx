import React, { useState } from "react";
import Header from "../components/header";// adjust the path if needed
import HeroSection from "../components/herosection";
import FunFactsSection from "../components/funfacts";
import FeaturesSection from "../components/features";
import HowItWorksSection from "../components/tutorial";


const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
  
    const handleGetStarted = () => {
      setShowModal(true);
    };
  
    return (
      <div className="min-h-screen bg-white text-gray-800 font-sans leading-relaxed">
        <Header />
  
        <HeroSection />
  
        <FeaturesSection />
  
        <FunFactsSection />
        
        <HowItWorksSection />
  
        {/* Add footer if you want here */}
  
        {/* Modal code if you want, or manage elsewhere */}
      </div>
    );
  };
  
  export default HomePage;
import React from "react";

const HeroSection = () => {
  return (
    <header className="relative w-full overflow-hidden text-center py-24 md:py-32 bg-red-900 text-white">
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-950 to-red-900 opacity-80"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter">
          Your Health Reimagined
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-red-200">
          Your AI-powered diabetes companion — personalized insights, real-time
          tracking, and friendly chatbot support to take control of your health.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;

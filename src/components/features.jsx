import React from "react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="mt-20 max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3"
    >
      <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-3 text-red-800">
          Personalized AI Insights
        </h2>
        <p className="text-gray-700 text-lg">
          GlucoMate analyzes your health data to give tailored recommendations
          for blood sugar management.
        </p>
      </div>
      <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-3 text-red-800">Real-Time Tracking</h2>
        <p className="text-gray-700 text-lg">
          Log your meals, exercise, and glucose levels easily and see your
          progress live.
        </p>
      </div>
      <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-3 text-red-800">Friendly Chatbot</h2>
        <p className="text-gray-700 text-lg">
          Ask questions and get instant advice from your AI-powered diabetes
          companion.
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;

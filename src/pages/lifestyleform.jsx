import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LifestyleHabitsPage = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    smokingStatus: "",
    alcoholConsumption: "",
    exerciseFrequency: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.smokingStatus || !formData.alcoholConsumption || !formData.exerciseFrequency) {
      setErrorMsg("Please answer all questions.");
      return;
    }
    
    setErrorMsg("");
    console.log("Lifestyle and Habits:", formData);
    alert("Lifestyle information saved successfully!");
    navigate("/chatbot"); // Navigate to another route
  };

  const smokingOptions = [
    { value: "never", label: "Never Smoked" },
    { value: "former", label: "Former Smoker" },
    { value: "current", label: "Current Smoker" }
  ];

  const alcoholOptions = [
    { value: "never", label: "Never" },
    { value: "occasionally", label: "Occasionally" },
    { value: "frequently", label: "Frequently" }
  ];

  const exerciseOptions = [
    { value: "sedentary", label: "Sedentary (Little to no exercise)" },
    { value: "light", label: "Light (1-2 times/week)" },
    { value: "moderate", label: "Moderate (3-4 times/week)" },
    { value: "active", label: "Active (5+ times per week)" }
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative bg-white"
      style={{
        backgroundImage:
          'url("https://news.ki.se/sites/nyheter/files/qbank/blood-1813410_1920_pixabay-custom20211103151915.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <div className="relative max-w-2xl w-full bg-white rounded-lg p-12 border border-red-200 z-10">
        <h2 className="text-4xl font-extrabold text-red-800 mb-8 text-center select-none">
          Lifestyle & Habits
        </h2>
        
        {errorMsg && (
          <p className="text-red-600 mb-6 text-center font-semibold">{errorMsg}</p>
        )}

        <div className="space-y-10">
          
          {/* Smoking Status */}
          <div>
            <label className="block mb-6 font-medium text-gray-700 text-lg">
              Smoking Status *
            </label>
            <div className="space-y-4">
              {smokingOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="smokingStatus"
                    value={option.value}
                    checked={formData.smokingStatus === option.value}
                    onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Alcohol Consumption */}
          <div>
            <label className="block mb-6 font-medium text-gray-700 text-lg">
              Alcohol Consumption *
            </label>
            <div className="space-y-4">
              {alcoholOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="alcoholConsumption"
                    value={option.value}
                    checked={formData.alcoholConsumption === option.value}
                    onChange={(e) => handleInputChange('alcoholConsumption', e.target.value)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Exercise Frequency */}
          <div>
            <label className="block mb-6 font-medium text-gray-700 text-lg">
              Exercise Frequency *
            </label>
            <div className="space-y-4">
              {exerciseOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="exerciseFrequency"
                    value={option.value}
                    checked={formData.exerciseFrequency === option.value}
                    onChange={(e) => handleInputChange('exerciseFrequency', e.target.value)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-md shadow-lg transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LifestyleHabitsPage;
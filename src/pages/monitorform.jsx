import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const MonitoringControlPage = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    bloodSugarMonitoring: "",
    hba1cReading: "",
    usesCGM: "",
    cgmFrequency: "",
    frequentHypoglycemia: "",
    hypoglycemiaFrequency: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation for required fields
    if (!formData.bloodSugarMonitoring || !formData.usesCGM || !formData.frequentHypoglycemia) {
      setErrorMsg("Please answer all required questions.");
      return;
    }

    // Validate conditional fields
    if (formData.usesCGM === "yes" && !formData.cgmFrequency.trim()) {
      setErrorMsg("Please specify how often you check your CGM.");
      return;
    }

    if (formData.frequentHypoglycemia === "yes" && !formData.hypoglycemiaFrequency.trim()) {
      setErrorMsg("Please specify how often you experience hypoglycemia.");
      return;
    }

    // Validate HbA1c if provided
    if (formData.hba1cReading && (isNaN(formData.hba1cReading) || formData.hba1cReading < 4 || formData.hba1cReading > 20)) {
      setErrorMsg("Please enter a valid HbA1c reading (between 4% and 20%).");
      return;
    }
    
    setErrorMsg("");
    console.log("Monitoring and Control:", formData);
    alert("All information saved successfully! Registration complete!");
    navigate("/lifestyleform"); // Navigate to another route
  };

  const monitoringOptions = [
    { value: "never", label: "Never" },
    { value: "once_daily", label: "Once a day" },
    { value: "multiple_daily", label: "Multiple times a day" }
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
          Monitoring & Control
        </h2>
        
        {errorMsg && (
          <p className="text-red-600 mb-6 text-center font-semibold">{errorMsg}</p>
        )}

        <div className="space-y-8">
          
          {/* Blood Sugar Monitoring Frequency */}
          <div>
            <label className="block mb-6 font-medium text-gray-700 text-lg">
              How often do you monitor your blood sugar? *
            </label>
            <div className="space-y-4">
              {monitoringOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="bloodSugarMonitoring"
                    value={option.value}
                    checked={formData.bloodSugarMonitoring === option.value}
                    onChange={(e) => handleInputChange('bloodSugarMonitoring', e.target.value)}
                    className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Latest HbA1c Reading */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              What is your latest HbA1c reading? (Optional)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="4"
                max="20"
                value={formData.hba1cReading}
                onChange={(e) => handleInputChange('hba1cReading', e.target.value)}
                placeholder="e.g., 7.2"
                className="w-full border border-gray-300 rounded-md px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                %
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Normal range is typically 4-6%. Enter your most recent test result.
            </p>
          </div>

          {/* Continuous Glucose Monitor */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Do you use a Continuous Glucose Monitor (CGM)? *
            </label>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="usesCGM"
                  value="yes"
                  checked={formData.usesCGM === "yes"}
                  onChange={(e) => handleInputChange('usesCGM', e.target.value)}
                  className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium text-lg">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="usesCGM"
                  value="no"
                  checked={formData.usesCGM === "no"}
                  onChange={(e) => handleInputChange('usesCGM', e.target.value)}
                  className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium text-lg">No</span>
              </label>
            </div>
            
            {formData.usesCGM === "yes" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  How often do you check your CGM readings?
                </label>
                <input
                  type="text"
                  value={formData.cgmFrequency}
                  onChange={(e) => handleInputChange('cgmFrequency', e.target.value)}
                  placeholder="e.g., every 2 hours, constantly throughout the day..."
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
              </div>
            )}
          </div>

          {/* Frequent Hypoglycemia */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Do you experience frequent hypoglycemia (low blood sugar)? *
            </label>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="frequentHypoglycemia"
                  value="yes"
                  checked={formData.frequentHypoglycemia === "yes"}
                  onChange={(e) => handleInputChange('frequentHypoglycemia', e.target.value)}
                  className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium text-lg">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="frequentHypoglycemia"
                  value="no"
                  checked={formData.frequentHypoglycemia === "no"}
                  onChange={(e) => handleInputChange('frequentHypoglycemia', e.target.value)}
                  className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium text-lg">No</span>
              </label>
            </div>
            
            {formData.frequentHypoglycemia === "yes" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  How often do you experience hypoglycemia?
                </label>
                <input
                  type="text"
                  value={formData.hypoglycemiaFrequency}
                  onChange={(e) => handleInputChange('hypoglycemiaFrequency', e.target.value)}
                  placeholder="e.g., 2-3 times per week, daily, monthly..."
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-md shadow-lg transition-colors duration-300 text-lg"
          >
            Submit & Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringControlPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const PersonalInfoPage = () => {
const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    birthMonth: "1",
    birthDay: "1",
    birthYear: "1990",
    gender: "",
    height: "170",
    heightUnit: "cm",
    weight: "70",
    weightUnit: "kg",
    diabetesType: "",
    diagnosisYear: "2020",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 80 }, (_, i) => 2025 - i); // <-- update year

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.gender || !formData.diabetesType) {
      setErrorMsg("Please fill in all required fields.");
return;
    }
    setErrorMsg("");
    console.log("Personal Info:", formData);
    alert("Personal information saved successfully!");
    navigate("/medicalinfo"); // Navigate to another route
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative bg-white"
      style={{
        backgroundImage:
          'url("https://news.ki.se/sites/nyheter/files/qbank/blood-1813410_1920_pixabay-custom20211103151915.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative max-w-2xl w-full bg-white rounded-lg p-12 border border-red-200 z-10">
        <h2 className="text-4xl font-extrabold text-red-800 mb-8 text-center select-none">
          Personal Information
        </h2>

        {errorMsg && (
          <p className="text-red-600 mb-6 text-center font-semibold">{errorMsg}</p>
        )}

        <div className="space-y-8">
          {/* DOB */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Date of Birth *
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">Month</label>
                <select
                  value={formData.birthMonth}
                  onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">Day</label>
                <select
                  value={formData.birthDay}
                  onChange={(e) => handleInputChange("birthDay", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">Year</label>
                <select
                  value={formData.birthYear}
                  onChange={(e) => handleInputChange("birthYear", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3"
            >
              <option value="">Please Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Height *
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="range"
                  min={formData.heightUnit === "cm" ? "100" : "36"}
                  max={formData.heightUnit === "cm" ? "250" : "96"}
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2 font-semibold text-gray-700">
                  {formData.height} {formData.heightUnit}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("heightUnit", "cm");
                    handleInputChange("height", "170");
                  }}
                  className={`px-4 py-2 rounded-md font-medium ${
                    formData.heightUnit === "cm" ? "bg-red-700 text-white" : "bg-gray-200"
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("heightUnit", "ft/in");
                    handleInputChange("height", "60");
                  }}
                  className={`px-4 py-2 rounded-md font-medium ${
                    formData.heightUnit === "ft/in" ? "bg-red-700 text-white" : "bg-gray-200"
                  }`}
                >
                  ft/in
                </button>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Weight *
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="range"
                  min={formData.weightUnit === "kg" ? "30" : "66"}
                  max={formData.weightUnit === "kg" ? "200" : "440"}
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2 font-semibold text-gray-700">
                  {formData.weight} {formData.weightUnit}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("weightUnit", "kg");
                    handleInputChange("weight", "70");
                  }}
                  className={`px-4 py-2 rounded-md font-medium ${
                    formData.weightUnit === "kg" ? "bg-red-700 text-white" : "bg-gray-200"
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("weightUnit", "lb");
                    handleInputChange("weight", "154");
                  }}
                  className={`px-4 py-2 rounded-md font-medium ${
                    formData.weightUnit === "lb" ? "bg-red-700 text-white" : "bg-gray-200"
                  }`}
                >
                  lb
                </button>
              </div>
            </div>
          </div>

          {/* Type of Diabetes */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Type of Diabetes *
            </label>
            <select
              value={formData.diabetesType}
              onChange={(e) => handleInputChange("diabetesType", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3"
            >
              <option value="">Please Select</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
              <option value="gestational">Gestational</option>
              <option value="other">Other</option>
            </select>
          </div>
          

          {/* Year of Diagnosis */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Year of Diagnosis *
            </label>
            <div>
              <input
                type="range"
                min="1970"
                max="2025"  // <-- update year
                value={formData.diagnosisYear}
                onChange={(e) => handleInputChange("diagnosisYear", e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2 font-semibold text-gray-700">
                {formData.diagnosisYear}
              </div>
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

export default PersonalInfoPage;
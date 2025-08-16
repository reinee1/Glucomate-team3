import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MedicalHistoryPage = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    medicalConditions: [],
    otherCondition: "",
    familyHeartDisease: "",
    familyMember: "",
    medications: [{ name: "", dosage: "", frequency: "" }],
    takingInsulin: "",
    insulinType: "",
    insulinDosage: "",
    insulinSchedule: "",
    allergies: ""
  });
  const [errorMsg, setErrorMsg] = useState("");

  const medicalConditionOptions = [
    "High Blood Pressure",
    "High Cholesterol", 
    "Heart Disease",
    "Kidney Disease",
    "Neuropathy",
    "Retinopathy",
    "Obesity",
    "PCOS",
    "Depression or Anxiety",
    "Other"
  ];

  const handleConditionChange = (condition) => {
    const updatedConditions = formData.medicalConditions.includes(condition)
      ? formData.medicalConditions.filter(c => c !== condition)
      : [...formData.medicalConditions, condition];
    
    setFormData(prev => ({
      ...prev,
      medicalConditions: updatedConditions
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      medications: updatedMedications
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "" }]
    }));
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      const updatedMedications = formData.medications.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        medications: updatedMedications
      }));
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (formData.medicalConditions.length === 0) {
      setErrorMsg("Please select at least one medical condition.");
      return;
    }
    
    if (formData.medicalConditions.includes("Other") && !formData.otherCondition.trim()) {
      setErrorMsg("Please specify the other medical condition.");
      return;
    }
  
    if (!formData.familyHeartDisease) {
      setErrorMsg("Please answer the family heart disease question.");
      return;
    }
  
    if (formData.familyHeartDisease === "yes" && !formData.familyMember.trim()) {
      setErrorMsg("Please specify the family member with heart disease.");
      return;
    }
  
    if (!formData.takingInsulin) {
      setErrorMsg("Please answer the insulin question.");
      return;
    }
  
    if (formData.takingInsulin === "yes" && (!formData.insulinType.trim() || !formData.insulinDosage.trim() || !formData.insulinSchedule.trim())) {
      setErrorMsg("Please fill in all insulin information.");
      return;
    }
  
    // If all validations pass
    setErrorMsg("");
    console.log("Medical History:", formData);
    alert("Medical history saved successfully!");
    navigate("/monitorform");
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
        filter: "brightness(1)",
      }}
    >
      <div className="relative max-w-3xl w-full bg-white rounded-lg p-12 border border-red-200 z-10 my-8">
        <h2 className="text-4xl font-extrabold text-red-800 mb-8 text-center select-none">
          Medical History
        </h2>
        
        {errorMsg && (
          <p className="text-red-600 mb-6 text-center font-semibold">{errorMsg}</p>
        )}

        <div className="space-y-8">
          
          {/* Other Medical Conditions */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Other Medical Conditions (Check all that apply) *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {medicalConditionOptions.map((condition) => (
                <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium">{condition}</span>
                </label>
              ))}
            </div>
            
            {formData.medicalConditions.includes("Other") && (
              <div className="mt-4">
                <input
                  type="text"
                  value={formData.otherCondition}
                  onChange={(e) => handleInputChange('otherCondition', e.target.value)}
                  placeholder="Please specify other condition..."
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
              </div>
            )}
          </div>

          {/* Family History */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Family History of Heart Disease *
            </label>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="familyHeartDisease"
                  value="yes"
                  checked={formData.familyHeartDisease === "yes"}
                  onChange={(e) => handleInputChange('familyHeartDisease', e.target.value)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="familyHeartDisease"
                  value="no"
                  checked={formData.familyHeartDisease === "no"}
                  onChange={(e) => handleInputChange('familyHeartDisease', e.target.value)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">No</span>
              </label>
            </div>
            
            {formData.familyHeartDisease === "yes" && (
              <input
                type="text"
                value={formData.familyMember}
                onChange={(e) => handleInputChange('familyMember', e.target.value)}
                placeholder="Who? (e.g., mother, father, brother, sister...)"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
              />
            )}
          </div>

          {/* Current Medications */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Current Medications
            </label>
            {formData.medications.map((medication, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    placeholder="Medication name"
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                  />
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    placeholder="Dosage (e.g., 10mg)"
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      placeholder="Frequency (e.g., twice daily)"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                    />
                    {formData.medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedication(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition"
            >
              <Plus size={16} />
              Add Medication
            </button>
          </div>

          {/* Insulin Information */}
          <div>
            <label className="block mb-4 font-medium text-gray-700 text-lg">
              Are you currently taking any insulin? *
            </label>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="takingInsulin"
                  value="yes"
                  checked={formData.takingInsulin === "yes"}
                  onChange={(e) => handleInputChange('takingInsulin', e.target.value)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="takingInsulin"
                  value="no"
                  checked={formData.takingInsulin === "no"}
                  onChange={(e) => handleInputChange('takingInsulin', e.target.value)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">No</span>
              </label>
            </div>
            
            {formData.takingInsulin === "yes" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.insulinType}
                  onChange={(e) => handleInputChange('insulinType', e.target.value)}
                  placeholder="Insulin type (e.g., Rapid-acting)"
                  className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
                <input
                  type="text"
                  value={formData.insulinDosage}
                  onChange={(e) => handleInputChange('insulinDosage', e.target.value)}
                  placeholder="Dosage (e.g., 10 units)"
                  className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
                <input
                  type="text"
                  value={formData.insulinSchedule}
                  onChange={(e) => handleInputChange('insulinSchedule', e.target.value)}
                  placeholder="Schedule (e.g., before meals)"
                  className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
                />
              </div>
            )}
          </div>

          {/* Allergies */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 text-lg">
              Allergies (List all that apply)
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              placeholder="Please list any allergies (medications, foods, environmental, etc.)"
              rows="3"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition resize-none"
            />
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

export default MedicalHistoryPage;
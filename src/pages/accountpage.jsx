import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import Header from "../components/header";
import ProfileSection from "../components/accountprofile";
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import

export default function AccountPage() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate(); // Initialize navigate function
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      age: "",
      height: "",
      weight: "",
      gender: "",
      diabetesType: "",
      diagnosisYear: "",
      heightUnit: "cm",
      weightUnit: "kg"
    },
    medicalHistory: {
      medicalConditions: [],
      otherCondition: "",
      familyHeartDisease: "",
      familyMember: "",
      takingInsulin: "",
      insulinType: "",
      insulinDosage: "",
      insulinSchedule: "",
      allergies: []
    },
    lifestyle: {
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: ""
    },
    monitoring: {
      bloodSugarMonitoring: "",
      hba1cReading: "",
      usesCGM: "",
      cgmFrequency: "",
      frequentHypoglycemia: "",
      hypoglycemiaFrequency: ""
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        personalInfo: { ...formData.personalInfo, ...user.personalInfo },
        medicalHistory: { ...formData.medicalHistory, ...user.medicalHistory },
        lifestyle: { ...formData.lifestyle, ...user.lifestyle },
        monitoring: { ...formData.monitoring, ...user.monitoring }
      });
    }
  }, [user]);

  function handleInputChange(section, field, value) {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      ...user,
      personalInfo: formData.personalInfo,
      medicalHistory: formData.medicalHistory,
      lifestyle: formData.lifestyle,
      monitoring: formData.monitoring
    });
    setIsEditing(false);
    alert("Profile updated successfully!");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-red-50 font-sans">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="pt-20 pb-12 px-6 md:px-12">
        {/* Add back button container here */}
        <div className="max-w-4xl mx-auto mb-4">
          <button
            onClick={() => navigate('/')}
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
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-red-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-700">Your Profile</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-red-700 hover:text-red-900"
                >
                  <Pencil size={18} className="mr-1" />
                  Edit
                </button>
              )}
            </div>
            
            <ProfileSection 
              userData={user} 
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
            />
            
            {isEditing && (
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
                >
                  Submit Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
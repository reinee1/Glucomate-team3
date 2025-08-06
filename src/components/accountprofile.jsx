import React from "react";

const diabetesTypes = [
  { value: "type1", label: "Type 1" },
  { value: "type2", label: "Type 2" },
  { value: "gestational", label: "Gestational" },
  { value: "other", label: "Other" },
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-say", label: "Prefer not to say" },
];

export default function ProfileSection({ userData }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-red-700 mb-4">User Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
        
      </div>

      <h3 className="text-xl font-semibold text-red-700 mt-6 mb-2">Medical Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p>
          <div className="space-y-2">
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Height:</strong> {userData.height} cm</p>
          <p><strong>Weight:</strong> {userData.weight} kg</p>
        </div>
            <strong>Gender:</strong> {genders.find(g => g.value === userData.gender)?.label || userData.gender}
          </p>
          <p>
            <strong>Diabetes Type:</strong> {diabetesTypes.find(d => d.value === userData.diabetesType)?.label || userData.diabetesType}
          </p>
        </div>
        <div className="space-y-2">
          <p><strong>Medications:</strong> {userData.medications || "None"}</p>
        </div>
      </div>
    </>
  );
}

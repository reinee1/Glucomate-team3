import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSection = ({ userData, isEditing, formData, handleInputChange }) => {
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const { personalInfo, medicalHistory, lifestyle, monitoring } = userData;

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-red-700 mb-3">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">
              {userData.firstName} {userData.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{userData.email}</p>
          </div>
          {personalInfo && (
            <>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.personalInfo.age || ""}
                    onChange={(e) => handleInputChange("personalInfo", "age", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{personalInfo.age || "Not provided"}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                {isEditing ? (
                  <Select
                    value={formData.personalInfo.gender || ""}
                    onValueChange={(value) => handleInputChange("personalInfo", "gender", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium">{personalInfo.gender || "Not provided"}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Height</p>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={formData.personalInfo.height || ""}
                      onChange={(e) => handleInputChange("personalInfo", "height", e.target.value)}
                      className="flex-1"
                    />
                    <Select
                      value={formData.personalInfo.heightUnit || "cm"}
                      onValueChange={(value) => handleInputChange("personalInfo", "heightUnit", value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="ft/in">ft/in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <p className="font-medium">
                    {personalInfo.height} {personalInfo.heightUnit || "cm"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={formData.personalInfo.weight || ""}
                      onChange={(e) => handleInputChange("personalInfo", "weight", e.target.value)}
                      className="flex-1"
                    />
                    <Select
                      value={formData.personalInfo.weightUnit || "kg"}
                      onValueChange={(value) => handleInputChange("personalInfo", "weightUnit", value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <p className="font-medium">
                    {personalInfo.weight} {personalInfo.weightUnit || "kg"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Diabetes Type</p>
                {isEditing ? (
                  <Select
                    value={formData.personalInfo.diabetesType || ""}
                    onValueChange={(value) => handleInputChange("personalInfo", "diabetesType", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select diabetes type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="gestational">Gestational</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium">{personalInfo.diabetesType || "Not provided"}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Diagnosis Year</p>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.personalInfo.diagnosisYear || ""}
                    onChange={(e) => handleInputChange("personalInfo", "diagnosisYear", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{personalInfo.diagnosisYear || "Not provided"}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Medical History */}
      {medicalHistory && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Medical History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Medical Conditions</p>
              {isEditing ? (
                <Input
                  value={formData.medicalHistory.medicalConditions?.join(", ") || ""}
                  onChange={(e) => handleInputChange("medicalHistory", "medicalConditions", e.target.value.split(", "))}
                  placeholder="Condition 1, Condition 2"
                  className="w-full"
                />
              ) : (
                <p className="font-medium">
                  {medicalHistory.medicalConditions && medicalHistory.medicalConditions.length > 0
                    ? medicalHistory.medicalConditions.join(", ")
                    : "None reported"}
                </p>
              )}
            </div>
            {medicalHistory.otherCondition && (
              <div>
                <p className="text-sm text-gray-600">Other Condition</p>
                {isEditing ? (
                  <Input
                    value={formData.medicalHistory.otherCondition || ""}
                    onChange={(e) => handleInputChange("medicalHistory", "otherCondition", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{medicalHistory.otherCondition}</p>
                )}
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Family History of Heart Disease</p>
              {isEditing ? (
                <Select
                  value={formData.medicalHistory.familyHeartDisease || ""}
                  onValueChange={(value) => handleInputChange("medicalHistory", "familyHeartDisease", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{medicalHistory.familyHeartDisease || "Not provided"}</p>
              )}
            </div>
            {medicalHistory.familyHeartDisease === "yes" && medicalHistory.familyMember && (
              <div>
                <p className="text-sm text-gray-600">Family Member</p>
                {isEditing ? (
                  <Input
                    value={formData.medicalHistory.familyMember || ""}
                    onChange={(e) => handleInputChange("medicalHistory", "familyMember", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{medicalHistory.familyMember}</p>
                )}
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Taking Insulin</p>
              {isEditing ? (
                <Select
                  value={formData.medicalHistory.takingInsulin || ""}
                  onValueChange={(value) => handleInputChange("medicalHistory", "takingInsulin", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{medicalHistory.takingInsulin || "Not provided"}</p>
              )}
            </div>
            {medicalHistory.takingInsulin === "yes" && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Insulin Type</p>
                  {isEditing ? (
                    <Input
                      value={formData.medicalHistory.insulinType || ""}
                      onChange={(e) => handleInputChange("medicalHistory", "insulinType", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="font-medium">{medicalHistory.insulinType || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Insulin Dosage</p>
                  {isEditing ? (
                    <Input
                      value={formData.medicalHistory.insulinDosage || ""}
                      onChange={(e) => handleInputChange("medicalHistory", "insulinDosage", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="font-medium">{medicalHistory.insulinDosage || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Insulin Schedule</p>
                  {isEditing ? (
                    <Input
                      value={formData.medicalHistory.insulinSchedule || ""}
                      onChange={(e) => handleInputChange("medicalHistory", "insulinSchedule", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="font-medium">{medicalHistory.insulinSchedule || "Not specified"}</p>
                  )}
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-gray-600">Allergies</p>
              {isEditing ? (
                <Input
                  value={formData.medicalHistory.allergies?.join(", ") || ""}
                  onChange={(e) => handleInputChange("medicalHistory", "allergies", e.target.value.split(", "))}
                  placeholder="Allergy 1, Allergy 2"
                  className="w-full"
                />
              ) : (
                <p className="font-medium">
                  {medicalHistory.allergies && medicalHistory.allergies.length > 0
                    ? medicalHistory.allergies.join(", ")
                    : "None reported"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lifestyle & Habits */}
      {lifestyle && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Lifestyle & Habits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Smoking Status</p>
              {isEditing ? (
                <Select
                  value={formData.lifestyle.smokingStatus || ""}
                  onValueChange={(value) => handleInputChange("lifestyle", "smokingStatus", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never Smoked</SelectItem>
                    <SelectItem value="former">Former Smoker</SelectItem>
                    <SelectItem value="current">Current Smoker</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{lifestyle.smokingStatus || "Not provided"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Alcohol Consumption</p>
              {isEditing ? (
                <Select
                  value={formData.lifestyle.alcoholConsumption || ""}
                  onValueChange={(value) => handleInputChange("lifestyle", "alcoholConsumption", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="frequently">Frequently</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{lifestyle.alcoholConsumption || "Not provided"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Exercise Frequency</p>
              {isEditing ? (
                <Select
                  value={formData.lifestyle.exerciseFrequency || ""}
                  onValueChange={(value) => handleInputChange("lifestyle", "exerciseFrequency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select exercise frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-2 times/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-4 times/week)</SelectItem>
                    <SelectItem value="active">Active (5+ times per week)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{lifestyle.exerciseFrequency || "Not provided"}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Monitoring & Control */}
      {monitoring && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Monitoring & Control</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Blood Sugar Monitoring</p>
              {isEditing ? (
                <Select
                  value={formData.monitoring.bloodSugarMonitoring || ""}
                  onValueChange={(value) => handleInputChange("monitoring", "bloodSugarMonitoring", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select monitoring frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="once_daily">Once a day</SelectItem>
                    <SelectItem value="multiple_daily">Multiple times a day</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{monitoring.bloodSugarMonitoring || "Not provided"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">HbA1c Reading</p>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.1"
                  value={formData.monitoring.hba1cReading || ""}
                  onChange={(e) => handleInputChange("monitoring", "hba1cReading", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="font-medium">{monitoring.hba1cReading || "Not provided"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Uses CGM</p>
              {isEditing ? (
                <Select
                  value={formData.monitoring.usesCGM || ""}
                  onValueChange={(value) => handleInputChange("monitoring", "usesCGM", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{monitoring.usesCGM || "Not provided"}</p>
              )}
            </div>
            {monitoring.usesCGM === "yes" && (
              <div>
                <p className="text-sm text-gray-600">CGM Frequency</p>
                {isEditing ? (
                  <Input
                    value={formData.monitoring.cgmFrequency || ""}
                    onChange={(e) => handleInputChange("monitoring", "cgmFrequency", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{monitoring.cgmFrequency || "Not specified"}</p>
                )}
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Frequent Hypoglycemia</p>
              {isEditing ? (
                <Select
                  value={formData.monitoring.frequentHypoglycemia || ""}
                  onValueChange={(value) => handleInputChange("monitoring", "frequentHypoglycemia", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium">{monitoring.frequentHypoglycemia || "Not provided"}</p>
              )}
            </div>
            {monitoring.frequentHypoglycemia === "yes" && (
              <div>
                <p className="text-sm text-gray-600">Hypoglycemia Frequency</p>
                {isEditing ? (
                  <Input
                    value={formData.monitoring.hypoglycemiaFrequency || ""}
                    onChange={(e) => handleInputChange("monitoring", "hypoglycemiaFrequency", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium">{monitoring.hypoglycemiaFrequency || "Not specified"}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
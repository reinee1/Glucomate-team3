// src/components/UpdateMedicalInfo.jsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const bloodSugarOptions = [
  { value: "never", label: "Never" },
  { value: "occasionally", label: "Occasionally" },
  { value: "1-2_times_daily", label: "1-2 times daily" },
  { value: "3-4_times_daily", label: "3-4 times daily" },
  { value: "more_than_4_times", label: "More than 4 times daily" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const smokingOptions = [
  { value: "never", label: "Never" },
  { value: "former", label: "Former" },
  { value: "current", label: "Current" },
];

const alcoholOptions = [
  { value: "never", label: "Never" },
  { value: "occasional", label: "Occasional" },
  { value: "moderate", label: "Moderate" },
  { value: "heavy", label: "Heavy" },
];

const exerciseOptions = [
  { value: "never", label: "Never" },
  { value: "1-2_times_weekly", label: "1-2 times weekly" },
  { value: "3-4_times_weekly", label: "3-4 times weekly" },
  { value: "daily", label: "Daily" },
];

export default function UpdateMedicalInfo({ formData, handleInputChange, handleSubmit }) {
  // Helper function to handle input changes with section
  const handleFieldChange = (section, field, value) => {
    handleInputChange(section, field, value);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-red-700 mb-6">Update Medical Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age" className="text-red-700 font-semibold">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                value={formData.personalInfo.age}
                onChange={(e) => handleFieldChange("personalInfo", "age", e.target.value)}
                className="focus:ring-red-700 focus:border-red-700"
              />
            </div>
            
            <div>
              <Label htmlFor="height" className="text-red-700 font-semibold">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min={0}
                value={formData.personalInfo.height}
                onChange={(e) => handleFieldChange("personalInfo", "height", e.target.value)}
                className="focus:ring-red-700 focus:border-red-700"
              />
            </div>
            
            <div>
              <Label htmlFor="weight" className="text-red-700 font-semibold">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min={0}
                value={formData.personalInfo.weight}
                onChange={(e) => handleFieldChange("personalInfo", "weight", e.target.value)}
                className="focus:ring-red-700 focus:border-red-700"
              />
            </div>
            
            <div>
              <Label htmlFor="gender" className="text-red-700 font-semibold">Gender</Label>
              <Select
                value={formData.personalInfo.gender}
                onValueChange={(val) => handleFieldChange("personalInfo", "gender", val)}
                aria-label="Select gender"
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="diabetesType" className="text-red-700 font-semibold">Diabetes Type</Label>
              <Select
                value={formData.personalInfo.diabetesType}
                onValueChange={(val) => handleFieldChange("personalInfo", "diabetesType", val)}
                aria-label="Select diabetes type"
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select Diabetes Type" />
                </SelectTrigger>
                <SelectContent>
                  {diabetesTypes.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="diagnosisYear" className="text-red-700 font-semibold">Diagnosis Year</Label>
              <Input
                id="diagnosisYear"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={formData.personalInfo.diagnosisYear}
                onChange={(e) => handleFieldChange("personalInfo", "diagnosisYear", e.target.value)}
                className="focus:ring-red-700 focus:border-red-700"
              />
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-4">Medical History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-red-700 font-semibold">Family History of Heart Disease</Label>
              <Select
                value={formData.medicalHistory.familyHeartDisease}
                onValueChange={(val) => handleFieldChange("medicalHistory", "familyHeartDisease", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {yesNoOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-red-700 font-semibold">Currently Taking Insulin</Label>
              <Select
                value={formData.medicalHistory.takingInsulin}
                onValueChange={(val) => handleFieldChange("medicalHistory", "takingInsulin", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {yesNoOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="allergies" className="text-red-700 font-semibold">Allergies</Label>
            <Textarea
              id="allergies"
              rows={2}
              value={formData.medicalHistory.allergies.join(", ")}
              onChange={(e) => handleFieldChange("medicalHistory", "allergies", e.target.value.split(",").map(a => a.trim()))}
              placeholder="List allergies separated by commas"
              className="focus:ring-red-700 focus:border-red-700"
            />
          </div>
        </div>

        {/* Lifestyle */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-red-700 mb-4">Lifestyle</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-red-700 font-semibold">Smoking Status</Label>
              <Select
                value={formData.lifestyle.smokingStatus}
                onValueChange={(val) => handleFieldChange("lifestyle", "smokingStatus", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {smokingOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-red-700 font-semibold">Alcohol Consumption</Label>
              <Select
                value={formData.lifestyle.alcoholConsumption}
                onValueChange={(val) => handleFieldChange("lifestyle", "alcoholConsumption", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {alcoholOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-red-700 font-semibold">Exercise Frequency</Label>
              <Select
                value={formData.lifestyle.exerciseFrequency}
                onValueChange={(val) => handleFieldChange("lifestyle", "exerciseFrequency", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Monitoring */}
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-4">Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-red-700 font-semibold">Blood Sugar Monitoring</Label>
              <Select
                value={formData.monitoring.bloodSugarMonitoring}
                onValueChange={(val) => handleFieldChange("monitoring", "bloodSugarMonitoring", val)}
              >
                <SelectTrigger className="focus:ring-red-700 focus:border-red-700">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {bloodSugarOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="hba1cReading" className="text-red-700 font-semibold">HbA1c Reading (%)</Label>
              <Input
                id="hba1cReading"
                type="number"
                step="0.1"
                min="4"
                max="20"
                value={formData.monitoring.hba1cReading}
                onChange={(e) => handleFieldChange("monitoring", "hba1cReading", e.target.value)}
                className="focus:ring-red-700 focus:border-red-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-red-700 hover:bg-red-800 px-8 py-3">
            Update Medical Information
          </Button>
        </div>
      </form>
    </>
  );
}
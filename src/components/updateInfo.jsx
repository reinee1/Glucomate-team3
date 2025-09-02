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

export default function UpdateMedicalInfo({ formData, handleInputChange, handleSubmit }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-red-700 mb-6">Update Medical Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <Label htmlFor="age" className="text-red-700 font-semibold">Age</Label>
            <Input
              id="age"
              type="number"
              min={0}
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              required
              className="focus:ring-red-700 focus:border-red-700"
            />
          </div>

          {/* Height */}
          <div>
            <Label htmlFor="height" className="text-red-700 font-semibold">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min={0}
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              required
              className="focus:ring-red-700 focus:border-red-700"
            />
          </div>

          {/* Weight */}
          <div>
            <Label htmlFor="weight" className="text-red-700 font-semibold">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min={0}
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              required
              className="focus:ring-red-700 focus:border-red-700"
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender" className="text-red-700 font-semibold">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(val) => handleInputChange("gender", val)}
              required
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

          {/* Diabetes Type */}
          <div>
            <Label htmlFor="diabetesType" className="text-red-700 font-semibold">Diabetes Type</Label>
            <Select
              value={formData.diabetesType}
              onValueChange={(val) => handleInputChange("diabetesType", val)}
              required
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
        </div>

        {/* Medications - Full width */}
        <div>
          <Label htmlFor="medications" className="text-red-700 font-semibold">Medications</Label>
          <Textarea
            id="medications"
            rows={3}
            value={formData.medications}
            onChange={(e) => handleInputChange("medications", e.target.value)}
            placeholder="List your medications"
            className="focus:ring-red-700 focus:border-red-700"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-red-700 hover:bg-red-800 px-8 py-3">
            Update Info
          </Button>
        </div>
      </form>
    </>
  );
}
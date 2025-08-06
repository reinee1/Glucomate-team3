import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    diabetesType: "",
    medications: "",
    gender: "",
  });

  const diabetesTypes = [
    { value: "", label: "Select Diabetes Type" },
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "gestational", label: "Gestational" },
    { value: "other", label: "Other" },
  ];

  const genders = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sign up submitted! " + JSON.stringify(formData, null, 2));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage:
          "url('https://news.ki.se/sites/nyheter/files/qbank/blood-1813410_1920_pixabay-custom20211103151915.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <div className="relative max-w-xl w-full bg-white rounded-lg p-12 shadow-lg border border-red-700 z-10">
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center select-none">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Create a password"
            />
          </div>

          {/* Age */}
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="0"
              required
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Your age"
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              required
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            >
              {genders.map(({ value, label }) => (
                <option key={value} value={value} disabled={value === ""}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Height */}
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min="0"
              required
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
              placeholder="Height in centimeters"
            />
          </div>

          {/* Weight */}
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="0"
              required
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              placeholder="Weight in kilograms"
            />
          </div>

          {/* Diabetes Type */}
          <div>
            <Label htmlFor="diabetesType">Type of Diabetes</Label>
            <select
              id="diabetesType"
              required
              value={formData.diabetesType}
              onChange={(e) => handleChange("diabetesType", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            >
              {diabetesTypes.map(({ value, label }) => (
                <option key={value} value={value} disabled={value === ""}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Medications */}
          <div>
            <Label htmlFor="medications">Medications</Label>
            <textarea
              id="medications"
              rows={3}
              placeholder="List any diabetes-related medications"
              value={formData.medications}
              onChange={(e) => handleChange("medications", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-700 text-white font-bold py-3 rounded-md shadow-lg hover:bg-red-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-700 focus:ring-opacity-50"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-red-700 hover:text-red-900 font-semibold">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

import React, { useState } from "react";

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
  });

  const diabetesTypes = [
    { value: "", label: "Select Diabetes Type" },
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "gestational", label: "Gestational" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <label
              htmlFor="fullName"
              className="block mb-2 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block mb-2 font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              min="0"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="Your age"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block mb-2 font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              min="0"
              required
              value={formData.height}
              onChange={handleChange}
              placeholder="Height in centimeters"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block mb-2 font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              min="0"
              required
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight in kilograms"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
            />
          </div>

          {/* Diabetes Type */}
          <div>
            <label
              htmlFor="diabetesType"
              className="block mb-2 font-medium text-gray-700"
            >
              Type of Diabetes
            </label>
            <select
              id="diabetesType"
              name="diabetesType"
              required
              value={formData.diabetesType}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition"
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
            <label
              htmlFor="medications"
              className="block mb-2 font-medium text-gray-700"
            >
              Medications
            </label>
            <textarea
              id="medications"
              name="medications"
              rows={3}
              placeholder="List any diabetes-related medications you take"
              value={formData.medications}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white font-bold py-3 rounded-md shadow-lg hover:bg-red-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-700 focus:ring-opacity-50"
          >
            Create Account
          </button>
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

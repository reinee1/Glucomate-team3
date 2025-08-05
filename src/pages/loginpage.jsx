import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation example
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setErrorMsg("");
    // Here you can add your login logic, API calls, etc.
    alert(`Signing in with Email: ${email}`);
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
     <div className="relative max-w-xl w-full bg-white rounded-lg p-12 border border-red-200 z-10">
        <h2 className="text-4xl font-extrabold text-red-800 mb-8 text-center select-none">
          Sign In
        </h2>

        {errorMsg && (
          <p className="text-red-600 mb-6 text-center font-semibold">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-md shadow-lg transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <a href="/signuppage" className="text-red-700 hover:text-red-900 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

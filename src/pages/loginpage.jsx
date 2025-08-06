import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setErrorMsg("");
    alert(`Signing in with Email: ${email}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-white relative"
      style={{
        backgroundImage:
          'url("https://news.ki.se/sites/nyheter/files/qbank/blood-1813410_1920_pixabay-custom20211103151915.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <Card className="relative max-w-md w-full bg-white rounded-lg p-10 z-10 shadow-xl border border-red-200">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center select-none">
          Sign In
        </h2>

        {errorMsg && (
          <p className="text-red-600 mb-4 text-center font-semibold">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm">
          Don't have an account?{" "}
          <a
            href="/signuppage"
            className="text-red-700 hover:text-red-900 font-semibold"
          >
            Sign Up
          </a>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;

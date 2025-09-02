"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Validation schema
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");      // ✅ success message (e.g., “Verification email sent”)
  const [serverErr, setServerErr] = useState("");      

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setServerMsg("");
    setServerErr("");
    setLoading(true);
  
    const payload = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };
  
    try {

      const response = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      
      const json = await response.json().catch(() => ({}));
  
      if (response.ok) {
        if (response.status === 201) {
          // ✅ brand-new registration
          setServerMsg(json?.message || "Verification email sent. Please check your inbox.");
          form.reset();
        } else if (response.status === 200) {
          // ✅ existing, unverified user -> email resent
          setServerMsg(json?.message || "Verification email resent. Please check your inbox.");
          // usually don't navigate; let them see the message
          // if you *do* want to navigate: navigate("/login");
        } else {
          // Fallback success case
          setServerMsg(json?.message || "Success.");
        }}
        else {
        // Show specific message if provided (e.g., “Email already exists”, “All fields required”)
        setServerErr(json?.message || `Signup failed (${response.status}). Please try again.`);
      }
    } catch {
      setServerErr("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/Image 1.jpg")', // ✅ use /Image 1.jpg for Next.js public assets
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-gray-300">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>

        {/* ✅ Server Messages */}
        {serverMsg && (
          <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-800">
            {serverMsg}
          </div>
        )}
        {serverErr && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800">
            {serverErr}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        {...field}
                        className="border-gray-300 focus:ring-gray-500 focus:border-gray-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        {...field}
                        className="border-gray-300 focus:ring-gray-500 focus:border-gray-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});


export default function LoginPage() {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setServerMsg("");
    setServerErr("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim().toLowerCase(),
          password: values.password,
        }),
      });

      const json = await response.json().catch(() => ({}));

      if (response.ok && (json?.success ?? true)) {
        // ✅ save token to localStorage (or cookies)
        if (json.access_token) {
          localStorage.setItem("accessToken", json.access_token);
        }

        setServerMsg(json?.message || "Login successful!");
        // redirect to dashboard (or home)
        navigate("/personalinfo");
      } else {
        setServerErr(json?.message || "Invalid email or password.");
      }
    } catch (err) {
      setServerErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/Image 1.jpg")', // ✅ use correct path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-red-700">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
          Login
        </h2>

        {/* ✅ Server messages */}
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
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className={
                        form.formState.errors.email
                          ? "border-red-600 focus:ring-red-600"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-red-700 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                      className={
                        form.formState.errors.password
                          ? "border-red-600 focus:ring-red-600"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import React from "react";
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
import { Link } from "react-router-dom";

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Logging in with", values);
    // Your API call here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://news.ki.se/sites/nyheter/files/qbank/blood-1813410_1920_pixabay-custom20211103151915.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-red-700">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
          Login
        </h2>

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
                  {/* Flex container for label + link */}
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

            {/* Submit Button (no changes) */}
            <Button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800"
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

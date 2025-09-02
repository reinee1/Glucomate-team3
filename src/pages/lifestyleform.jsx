"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Validation schema
const lifestyleSchema = z.object({
  smokingStatus: z.string().min(1, "Please select your smoking status"),
  alcoholConsumption: z.string().min(1, "Please select your alcohol consumption frequency"),
  exerciseFrequency: z.string().min(1, "Please select your exercise frequency"),
});

export default function LifestyleHabitsPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in first.");
      return navigate("/login");
    }
  
    // Payload matches your save_lifestyle_habits() controller
    const payload = {
      smokingStatus: data.smokingStatus,
      alcoholConsumption: data.alcoholConsumption,
      exerciseFrequency: data.exerciseFrequency,
    };
  
    try {
      const res = await fetch("/api/v1/medical-profile/lifestylehabits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT for @jwt_required()
        },
        body: JSON.stringify(payload),
      });
  
      // Safe JSON parse (prevents false “Network error” if body is empty/non-JSON)
      const text = await res.text();
      let json = null;
      try { json = text ? JSON.parse(text) : null; } catch {}
  
      if (res.ok) {
        // Backend returns 201 on success
        return navigate("/monitorform");
      }
  
      if (res.status === 401) {
        alert(json?.message || "Session expired. Please log in again.");
        return navigate("/login");
      }
      if (res.status === 422) {
        return alert(json?.message || "Please complete all required fields.");
      }
  
      alert(json?.message || `Save failed (${res.status}). Please try again.`);
    } catch {
      alert("Network error. Please try again.");
    }
  };
  

  const smokingOptions = [
    { value: "never", label: "Never Smoked" },
    { value: "former", label: "Former Smoker" },
    { value: "current", label: "Current Smoker" },
  ];

  const alcoholOptions = [
    { value: "never", label: "Never" },
    { value: "occasionally", label: "Occasionally" },
    { value: "frequently", label: "Frequently" },
  ];

  const exerciseOptions = [
    { value: "sedentary", label: "Sedentary (Little to no exercise)" },
    { value: "light", label: "Light (1-2 times/week)" },
    { value: "moderate", label: "Moderate (3-4 times/week)" },
    { value: "active", label: "Active (5+ times per week)" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/public/Image 1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-red-700">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
          Lifestyle & Habits
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Smoking Status */}
            <FormField
              control={form.control}
              name="smokingStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-black">Smoking Status *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {smokingOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem 
                              value={option.value} 
                              className="text-black border-gray-400"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-black">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Alcohol Consumption */}
            <FormField
              control={form.control}
              name="alcoholConsumption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-black">
                    Alcohol Consumption *
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {alcoholOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem 
                              value={option.value} 
                              className="text-black border-gray-400"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-black">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Exercise Frequency */}
            <FormField
              control={form.control}
              name="exerciseFrequency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-black">
                    Exercise Frequency *
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {exerciseOptions.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem 
                              value={option.value} 
                              className="text-black border-gray-400"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-black">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800"
            >
             Complete Registration
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
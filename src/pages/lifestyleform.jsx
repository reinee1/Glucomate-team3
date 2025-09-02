"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
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
  const { user, updateUser } = useUser();

  const form = useForm({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      smokingStatus: user?.lifestyle?.smokingStatus || "",
      alcoholConsumption: user?.lifestyle?.alcoholConsumption || "",
      exerciseFrequency: user?.lifestyle?.exerciseFrequency || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Lifestyle data:", data);
      
      // Update user data with lifestyle info
      updateUser({
        ...user,
        lifestyle: data,
        completedForms: {
          ...user.completedForms,
          lifestyle: true
        }
      });
      
      navigate("/monitorform");
    } catch (error) {
      console.error("Error saving lifestyle information:", error);
      alert("Failed to save lifestyle information. Please try again.");
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
          'url("Image 1.jpg")',
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
                  <FormLabel className="text-base">Smoking Status *</FormLabel>
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
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alcohol Consumption */}
            <FormField
              control={form.control}
              name="alcoholConsumption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">
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
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Exercise Frequency */}
            <FormField
              control={form.control}
              name="exerciseFrequency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">
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
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
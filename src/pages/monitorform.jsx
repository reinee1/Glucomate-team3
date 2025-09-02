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
import { Input } from "@/components/ui/input";

// Validation schema
const monitoringSchema = z.object({
  bloodSugarMonitoring: z.string().min(1, "Please select a monitoring frequency"),
  hba1cReading: z.union([
    z.string().min(1, "HbA1c reading is required"),
    z.number().min(4, "HbA1c must be at least 4").max(20, "HbA1c cannot exceed 20"),
  ]),
  usesCGM: z.string().min(1, "Please select an option"),
  cgmFrequency: z.string().optional(),
  frequentHypoglycemia: z.string().min(1, "Please select an option"),
  hypoglycemiaFrequency: z.string().optional(),
}).refine((data) => {
  if (data.usesCGM === "yes" && !data.cgmFrequency) {
    return false;
  }
  return true;
}, {
  message: "CGM frequency is required when using CGM",
  path: ["cgmFrequency"],
}).refine((data) => {
  if (data.frequentHypoglycemia === "yes" && !data.hypoglycemiaFrequency) {
    return false;
  }
  return true;
}, {
  message: "Hypoglycemia frequency is required when experiencing frequent hypoglycemia",
  path: ["hypoglycemiaFrequency"],
});

export default function MonitoringControlPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const form = useForm({
    resolver: zodResolver(monitoringSchema),
    defaultValues: {
      bloodSugarMonitoring: user?.monitoring?.bloodSugarMonitoring || "",
      hba1cReading: user?.monitoring?.hba1cReading || "",
      usesCGM: user?.monitoring?.usesCGM || "",
      cgmFrequency: user?.monitoring?.cgmFrequency || "",
      frequentHypoglycemia: user?.monitoring?.frequentHypoglycemia || "",
      hypoglycemiaFrequency: user?.monitoring?.hypoglycemiaFrequency || "",
    },
  });

  const watchesUsesCGM = form.watch("usesCGM");
  const watchesFrequentHypoglycemia = form.watch("frequentHypoglycemia");

  const onSubmit = async (data) => {
    try {
      console.log("Monitoring data:", data);
      
      // Update user data with monitoring info
      updateUser({
        ...user,
        monitoring: data,
        completedForms: {
          ...user.completedForms,
          monitoring: true
        }
      });
      
      // Navigate directly to chatbot
      navigate("/chatbot");
    } catch (error) {
      console.error("Error saving monitoring information:", error);
      alert("Failed to save monitoring information. Please try again.");
    }
  };

  const monitoringOptions = [
    { value: "never", label: "Never" },
    { value: "once_daily", label: "Once a day" },
    { value: "multiple_daily", label: "Multiple times a day" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage: 'url("Image 1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(1)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-red-700">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
          Monitoring & Control
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Blood Sugar Monitoring Frequency */}
            <FormField
              control={form.control}
              name="bloodSugarMonitoring"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Blood Sugar Monitoring Frequency *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {monitoringOptions.map((option) => (
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

            {/* Latest HbA1c Reading */}
            <FormField
              control={form.control}
              name="hba1cReading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Latest HbA1c Reading *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        min="4"
                        max="20"
                        placeholder="e.g., 7.2"
                        {...field}
                        onChange={event => field.onChange(event.target.value)}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        %
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Do you use a Continuous Glucose Monitor (CGM)? */}
            <FormField
              control={form.control}
              name="usesCGM"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Do you use a Continuous Glucose Monitor (CGM)? *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditionally show CGM Frequency */}
            {watchesUsesCGM === "yes" && (
              <FormField
                control={form.control}
                name="cgmFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">CGM Check Frequency *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., every 2 hours, constantly throughout the day..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Do you experience frequent hypoglycemia? */}
            <FormField
              control={form.control}
              name="frequentHypoglycemia"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Do you experience frequent hypoglycemia (low blood sugar)? *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditionally show Hypoglycemia Frequency */}
            {watchesFrequentHypoglycemia === "yes" && (
              <FormField
                control={form.control}
                name="hypoglycemiaFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Hypoglycemia Frequency *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2-3 times per week, daily, monthly..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800"
            >
              Update Monitoring Info
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
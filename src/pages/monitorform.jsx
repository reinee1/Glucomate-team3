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
import { Input } from "@/components/ui/input";

// Validation schema
const monitoringSchema = z.object({
  bloodSugarMonitoring: z.string().min(1, "Please select your monitoring frequency"),
  hba1cReading: z.union([
    z.string().length(0), // Empty string (optional)
    z.string()
      .transform((val) => parseFloat(val))
      .refine((val) => !isNaN(val) && val >= 4 && val <= 20, {
        message: "HbA1c must be between 4% and 20%",
      }),
  ]),
  usesCGM: z.string().min(1, "Please select CGM usage status"),
  cgmFrequency: z.string().optional(),
  frequentHypoglycemia: z.string().min(1, "Please select hypoglycemia frequency"),
  hypoglycemiaFrequency: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.usesCGM === "yes" && !data.cgmFrequency?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify CGM check frequency",
      path: ["cgmFrequency"],
    });
  }
  if (data.frequentHypoglycemia === "yes" && !data.hypoglycemiaFrequency?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify hypoglycemia frequency",
      path: ["hypoglycemiaFrequency"],
    });
  }
});

export default function MonitoringControlPage() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(monitoringSchema),
    defaultValues: {
      bloodSugarMonitoring: "",
      hba1cReading: "",
      usesCGM: "",
      cgmFrequency: "",
      frequentHypoglycemia: "",
      hypoglycemiaFrequency: "",
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in first.");
      return navigate("/login");
    }
  
    // Build payload exactly as backend expects
    const payload = {
      bloodSugarMonitoring: data.bloodSugarMonitoring,      // string
      usesCGM: data.usesCGM,                                // "yes" | "no"
      frequentHypoglycemia: data.frequentHypoglycemia,      // "yes" | "no"
      // Only include conditionals when required
      ...(data.usesCGM === "yes" ? { cgmFrequency: (data.cgmFrequency || "").trim() } : {}),
      ...(data.frequentHypoglycemia === "yes"
          ? { hypoglycemiaFrequency: (data.hypoglycemiaFrequency || "").trim() }
          : {}),
      // HbA1c optional; send as string/number if provided
      ...(data.hba1cReading !== "" ? { hba1cReading: data.hba1cReading } : {}),
    };
  
    try {
      const res = await fetch("/api/v1/medical-profile/monitoringinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required for @jwt_required()
        },
        body: JSON.stringify(payload),
      });
  
      // Safe JSON parse to avoid false “network error”
      const text = await res.text();
      let json = null;
      try { json = text ? JSON.parse(text) : null; } catch {}
  
      if (res.ok) {
        // backend returns 201 on success
        alert(json?.message || "All information saved successfully! Registration complete!");
        return navigate("/chatbot");
      }
  
      if (res.status === 401) {
        alert(json?.message || "Session expired. Please log in again.");
        return navigate("/login");
      }
      if (res.status === 422) {
        return alert(json?.message || "Please complete the required fields.");
      }
  
      alert(json?.message || `Save failed (${res.status}). Please try again.`);
    } catch {
      alert("Network error. Please try again.");
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
                  <FormLabel className="text-base text-gray-900">
                    How often do you monitor your blood sugar?{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
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
                            <RadioGroupItem 
                              value={option.value} 
                              className="text-gray-400 data-[state=checked]:text-gray-600 border-gray-300"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-700">
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

            {/* Latest HbA1c Reading */}
            <FormField
              control={form.control}
              name="hba1cReading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900">
                    What is your latest HbA1c reading?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        min="4"
                        max="20"
                        placeholder="e.g., 7.2"
                        className="pr-12 border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                        {...field}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        %
                      </span>
                    </div>
                  </FormControl>
                  <p className="text-sm text-gray-500 mt-2">
                    Normal range is typically 4-6%. Enter your most recent test result.
                  </p>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Continuous Glucose Monitor */}
            <FormField
              control={form.control}
              name="usesCGM"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-gray-900">
                    Do you use a Continuous Glucose Monitor (CGM)?{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="yes" 
                            className="text-gray-400 data-[state=checked]:text-gray-600 border-gray-300"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="no" 
                            className="text-gray-400 data-[state=checked]:text-gray-600 border-gray-300"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* CGM Frequency (conditional) */}
            {form.watch("usesCGM") === "yes" && (
              <FormField
                control={form.control}
                name="cgmFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-gray-900">
                      How often do you check your CGM readings?{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., every 2 hours, constantly throughout the day..."
                        className="border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            )}

            {/* Frequent Hypoglycemia */}
            <FormField
              control={form.control}
              name="frequentHypoglycemia"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-gray-900">
                    Do you experience frequent hypoglycemia (low blood sugar)?{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="yes" 
                            className="text-gray-400 data-[state=checked]:text-gray-600 border-gray-300"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="no" 
                            className="text-gray-400 data-[state=checked]:text-gray-600 border-gray-300"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Hypoglycemia Frequency (conditional) */}
            {form.watch("frequentHypoglycemia") === "yes" && (
              <FormField
                control={form.control}
                name="hypoglycemiaFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-gray-900">
                      How often do you experience hypoglycemia?{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2-3 times per week, daily, monthly..."
                        className="border-gray-300 focus:ring-gray-400 focus:border-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-md hover:bg-red-800"
            >
              Submit & Complete Registration
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
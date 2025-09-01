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
    console.log("Monitoring data:", data);
    alert("All information saved successfully! Registration complete!");
    navigate("/chatbot");
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
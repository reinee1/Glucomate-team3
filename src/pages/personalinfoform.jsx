"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { ChevronDownIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const personalInfoSchema = z.object({
  birthDate: z.date({
    required_error: "Please select your date of birth",
  }),
  gender: z.string().min(1, "Gender is required"),
  height: z.coerce.number().min(1, "Height is required"),
  heightUnit: z.enum(["cm", "ft/in"]),
  weight: z.coerce.number().min(1, "Weight is required"),
  weightUnit: z.enum(["kg", "lb"]),
  diabetesType: z.string().min(1, "Diabetes type is required"),
  diagnosisYear: z.coerce.number().min(1970).max(new Date().getFullYear()),
});

export default function PersonalInfoPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      birthDate: user?.personalInfo?.birthDate || undefined,
      gender: user?.personalInfo?.gender || "",
      height: user?.personalInfo?.height || 170,
      heightUnit: user?.personalInfo?.heightUnit || "cm",
      weight: user?.personalInfo?.weight || 70,
      weightUnit: user?.personalInfo?.weightUnit || "kg",
      diabetesType: user?.personalInfo?.diabetesType || "",
      diagnosisYear: user?.personalInfo?.diagnosisYear || 2020,
    },
  });

  const { watch, setValue } = form;
  const heightUnit = watch("heightUnit");
  const weightUnit = watch("weightUnit");

  React.useEffect(() => {
    if (!user?.personalInfo?.height) {
      setValue("height", heightUnit === "cm" ? 170 : 60);
    }
  }, [heightUnit, setValue, user]);

  React.useEffect(() => {
    if (!user?.personalInfo?.weight) {
      setValue("weight", weightUnit === "kg" ? 70 : 154);
    }
  }, [weightUnit, setValue, user]);

  const onSubmit = async (data) => {
    try {
      console.log("Personal Info:", data);
      
      // Update user data with personal info
      updateUser({
        ...user,
        personalInfo: data,
        completedForms: {
          ...user.completedForms,
          personalInfo: true
        }
      });
      
      alert("Personal information saved successfully!");
      navigate("/medicalinfo");
    } catch (error) {
      console.error("Error saving personal information:", error);
      alert("Failed to save personal information. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("Image 1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg border border-red-700 mx-4">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
          Personal Information
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base text-gray-900">
                    Date of birth <span className="text-red-600">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? field.value.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900">
                    Gender <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Height */}
            <div>
              <FormLabel className="text-base text-gray-900">
                Height <span className="text-red-600">*</span>
              </FormLabel>
              <div className="flex gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="range"
                          min={heightUnit === "cm" ? 100 : 36}
                          max={heightUnit === "cm" ? 250 : 96}
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          aria-label="Height"
                        />
                      </FormControl>
                      <div className="text-center mt-2 font-semibold text-gray-700">
                        {field.value} {heightUnit}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={heightUnit === "cm" ? "default" : "outline"}
                    onClick={() => setValue("heightUnit", "cm")}
                    aria-label="Use centimeters"
                  >
                    cm
                  </Button>
                  <Button
                    type="button"
                    variant={heightUnit === "ft/in" ? "default" : "outline"}
                    onClick={() => setValue("heightUnit", "ft/in")}
                    aria-label="Use feet and inches"
                  >
                    ft/in
                  </Button>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div>
              <FormLabel className="text-base text-gray-900">
                Weight <span className="text-red-600">*</span>
              </FormLabel>
              <div className="flex gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="range"
                          min={weightUnit === "kg" ? 30 : 66}
                          max={weightUnit === "kg" ? 200 : 440}
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          aria-label="Weight"
                        />
                      </FormControl>
                      <div className="text-center mt-2 font-semibold text-gray-700">
                        {field.value} {weightUnit}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={weightUnit === "kg" ? "default" : "outline"}
                    onClick={() => setValue("weightUnit", "kg")}
                    aria-label="Use kilograms"
                  >
                    kg
                  </Button>
                  <Button
                    type="button"
                    variant={weightUnit === "lb" ? "default" : "outline"}
                    onClick={() => setValue("weightUnit", "lb")}
                    aria-label="Use pounds"
                  >
                    lb
                  </Button>
                </div>
              </div>
            </div>

            {/* Diabetes Type */}
            <FormField
              control={form.control}
              name="diabetesType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900">
                    Type of Diabetes <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select diabetes type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="gestational">Gestational</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            
            {/* Diagnosis Year */}
            <FormField
              control={form.control}
              name="diagnosisYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900">
                    Year of Diagnosis <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="range"
                      min={1970}
                      max={new Date().getFullYear()}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      aria-label="Year of diagnosis"
                    />
                  </FormControl>
                  <div className="text-center mt-2 font-semibold text-gray-700">
                    {field.value}
                  </div>
                  <FormMessage className="text-red-600" />
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

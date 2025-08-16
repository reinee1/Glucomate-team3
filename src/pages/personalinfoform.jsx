"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
  height: z.string().min(1, "Height is required"),
  heightUnit: z.enum(["cm", "ft/in"]),
  weight: z.string().min(1, "Weight is required"),
  weightUnit: z.enum(["kg", "lb"]),
  diabetesType: z.string().min(1, "Diabetes type is required"),
  diagnosisYear: z.string().min(1, "Diagnosis year is required"),
});

export default function PersonalInfoPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      birthDate: undefined,
      gender: "",
      height: "170",
      heightUnit: "cm",
      weight: "70",
      weightUnit: "kg",
      diabetesType: "",
      diagnosisYear: "2020",
    },
  });

  const { watch, setValue } = form;
  const heightUnit = watch("heightUnit");
  const weightUnit = watch("weightUnit");

  React.useEffect(() => {
    setValue("height", heightUnit === "cm" ? "170" : "60");
  }, [heightUnit, setValue]);

  React.useEffect(() => {
    setValue("weight", weightUnit === "kg" ? "70" : "154");
  }, [weightUnit, setValue]);

  const onSubmit = async (data) => {
    console.log("Personal Info:", data);
    alert("Personal information saved successfully!");
    navigate("/medicalinfo");
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
        filter: "brightness(1)",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg border border-red-700">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
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
                          !field.value && "text-gray-400"
                        )}
                      >
                        {field.value ? field.value.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon className="h-4 w-4" />
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
                          min={heightUnit === "cm" ? "100" : "36"}
                          max={heightUnit === "cm" ? "250" : "96"}
                          {...field}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </FormControl>
                      <div className="text-center mt-2 font-semibold text-gray-700">
                        {watch("height")} {heightUnit}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={heightUnit === "cm" ? "default" : "outline"}
                    onClick={() => setValue("heightUnit", "cm")}
                  >
                    cm
                  </Button>
                  <Button
                    type="button"
                    variant={heightUnit === "ft/in" ? "default" : "outline"}
                    onClick={() => setValue("heightUnit", "ft/in")}
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
                          min={weightUnit === "kg" ? "30" : "66"}
                          max={weightUnit === "kg" ? "200" : "440"}
                          {...field}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </FormControl>
                      <div className="text-center mt-2 font-semibold text-gray-700">
                        {watch("weight")} {weightUnit}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={weightUnit === "kg" ? "default" : "outline"}
                    onClick={() => setValue("weightUnit", "kg")}
                  >
                    kg
                  </Button>
                  <Button
                    type="button"
                    variant={weightUnit === "lb" ? "default" : "outline"}
                    onClick={() => setValue("weightUnit", "lb")}
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
            <div>
              <FormLabel className="text-base text-gray-900">
                Year of Diagnosis <span className="text-red-600">*</span>
              </FormLabel>
              <FormField
                control={form.control}
                name="diagnosisYear"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="range"
                        min="1970"
                        max="2025"
                        {...field}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                      />
                    </FormControl>
                    <div className="text-center mt-2 font-semibold text-gray-700">
                      {watch("diagnosisYear")}
                    </div>
                  </FormItem>
                )}
              />
            </div>

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
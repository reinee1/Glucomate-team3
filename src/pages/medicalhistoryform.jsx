"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const medicalConditionOptions = [
  "High Blood Pressure",
  "High Cholesterol", 
  "Heart Disease",
  "Kidney Disease",
  "Neuropathy",
  "Retinopathy",
  "Obesity",
  "PCOS",
  "Depression or Anxiety",
  "Other"
];

const medicalHistorySchema = z.object({
  medicalConditions: z.array(z.string()).optional(),
  otherCondition: z.string().optional(),
  familyHeartDisease: z.enum(["yes", "no"], {
    required_error: "Please select one of the options",
  }),
  familyMember: z.string().optional(),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
    })
  ),
  takingInsulin: z.enum(["yes", "no"], {
    required_error: "Please select one of the options",
  }),
  insulinType: z.string().optional(),
  insulinDosage: z.string().optional(),
  insulinSchedule: z.string().optional(),
  allergies: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  if (data.medicalConditions?.includes("Other") && !data.otherCondition) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify other condition",
      path: ["otherCondition"],
    });
  }
  if (data.familyHeartDisease === "yes" && !data.familyMember) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify which family member",
      path: ["familyMember"],
    });
  }
  if (data.takingInsulin === "yes") {
    if (!data.insulinType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify insulin type",
        path: ["insulinType"],
      });
    }
    if (!data.insulinDosage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify insulin dosage",
        path: ["insulinDosage"],
      });
    }
    if (!data.insulinSchedule) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify insulin schedule",
        path: ["insulinSchedule"],
      });
    }
  }
});

export default function MedicalHistoryPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      medicalConditions: [],
      otherCondition: "",
      familyHeartDisease: undefined,
      familyMember: "",
      medications: [{ name: "", dosage: "", frequency: "" }],
      takingInsulin: undefined,
      insulinType: "",
      insulinDosage: "",
      insulinSchedule: "",
      allergies: [""]
    },
  });

  const { watch, setValue, control, getValues } = form;
  const medicalConditions = watch("medicalConditions");
  const familyHeartDisease = watch("familyHeartDisease");
  const takingInsulin = watch("takingInsulin");

  const onSubmit = async (data) => {
    console.log("Medical History:", data);
    alert("Medical history saved successfully!");
    navigate("/lifestyleform");
  };

  // Handle adding new allergy input
  const addAllergyInput = () => {
    const currentAllergies = getValues("allergies") || [""];
    setValue("allergies", [...currentAllergies, ""]);
  };

  // Handle removing an allergy input
  const removeAllergyInput = (index) => {
    const currentAllergies = getValues("allergies") || [""];
    if (currentAllergies.length > 1) {
      setValue(
        "allergies",
        currentAllergies.filter((_, i) => i !== index)
      );
    }
  };

  // Handle allergy input change
  const handleAllergyChange = (index, value) => {
    const currentAllergies = getValues("allergies") || [""];
    const newAllergies = [...currentAllergies];
    newAllergies[index] = value;
    setValue("allergies", newAllergies);
  };

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
          Medical History
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Medical Conditions - Optional */}
            <FormField
              control={control}
              name="medicalConditions"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base text-gray-900">
                    Other Medical Conditions
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {medicalConditionOptions.map((condition) => (
                      <FormField
                        key={condition}
                        control={control}
                        name="medicalConditions"
                        render={({ field }) => (
                          <FormItem key={condition} className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(condition)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value || [], condition])
                                    : field.onChange(
                                        (field.value || [])?.filter(
                                          (value) => value !== condition
                                        )
                                      )
                                }}
                                className="border-gray-300 data-[state=checked]:bg-gray-600"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-gray-700">
                              {condition}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {medicalConditions?.includes("Other") && (
              <FormField
                control={control}
                name="otherCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Please specify other condition..."
                          className="w-full pr-24 border-gray-300"
                        />
                        <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                          e.g. Thyroid Disorder
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            )}

            {/* Family History */}
            <FormField
              control={control}
              name="familyHeartDisease"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-gray-900">
                    Family History of Heart Disease <span className="text-red-600">*</span>
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
                            className="text-primary border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="no" 
                            className="text-primary border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm font-medium text-red-600">
                      Please select one of the options
                    </p>
                  )}
                </FormItem>
              )}
            />

            {familyHeartDisease === "yes" && (
              <FormField
                control={control}
                name="familyMember"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Which family member?"
                          className="w-full pr-24 border-gray-300"
                        />
                        <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                          e.g. mother, father
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            )}

            {/* Insulin */}
            <FormField
              control={control}
              name="takingInsulin"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base text-gray-900">
                    Are you currently taking any insulin? <span className="text-red-600">*</span>
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
                            className="text-primary border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value="no" 
                            className="text-primary border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm font-medium text-red-600">
                      Please select one of the options
                    </p>
                  )}
                </FormItem>
              )}
            />

            {takingInsulin === "yes" && (
              <div className="space-y-4">
                <FormField
                  control={control}
                  name="insulinType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Insulin type"
                            className="w-full pr-24 border-gray-300"
                          />
                          <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                            e.g. Rapid-acting
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="insulinDosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Dosage"
                              className="w-full pr-24 border-gray-300"
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                              e.g. 10 units
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="insulinSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Schedule"
                              className="w-full pr-24 border-gray-300"
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                              e.g. before meals
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Allergies - Multiple Input Fields */}
            <div className="space-y-2">
              <FormLabel className="text-base text-gray-900">
                Allergies (List all that apply)
              </FormLabel>
              {watch("allergies")?.map((allergy, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={allergy}
                    onChange={(e) => handleAllergyChange(index, e.target.value)}
                    placeholder={`Allergy #${index + 1}`}
                    className="flex-1 border-gray-300"
                  />
                  {index === watch("allergies")?.length - 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addAllergyInput}
                      className="h-10 w-10 border-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeAllergyInput(index)}
                      className="h-10 w-10 border-gray-300 text-red-600"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
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
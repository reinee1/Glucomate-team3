import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import Header from "../components/header";
import ProfileSection from "../components/accountprofile";
import UpdateMedicalInfo from "../components/updateInfo";

export default function AccountPage() {
  const [userData, setUserData] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    age: "28",
    height: "165",
    weight: "60",
    gender: "female",
    diabetesType: "type2",
    medications: "Metformin",
  });

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    diabetesType: "",
    medications: "",
  });

  useEffect(() => {
    setFormData({
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      gender: userData.gender,
      diabetesType: userData.diabetesType,
      medications: userData.medications,
    });
  }, [userData]);

  function handleInputChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, ...formData }));
    alert("Medical info updated!");
  }

  return (
    <div className="min-h-screen bg-red-50 font-sans">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-red-700">
          <Tabs defaultValue="profile" className="p-6">
            <TabsList className="border-b border-red-700 mb-6">
              <TabsTrigger value="profile" className="text-red-700 font-semibold">
                Profile
              </TabsTrigger>
              <TabsTrigger value="update" className="text-red-700 font-semibold">
                Update Medical Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 text-gray-800">
              <ProfileSection userData={userData} />
            </TabsContent>

            <TabsContent value="update">
              <UpdateMedicalInfo
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// src/pages/AccountPage.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ProfileSection from "../components/accountprofile";
import { Pencil } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export default function AccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // server-shaped data
  const [server, setServer] = useState(null);

  // form-shaped data (what ProfileSection edits)
  const [formData, setFormData] = useState({
    personalInfo: {
      age: "",
      height: "",
      weight: "",
      gender: "",
      diabetesType: "",
      diagnosisYear: "",
      heightUnit: "cm",
      weightUnit: "kg",
    },
    medicalHistory: {
      medicalConditions: [],
      otherCondition: "",
      familyHeartDisease: "",
      familyMember: "",
      takingInsulin: "",
      insulinType: "",
      insulinDosage: "",
      insulinSchedule: "",
      allergies: [],
    },
    lifestyle: {
      smokingStatus: "",
      alcoholConsumption: "",
      exerciseFrequency: "",
    },
    monitoring: {
      bloodSugarMonitoring: "",
      hba1cReading: "",
      usesCGM: "",
      cgmFrequency: "",
      frequentHypoglycemia: "",
      hypoglycemiaFrequency: "",
    },
  });

  const token = useMemo(() => localStorage.getItem("accessToken"), []);
  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token]
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/v1/medical-profile/overview`, {
          method: "GET",
          headers: authHeaders,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json?.success === false) {
          throw new Error(json?.message || `Failed to load profile (${res.status})`);
        }

        const data = json?.data || json;

        // ---- normalize to UI shape ----
        const user = data?.user || {};
        const personal = data?.personalInfo || data?.personal_info || {};
        const medHist = data?.medicalHistory || data?.medical_history || {};
        const lifestyle = data?.lifestyle || {};
        const monitoring = data?.monitoring || {};
        

        const parseDOB = (dobStr) => {
          if (!dobStr) return null;
          const d = new Date(dobStr);
          return Number.isNaN(d.getTime()) ? null : d;
        };

        const dob = parseDOB(personal.dateOfBirth || personal.date_of_birth);
        const calcAge = (d) => {
          if (!d) return "";
          const today = new Date();
          let age = today.getFullYear() - d.getFullYear();
          const m = today.getMonth() - d.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
          return String(age);
        };

        const uiPersonal = {
          age: calcAge(dob),
          height: personal.heightCm ?? personal.height ?? "",
          weight: personal.weightKg ?? personal.weight ?? "",
          gender: personal.gender ?? "",
          diabetesType: personal.diabetesType ?? personal.diabetes_type ?? "",
          diagnosisYear: personal.diagnosisYear ?? personal.diagnosis_year ?? "",
          heightUnit: "cm",
          weightUnit: "kg",
        };

        const uiMedical = {
      
          medicalConditions: medHist.medicalConditions || medHist.conditionCatalog || [],
          otherCondition: medHist.otherCondition || "",
          familyHeartDisease:
            typeof medHist.familyHeartDisease === "boolean"
              ? medHist.familyHeartDisease
                ? "yes"
                : "no"
              : medHist.familyHeartDisease || "",
          familyMember: medHist.familyMember || "",
          takingInsulin:
            typeof medHist.takingInsulin === "boolean"
              ? medHist.takingInsulin
                ? "yes"
                : "no"
              : medHist.takingInsulin || "",
          insulinType: medHist.insulinType || "",
          insulinDosage: medHist.insulinDosage || "",
          insulinSchedule: medHist.insulinSchedule || "",
          allergies: medHist.allergies || [],
        };

        const uiLifestyle = {
          smokingStatus: lifestyle.smokingStatus || "",
          alcoholConsumption: lifestyle.alcoholConsumption || "",
          exerciseFrequency: lifestyle.exerciseFrequency || "",
        };

        const uiMonitoring = {
          bloodSugarMonitoring:
            monitoring.bloodSugarMonitoring || monitoring.glucose_frequency || "",
          hba1cReading:
            monitoring.hba1cReading ??
            monitoring.latestHba1cPercent ??
            monitoring.latest_hba1c_percent ??
            "",
          usesCGM:
            typeof monitoring.usesCGM === "boolean"
              ? monitoring.usesCGM
                ? "yes"
                : "no"
              : monitoring.usesCGM || "",
          cgmFrequency: monitoring.cgmFrequency || "",
          frequentHypoglycemia:
            typeof monitoring.frequentHypoglycemia === "boolean"
              ? monitoring.frequentHypoglycemia
                ? "yes"
                : "no"
              : monitoring.frequentHypoglycemia || "",
          hypoglycemiaFrequency: monitoring.hypoglycemiaFrequency || "",
        };

        setServer({
          user: {
            id: user.id,
            firstName: user.first_name || user.firstName || "",
            lastName: user.last_name || user.lastName || "",
            email: user.email || "",
          },
          personalInfo: uiPersonal,
          medicalHistory: uiMedical,
          lifestyle: uiLifestyle,
          monitoring: uiMonitoring,
        });

        setFormData({
          personalInfo: uiPersonal,
          medicalHistory: uiMedical,
          lifestyle: uiLifestyle,
          monitoring: uiMonitoring,
        });
      } catch (e) {
        setError(e.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [API_BASE, authHeaders, navigate, token]);

  function handleInputChange(section, field, value) {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  // -------------- Save handlers (PUT with fallback POST) --------------
  async function putOrPost(urlPut, bodyPut, urlPost, bodyPost) {
    // Try PUT
    const putRes = await fetch(urlPut, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(bodyPut),
    });
    if (putRes.status === 404 && urlPost) {
      // fallback create
      const postRes = await fetch(urlPost, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(bodyPost || bodyPut),
      });
      const postJson = await postRes.json().catch(() => ({}));
      if (!postRes.ok || postJson?.success === false) {
        throw new Error(postJson?.message || `POST failed (${postRes.status})`);
      }
      return postJson;
    }
    const putJson = await putRes.json().catch(() => ({}));
    if (!putRes.ok || putJson?.success === false) {
      throw new Error(putJson?.message || `PUT failed (${putRes.status})`);
    }
    return putJson;
  }

  async function savePersonalInfo(userId) {
    const p = formData.personalInfo;
    const nowYear = new Date().getFullYear();
    const ageNum = Number(p.age);
    const haveDOB = Number.isFinite(ageNum) && ageNum > 0;
    const payloadUpdate = {
      gender: p.gender || undefined,
      diabetesType: p.diabetesType || undefined,
      diagnosisYear: p.diagnosisYear ? Number(p.diagnosisYear) : undefined,
      // height/weight (server stores metric; UI uses cm/kg)
      height: p.height ? Number(p.height) : undefined,
      heightUnit: p.heightUnit || "cm",
      weight: p.weight ? Number(p.weight) : undefined,
      weightUnit: p.weightUnit || "kg",
    };
    if (haveDOB) {
      payloadUpdate.birthYear = nowYear - ageNum;
      payloadUpdate.birthMonth = 1;
      payloadUpdate.birthDay = 1;
    }

    // POST requires all fields, only fallback if we can provide them
    const payloadCreate = haveDOB
      ? {
          birthYear: payloadUpdate.birthYear,
          birthMonth: 1,
          birthDay: 1,
          gender: p.gender,
          height: Number(p.height),
          heightUnit: p.heightUnit || "cm",
          weight: Number(p.weight),
          weightUnit: p.weightUnit || "kg",
          diabetesType: p.diabetesType,
          diagnosisYear: Number(p.diagnosisYear),
        }
      : null;

    return putOrPost(
      `${API_BASE}/api/v1/medical-profile/personalinfo/${userId}`,
      payloadUpdate,
      payloadCreate ? `${API_BASE}/api/v1/medical-profile/personalinfo` : null,
      payloadCreate || undefined
    );
  }

  async function saveMedicalHistory(userId) {
    const m = formData.medicalHistory;
    const toArray = (v) =>
      Array.isArray(v) ? v : typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];

    const payload = {
      medicalConditions: toArray(m.medicalConditions),
      otherCondition: m.otherCondition || undefined,
      familyHeartDisease: m.familyHeartDisease === "yes",
      familyMember: m.familyMember || undefined,
      takingInsulin: m.takingInsulin === "yes",
      insulinType: m.insulinType || undefined,
      insulinDosage: m.insulinDosage || undefined,
      insulinSchedule: m.insulinSchedule || undefined,
      allergies: toArray(m.allergies),
    };

    // For POST (create), controller requires: medicalConditions, familyHeartDisease, takingInsulin
    const payloadCreate = {
      medicalConditions: payload.medicalConditions,
      familyHeartDisease: payload.familyHeartDisease,
      takingInsulin: payload.takingInsulin,
      insulinType: payload.insulinType,
      insulinDosage: payload.insulinDosage,
      insulinSchedule: payload.insulinSchedule,
      familyMember: payload.familyMember,
      allergies: payload.allergies,
    };

    return putOrPost(
      `${API_BASE}/api/v1/medical-profile/medicalhistory/${userId}`,
      payload,
      `${API_BASE}/api/v1/medical-profile/medicalhistory`,
      payloadCreate
    );
  }

  async function saveLifestyle(userId) {
    const l = formData.lifestyle;
    const payload = {
      smokingStatus: l.smokingStatus,
      alcoholConsumption: l.alcoholConsumption,
      exerciseFrequency: l.exerciseFrequency,
    };
    // POST and PUT payloads are the same
    return putOrPost(
      `${API_BASE}/api/v1/medical-profile/lifestylehabits/${userId}`,
      payload,
      `${API_BASE}/api/v1/medical-profile/lifestylehabits`,
      payload
    );
  }

  async function saveMonitoring(userId) {
    const m = formData.monitoring;
    const payload = {
      bloodSugarMonitoring: m.bloodSugarMonitoring,
      hba1cReading: m.hba1cReading === "" ? "" : Number(m.hba1cReading),
      usesCGM: m.usesCGM || "no",
      cgmFrequency: m.usesCGM === "yes" ? m.cgmFrequency : "",
      frequentHypoglycemia: m.frequentHypoglycemia || "no",
      hypoglycemiaFrequency: m.frequentHypoglycemia === "yes" ? m.hypoglycemiaFrequency : "",
    };

    // POST & PUT same shape
    return putOrPost(
      `${API_BASE}/api/v1/medical-profile/monitoringinfo/${userId}`,
      payload,
      `${API_BASE}/api/v1/medical-profile/monitoringinfo`,
      payload
    );
  }

  // Add this function at the top of your AccountPage.jsx
const getUserIdFromToken = (token) => {
  if (!token) return null;
  try {
    // Parse the JWT token payload (second part of the token)
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("🔍 JWT Payload:", payload);
    
    // Since your backend uses get_jwt_identity(), the user ID is likely the "sub" claim
    // or it might be stored in a custom field. Let's check common possibilities:
    return payload.sub || payload.user_id || payload.id || payload.identity;
  } catch (e) {
    console.error("Failed to parse JWT token:", e);
    return null;
  }
};
async function handleSubmit(e) {
  e.preventDefault();
  
  // Get user ID from JWT token instead of server response
  const userId = getUserIdFromToken(token);
  console.log("🔍 Extracted User ID from token:", userId);
  
  if (!userId) {
    return;
  }
  
  try {
    setBusy(true);
    setError("");

    console.log("🔄 Saving data for user ID:", userId);
    
    await Promise.all([
      savePersonalInfo(userId),
      saveMedicalHistory(userId),
      saveLifestyle(userId),
      saveMonitoring(userId),
    ]);

    setIsEditing(false);

    // refresh view
    const res = await fetch(`${API_BASE}/api/v1/medical-profile/overview`, {
      headers: authHeaders,
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json?.data) {
      window.location.reload();
    }
  } catch (err) {
    console.error("❌ Save error:", err);
    setError(err?.message || "Failed to save changes");
  } finally {
    setBusy(false);
  }
}

  if (!token) return null;
  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-red-50 font-sans">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div className="pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            aria-label="Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-red-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-700">Your Profile</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-red-700 hover:text-red-900"
                >
                  <Pencil size={18} className="mr-1" />
                  Edit
                </button>
              )}
            </div>

            {server && (
              <ProfileSection
                userData={{
                  firstName: server.user.firstName,
                  lastName: server.user.lastName,
                  email: server.user.email,
                  personalInfo: formData.personalInfo,
                  medicalHistory: formData.medicalHistory,
                  lifestyle: formData.lifestyle,
                  monitoring: formData.monitoring,
                }}
                isEditing={isEditing}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {isEditing && (
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  disabled={busy}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 disabled:opacity-60"
                  disabled={busy}
                >
                  {busy ? "Saving..." : "Submit Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

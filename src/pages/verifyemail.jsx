"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [msg, setMsg] = useState("Verifying your email...");
  const [err, setErr] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setErr("Missing verification token.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/v1/auth/verify?token=${encodeURIComponent(token)}`, {
          method: "GET",
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && (json?.success ?? true)) {
          setMsg(json?.message || "Email verified!");
          // small delay so the user sees the success
          setTimeout(() => navigate("/personal-info"), 600);
        } else {
          setErr(json?.message || `Verification failed (${res.status}).`);
        }
      } catch {
        setErr("Network error during verification.");
      }
    })();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow border bg-white">
        {err ? <p className="text-red-600">{err}</p> : <p className="text-green-700">{msg}</p>}
      </div>
    </div>
  );
}

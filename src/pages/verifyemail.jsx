// src/pages/VerifyEmail.jsx
import { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle, Loader2, MailCheck } from "lucide-react";

/**
 * Cute, on-brand email verification screen.
 * - Uses your red-700 + soft gray palette and background image.
 * - StrictMode-safe: guards the effect from running twice in dev.
 * - Never downgrades success to error if a second call happens.
 *
 * Backend URL:
 * - If using a Vite proxy, you can set USE_PROXY=true and it will call /api directly.
 * - Otherwise, set VITE_API_BASE_URL in your .env (e.g., http://127.0.0.1:5000).
 */
export default function VerifyEmail() {
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("Verifying your email...");
  const didRun = useRef(false); // StrictMode guard (dev only)

  const USE_PROXY =
    (import.meta.env.VITE_USE_PROXY ?? "").toString().toLowerCase() === "true";
  const BASE_URL = USE_PROXY
    ? "" // dev proxy in vite.config.* will forward /api -> Flask
    : import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    if (didRun.current) return; // prevent second invoke in React 18 StrictMode
    didRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing token.");
      return;
    }

    const url = `${BASE_URL}/api/v1/auth/verify?token=${encodeURIComponent(
      token
    )}`;

    fetch(url)
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (res.ok && body?.success) {
          setStatus("success");
          setMessage("Email verified successfully! You can now log in.");
        } else {
          // Do not downgrade from success if it somehow already happened
          setStatus((s) => (s === "success" ? s : "error"));
          setMessage(body?.message || "Invalid token");
        }
      })
      .catch(() => {
        setStatus((s) => (s === "success" ? s : "error"));
        setMessage("Network error verifying your email.");
      });
  }, [BASE_URL]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{
        backgroundImage: 'url("/public/Image 1.jpg")', // match your other page
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <div className="relative">
          {/* floating badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="bg-white/80 backdrop-blur border border-red-200 text-red-700 px-4 py-1 rounded-full text-sm shadow-sm">
              <span className="inline-flex items-center gap-2">
                <MailCheck className="w-4 h-4" />
                Email Verification
              </span>
            </div>
          </div>

          {/* main card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-8 pt-12">
            <div className="flex flex-col items-center text-center">
              {status === "loading" && (
                <>
                  <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-50 border border-red-100 w-16 h-16">
                    <Loader2 className="w-8 h-8 animate-spin text-red-700" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-red-700">
                    Verifying…
                  </h1>
                  <p className="mt-2 text-gray-600">{message}</p>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-50 border border-red-100 w-16 h-16">
                    <CheckCircle className="w-8 h-8 text-red-700" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-red-700">
                    Verified 🎉
                  </h1>
                  <p className="mt-2 text-gray-700">{message}</p>
                  {/* tiny confetti dots for cuteness */}
                  <div className="mt-3 flex gap-1 opacity-80">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-bounce [animation-delay:-.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:.0s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-bounce [animation-delay:.2s]" />
                  </div>
                </>
              )}

              {status === "error" && (
                <>
                  <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-50 border border-red-100 w-16 h-16">
                    <XCircle className="w-8 h-8 text-red-700" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-red-700">
                    Verification problem
                  </h1>
                  <p className="mt-2 text-gray-700">{message}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try registering again to get a fresh link.
                  </p>
                </>
              )}
            </div>

            {/* actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition"
              >
                Home
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-2.5 text-white font-semibold hover:bg-red-800 transition shadow-sm"
              >
                Go to Login
              </a>
            </div>
          </div>

          {/* soft red glow */}
          <div className="absolute -z-10 inset-0 blur-2xl pointer-events-none">
            <div className="w-48 h-48 rounded-full bg-red-200/40 mx-auto mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

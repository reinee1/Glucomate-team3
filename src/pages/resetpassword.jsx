import { useEffect, useMemo, useState } from "react";
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";

export default function ResetPassword() {
  const USE_PROXY =
    (import.meta.env.VITE_USE_PROXY ?? "").toString().toLowerCase() === "true";
  const BASE_URL = USE_PROXY ? "" : (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000");

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const token = params.get("token") || ""; 

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing or invalid reset link.");
    }
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    const new_password = pw.trim();
    if (new_password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (new_password !== pw2.trim()) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setStatus("success");
        setMessage("Password updated successfully. You can now log in.");
      } else {
        setStatus("error");
        setMessage(json?.message || "Reset failed. Please request a new link.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
      style={{ backgroundImage: 'url("/public/Image 1.jpg")' }}
    >
      <div className="w-full max-w-md">
        <div className="relative">
          {/* floating badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="bg-white/80 backdrop-blur border border-red-200 text-red-700 px-4 py-1 rounded-full text-sm shadow-sm">
              <span className="inline-flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Set New Password
              </span>
            </div>
          </div>

          {/* card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-8 pt-12">
            <h1 className="text-2xl font-extrabold text-red-700 text-center">Create a new password</h1>
            <p className="mt-2 text-center text-gray-600">
              Your reset link is valid for a limited time. Choose a strong password.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">New password</label>
                <div className="mt-1 relative">
                  <input
                    type={show ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Confirm password</label>
                <input
                  type={show ? "text" : "password"}
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-md">
                  <CheckCircle className="w-4 h-4" />
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                  <XCircle className="w-4 h-4" />
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !token}
                className={clsx(
                  "w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-white font-semibold shadow-sm transition",
                  submitting || !token ? "bg-red-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-800"
                )}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                Set new password
              </button>

              <div className="text-center text-sm mt-2">
                <a href="/login" className="text-gray-700 hover:text-gray-900 underline">Go to login</a>
              </div>
            </form>
          </div>

          {/* soft glow */}
          <div className="absolute -z-10 inset-0 blur-2xl pointer-events-none">
            <div className="w-48 h-48 rounded-full bg-red-200/40 mx-auto mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

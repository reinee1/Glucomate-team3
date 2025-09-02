import { useState } from "react";
import { Mail, Loader2, ArrowLeft, SendHorizonal } from "lucide-react";
import clsx from "clsx";

export default function ForgotPassword() {
  const USE_PROXY =
    (import.meta.env.VITE_USE_PROXY ?? "").toString().toLowerCase() === "true";
  const BASE_URL = USE_PROXY ? "" : (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000");

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");     
  const [error, setError] = useState("");       

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError("Please enter your email address.");
    setSubmitting(true);
    setError("");
    setNotice("");

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const json = await res.json().catch(() => null);
      setNotice(json?.message || "If that email exists, a reset link has been sent.");
    } catch {
      setError("Network error. Please try again.");
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
                <Mail className="w-4 h-4" />
                Forgot Password
              </span>
            </div>
          </div>

          {/* card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-8 pt-12">
            <h1 className="text-2xl font-extrabold text-red-700 text-center">Reset your password</h1>
            <p className="mt-2 text-center text-gray-600">
              Enter the email associated with your account and we’ll send you a reset link.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Email address</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>

              {notice && (
                <div className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-md">
                  {notice}
                </div>
              )}
              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={clsx(
                  "w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-white font-semibold shadow-sm transition",
                  submitting ? "bg-red-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-800"
                )}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
                Reset your password
              </button>
            </form>

            <div className="mt-6 flex justify-center">
              <a href="/login" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </a>
            </div>
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

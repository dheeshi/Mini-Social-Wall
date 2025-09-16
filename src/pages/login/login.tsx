// src/pages/login/login.tsx
import React, { useState } from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      // you can access result.user to inspect displayName/photoURL if needed
      navigate("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-green-400 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-800 dark:text-white">Welcome back</h2>
        <p className="text-sm text-center mb-6 text-slate-600 dark:text-slate-300">Sign in to create and interact with posts</p>

        {error && <div className="bg-red-50 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}

        <button
          onClick={signIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border rounded px-4 py-3 hover:shadow-sm transition disabled:opacity-60"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          By continuing you agree to the <span className="underline">Terms</span> and <span className="underline">Privacy</span>.
        </div>
      </div>
    </div>
  );
};

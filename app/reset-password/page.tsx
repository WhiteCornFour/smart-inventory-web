"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Ensure your environment variables are correctly set in .env.local
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"ready" | "loading" | "success" | "error">("ready");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleSession = async () => {
      // 1. Check for PKCE pattern (?code=...)
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      
      if (code) {
        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setErrorMessage("Invalid or expired reset link.");
          setStatus("error");
          return;
        }
        // Clear code from URL to prevent re-exchange on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // 2. Fallback check for Implicit pattern (#access_token=...)
      const hash = window.location.hash;
      if (hash && hash.includes("access_token")) {
        const hashParams = new URLSearchParams(hash.replace("#", ""));
        const access_token = hashParams.get("access_token");
        const refresh_token = hashParams.get("refresh_token");
        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (error) {
             setErrorMessage("Expired reset link.");
             setStatus("error");
          } else {
             // Clear hash from URL for tidiness
             window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      }
    };

    handleSession();

    // Optionally listen to events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Recovery access granted
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      setStatus("error");
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("success");
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md p-8 sm:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center min-h-[250px] gap-6 animate-in fade-in duration-500">
           <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#F16A2D] to-[#FCA5A5] text-white shadow-xl shadow-[#F16A2D]/30 animate-[bounce_0.5s_ease-out]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Update Successful</h1>
            <p className="text-gray-400 font-medium">Please close this browser and return to the app to log in.</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="space-y-3 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Reset Password
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Please enter your new password below.
            </p>
          </div>

          <div className="w-full space-y-5">
            <div className="text-left space-y-4">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F16A2D] focus:border-transparent transition-all shadow-inner"
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F16A2D] focus:border-transparent transition-all shadow-inner"
              />
              {status === "error" && (
                <p className="text-sm font-medium text-[#ef4444] px-1">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              onClick={handleUpdatePassword}
              disabled={status === "loading" || !password || !confirmPassword}
              className="group relative w-full overflow-hidden px-6 py-4 rounded-2xl bg-[#F16A2D] hover:bg-[#E05B1C] disabled:bg-[#F16A2D]/40 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#F16A2D]/20 border border-white/10"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 blur-md group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full" />
              <span className="relative flex items-center justify-center gap-3 font-semibold text-white tracking-wide">
                {status === "loading" ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
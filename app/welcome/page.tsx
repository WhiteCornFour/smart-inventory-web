"use client";

import { useEffect, useState } from "react";

export default function WelcomePage() {
  const [status, setStatus] = useState<"loading" | "success">("loading");

  useEffect(() => {
    const search = window.location.search;
    const hash = window.location.hash;

    const initialTimer = setTimeout(() => {
      setStatus("success");

      const redirectTimer = setTimeout(() => {
        window.location.href = `io.supabase.flutter://login-callback${search}${hash}`;
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }, 1000);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md p-8 sm:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-center gap-6 text-center transition-all duration-700 ease-in-out transform hover:scale-[1.02]">
      <div className="relative flex items-center justify-center h-24 w-24 mb-2">
        <div className={`absolute inset-0 bg-[#F16A2D] blur-xl rounded-full transition-opacity duration-700 ${status === "loading" ? "opacity-30 animate-pulse" : "opacity-0"}`} />

        {status === "loading" ? (
          <svg className="w-16 h-16 text-[#F16A2D] animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#F16A2D] to-[#FCA5A5] text-white shadow-xl shadow-[#F16A2D]/30 animate-[bounce_0.5s_ease-out]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {status === "loading" ? "Đang xác thực..." : "Xác thực thành công"}
        </h1>
        <p className="text-sm sm:text-base text-gray-400 font-medium">
          {status === "loading"
            ? "Vui lòng đợi giây lát."
            : "Đang tự động mở ứng dụng..."}
        </p>
      </div>
    </div>
  );
}

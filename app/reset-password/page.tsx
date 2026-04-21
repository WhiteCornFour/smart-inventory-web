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
  const [status, setStatus] = useState<"checking" | "ready" | "loading" | "success" | "error">("checking");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 1. Check existing session on mount
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setStatus("ready");
      }
    };
    initSession();

    // 2. Listen for auth state changes (strictly for PASSWORD_RECOVERY or generic sign in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setStatus("ready");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      setStatus("error");
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
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
      // Auto-redirect to the mobile app after 2 seconds
      setTimeout(() => {
        window.location.href = "io.supabase.flutter://login-callback";
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md p-8 sm:p-10 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out">
      {status === "checking" ? (
        <div className="flex flex-col items-center justify-center min-h-[250px] gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F16A2D] blur-xl opacity-30 rounded-full animate-pulse" />
            <svg className="w-16 h-16 text-[#F16A2D] animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-400 font-medium">Đang kiểm tra bảo mật...</p>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center justify-center min-h-[250px] gap-6 animate-in fade-in duration-500">
          <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#F16A2D] to-[#FCA5A5] text-white shadow-xl shadow-[#F16A2D]/30 animate-[bounce_0.5s_ease-out]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Đổi mật khẩu thành công</h1>
            <p className="text-gray-400 font-medium">Đang tự động mở ứng dụng...</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="space-y-3 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Đặt lại mật khẩu
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
            </p>
          </div>

          <div className="w-full space-y-5">
            <div className="text-left space-y-2">
              <input
                type="password"
                placeholder="Nhập mật khẩu mới..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={status === "loading" || !password}
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
                    Đang thiết lập...
                  </>
                ) : (
                  "Cập nhật mật khẩu"
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
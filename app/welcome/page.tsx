"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 flex flex-col font-sans selection:bg-[#F16A2D]/20">
      {/* Header tối giản */}
      <nav className="px-6 py-5 flex justify-center md:justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 bg-[#F16A2D] rounded-2xl flex items-center justify-center shadow-lg shadow-[#F16A2D]/20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter">
            Smart<span className="text-[#F16A2D]">Inventory</span>
          </span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center -mt-10">
        {/* Icon thành công phỏng theo style Screen 01 */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-[#FFE8DC] rounded-[32px] flex items-center justify-center mx-auto rotate-3">
            <div className="w-20 h-20 bg-white rounded-[24px] shadow-sm flex items-center justify-center -rotate-3 border border-[#FFE8DC]">
              <svg
                className="w-10 h-10 text-[#F16A2D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F16A2D] rounded-full border-4 border-white shadow-md animate-bounce"></div>
        </div>

        {loading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-64 bg-gray-100 rounded-full"></div>
          </div>
        ) : userEmail ? (
          <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter mb-4">
              Xác thực thành công!
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Chào mừng{" "}
              <span className="font-bold text-gray-900">{userEmail}</span>, tài
              khoản của bạn đã sẵn sàng để quản lý kho hàng.
            </p>

            <div className="space-y-4 w-full">
              <button
                onClick={() =>
                  (window.location.href = "io.supabase.flutter://")
                }
                className="w-full group bg-[#F16A2D] text-white py-5 rounded-[24px] font-extrabold text-xl shadow-xl shadow-[#F16A2D]/20 hover:bg-[#E05B1C] transition-all active:scale-[0.97] flex items-center justify-center gap-3"
              >
                Mở Ứng Dụng Ngay
                <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </button>

              <p className="text-sm text-gray-400 font-medium">
                Bạn có thể đóng trình duyệt này sau khi vào App
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-md">
            <h1 className="text-3xl font-black text-gray-950 mb-4">
              Opps! Link hết hạn
            </h1>
            <p className="text-gray-600 mb-8">
              Vui lòng kiểm tra lại email hoặc thực hiện đăng ký lại trên ứng
              dụng Mobile.
            </p>
            <button
              onClick={() => (window.location.href = "io.supabase.flutter://")}
              className="px-8 py-4 bg-gray-900 text-white rounded-[20px] font-bold hover:bg-gray-800 transition shadow-lg"
            >
              Quay lại Ứng dụng
            </button>
          </div>
        )}

        {/* Trang trí họa tiết Vector mờ (Style của app) */}
        <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-[#F16A2D]/5 rounded-full blur-3xl -z-10"></div>
        <div className="fixed -top-20 -right-20 w-80 h-80 bg-gray-100 rounded-full blur-3xl -z-10"></div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Smart Inventory Ecosystem • 2026
        </p>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase Client
// Đảm bảo bạn có các biến môi trường này trong file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    checkUser();

    // Lắng nghe sự kiện đăng nhập/đăng xuất
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUserEmail(session.user.email ?? null);
      } else if (event === "SIGNED_OUT") {
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-950 flex flex-col font-sans">
      {/* 1. Thanh Menu (Header) - Thiết kế tối giản */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo SI - Lấy từ Screen 01 */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-gray-50 border border-gray-100 shadow-inner">
              <span className="text-2xl font-black text-[#F16A2D]">S</span>
              <div className="w-4 h-4 rounded-sm bg-[#F16A2D] flex items-center justify-center relative top-[2px]">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-extrabold text-gray-950 tracking-tight">
              Smart<span className="text-[#F16A2D]">Inventory</span>
            </span>
          </Link>

          {/* User Section / CTA */}
          <div className="flex items-center gap-3">
            {userEmail ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-[#FFE8DC] flex items-center justify-center text-[#F16A2D] font-bold border-2 border-white ring-2 ring-gray-100">
                    {userEmail.substring(0, 1).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {userEmail}
                  </span>
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition"
                >
                  Log out
                </button>
              </div>
            ) : (
              // Bỏ "About", "Support", thay bằng nút CTA chính
              <button
                onClick={() =>
                  (window.location.href = "io.supabase.flutter://")
                }
                className="group px-6 py-3 text-sm font-bold text-white bg-gray-950 rounded-full hover:bg-gray-800 transition active:scale-[0.98] shadow-lg shadow-gray-200 flex items-center gap-2"
              >
                Launch Mobile App
                <div className="p-1 rounded-full bg-white/20 group-hover:bg-[#F16A2D] transition">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Phần giới thiệu chính (Hero & Features) */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        {/* Supabase Badge */}
        <div className="p-2.5 rounded-full bg-[#FFE8DC] border border-[#FFDCCB] inline-flex items-center gap-2.5 mb-10 shadow-sm">
          <div className="animate-pulse h-3 w-3 rounded-full bg-[#F16A2D] shadow-lg shadow-[#FFBF9C]"></div>
          <span className="text-xs font-bold text-[#A54116] uppercase tracking-wider">
            Powered by Supabase Auth
          </span>
        </div>

        {/* Hero Title & Text (Style từ Screen 02) */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter leading-tight mb-6">
            <span className="text-[#F16A2D]">Empower</span> Your
            <br />
            Business Ecosystem
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Manage your stocks, track shipments, and analyze data like never
            before. Effortless control, anytime, anywhere, all synced with your
            mobile experience.
          </p>

          {userEmail ? (
            <div className="inline-flex flex-col items-center gap-5 p-8 bg-white border border-gray-100 rounded-[32px] shadow-xl shadow-gray-100/70">
              <h2 className="text-2xl font-bold text-gray-950">
                You&apos;re all set,
              </h2>
              <p className="text-gray-600">
                Logged in securely. Ready to manage your inventory?
              </p>
              <button
                onClick={() =>
                  (window.location.href = "io.supabase.flutter://")
                }
                className="group px-10 py-4.5 text-lg font-extrabold text-white bg-[#F16A2D] rounded-full hover:bg-[#E05B1C] transition active:scale-[0.98] shadow-xl shadow-[#FFDCCB] flex items-center gap-3"
              >
                Go to Mobile Dashboard
                <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 transition">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ) : (
            // Lược bỏ "Sign up" web, chỉ điều hướng về app
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() =>
                  (window.location.href = "io.supabase.flutter://signup")
                }
                className="group px-10 py-4 text-lg font-extrabold text-white bg-gray-950 rounded-full hover:bg-gray-800 transition active:scale-[0.98] shadow-xl shadow-gray-200 flex items-center gap-3"
              >
                Create Account via App
                <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-[#F16A2D] transition">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Feature Cards Section - Thiết kế mô phỏng App On-boarding */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          {/* Card 1: Elevate Your Tracking (Phỏng theo Screen 02.1) */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 text-left shadow-xl shadow-gray-100/50 relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FFE8DC] to-[#F16A2D]/10 rounded-full blur-2xl opacity-70"></div>

            <div className="p-4 rounded-3xl bg-[#FFE8DC] border-2 border-white shadow-lg inline-flex relative z-10">
              {/* Mô phỏng icon hộp + biểu đồ */}
              <svg
                className="w-10 h-10 text-[#F16A2D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10m-1 7a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <h3 className="text-3xl font-black text-gray-950 tracking-tighter leading-tight relative z-10 mt-2">
              Elevate Your Tracking With{" "}
              <span className="text-[#F16A2D]">Real-Time Data</span>
            </h3>
            <p className="text-gray-600 font-medium relative z-10">
              Say goodbye to manual counting. Monitor your stock, track
              movements, and manage orders instantly with absolute precision.
            </p>
          </div>

          {/* Card 2: Scale Your Business (Phỏng theo Screen 02.1) */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 text-left shadow-xl shadow-gray-100/50 relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#F16A2D]/10 to-[#A54116]/10 rounded-full blur-2xl opacity-70"></div>

            <div className="p-4 rounded-3xl bg-gray-900 border-2 border-white shadow-lg inline-flex relative z-10">
              {/* Mô phỏng icon người dùng + insights */}
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3 className="text-3xl font-black text-gray-950 tracking-tighter leading-tight relative z-10 mt-2">
              Scale Your Business With{" "}
              <span className="text-gray-950 underline decoration-[#F16A2D]/40 decoration-wavy">
                Smart Insights
              </span>
            </h3>
            <p className="text-gray-600 font-medium relative z-10">
              Make data-driven decisions effortlessly. Sync your inventory
              across all devices securely and watch your efficiency grow.
            </p>
          </div>
        </div>
      </main>

      {/* 3. Chân trang (Footer) - Giữ tối giản */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <p className="text-sm text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} Smart Inventory System. All rights
            reserved.
            <br />A Capstone Project.
          </p>
          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link
              href="#"
              className="text-gray-600 hover:text-[#F16A2D] transition"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-[#F16A2D] transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase Client
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* 1. Thanh Menu (Header) */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-blue-600 shadow-lg shadow-blue-100">
              <span className="text-white text-xl font-bold">SI</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Smart<span className="text-blue-600">Inventory</span>
            </span>
          </Link>

          {/* Các nút điều hướng */}
          <div className="flex items-center gap-3">
            {userEmail ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border-2 border-white ring-2 ring-gray-100">
                    {userEmail.substring(0, 1).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {userEmail}
                  </span>
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 transition"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="#"
                  className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  Support
                </Link>
                <button
                  onClick={() =>
                    (window.location.href = "io.supabase.flutter://")
                  }
                  className="px-5 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition active:scale-[0.98] shadow-lg shadow-gray-200"
                >
                  Open Mobile App
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Phần giới thiệu chính (Hero Section) */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="p-2.5 rounded-full bg-blue-50 border-2 border-blue-100 inline-flex items-center gap-2 mb-8">
          <div className="animate-pulse h-3 w-3 rounded-full bg-blue-600 shadow-lg shadow-blue-200"></div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Powered by Supabase Auth
          </span>
        </div>
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-950 tracking-tighter leading-tight mb-8">
            Welcome to the new era of
            <br />{" "}
          </h1>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Smart Inventory Management
          </span>
        </div>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Manage your stocks, track shipments, and analyze data like never
          before. Effortless control, anytime, anywhere. Secure your account and
          get started instantly.
        </p>

        {userEmail ? (
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">
              Get back to business,
            </h2>
            <p className="text-gray-600 mb-2">
              You are securely logged in to our ecosystem.
            </p>
            <button
              onClick={() => (window.location.href = "io.supabase.flutter://")}
              className="px-10 py-4 text-lg font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition active:scale-[0.98] shadow-xl shadow-blue-200"
            >
              Go to Mobile Dashboard →
            </button>
          </div>
        ) : (
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() =>
                (window.location.href = "io.supabase.flutter://signup")
              }
              className="px-8 py-3.5 text-lg font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition active:scale-[0.98] shadow-lg shadow-blue-100"
            >
              Sign up from App
            </button>
            <Link
              href="/reset-password"
              className="px-8 py-3.5 text-lg font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Reset Password →
            </Link>
          </div>
        )}
      </main>

      {/* 3. Chân trang (Footer) */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <p className="text-sm text-gray-500">
            &copy; 2026 Smart Inventory System. All rights reserved.
            <br />
            Designed with <span className="text-red-500">♥</span> for Capstone
            Project.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

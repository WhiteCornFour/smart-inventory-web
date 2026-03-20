"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Header */}
      <nav className="border-b border-zinc-100 px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            SI
          </div>
          <span className="text-xl font-bold tracking-tight">
            Smart<span className="text-blue-600">Inventory</span>
          </span>
        </div>
        <div className="flex gap-4">
          {userEmail ? (
            <span className="text-sm font-medium bg-zinc-100 px-4 py-2 rounded-full">
              {userEmail}
            </span>
          ) : (
            <button
              onClick={() => (window.location.href = "io.supabase.flutter://")}
              className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition shadow-md"
            >
              Get the App
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
          Smart Inventory System 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
          Manage your stock <br />
          <span className="text-blue-600 italic">smarter, not harder.</span>
        </h1>
        <p className="max-w-2xl text-lg text-zinc-500 mb-12 leading-relaxed">
          The ultimate companion for your business. Track assets, monitor
          levels, and get real-time insights directly from your mobile device.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() =>
              (window.location.href = "io.supabase.flutter://signup")
            }
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-100 active:scale-95"
          >
            Start Free Trial
          </button>
          <Link
            href="/reset-password"
            className="flex-1 bg-white border border-zinc-200 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition active:scale-95"
          >
            Reset Password
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-zinc-100 text-center">
        <p className="text-sm text-zinc-400 font-medium">
          © 2026 Smart Inventory • Software Engineering Capstone Project
        </p>
      </footer>
    </div>
  );
}

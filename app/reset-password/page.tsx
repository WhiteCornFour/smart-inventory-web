"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const handleAuth = async () => {
      // 1. Kiểm tra URL xem có chứa 'code' không
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        // QUAN TRỌNG: Đổi mã 'code' lấy Session để tránh lỗi "Auth session missing"
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          setIsRecoveryMode(true);
        } else {
          setMessage({
            type: "error",
            text: "Invalid or expired recovery link.",
          });
        }
      }
    };

    handleAuth();

    // 2. Lắng nghe sự kiện Auth làm phương án dự phòng
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryMode(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của dữ liệu nhập
    if (!password || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Cập nhật mật khẩu mới cho người dùng hiện tại trong Session
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Password updated successfully! You can now log in from the app.",
        });
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  // Giao diện khi chưa xác thực xong link
  if (!isRecoveryMode && !message.text) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Verifying recovery link...
          </p>
          <p className="text-gray-400 text-sm mt-2">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Reset Password
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your new secure password below
          </p>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 text-sm font-medium ${
              message.type === "error"
                ? "bg-red-50 text-red-700 border border-red-100"
                : "bg-green-50 text-green-700 border border-green-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {isRecoveryMode && (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3.5 rounded-lg font-bold hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-gray-400 mt-4 shadow-lg shadow-blue-200"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 text-xs mt-8">
          &copy; 2026 Smart Inventory System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

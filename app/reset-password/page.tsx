"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
    const handleRecovery = async () => {
      // Supabase tự đọc access_token từ URL
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setIsRecoveryMode(true);
      } else {
        setMessage({
          type: "error",
          text: "Recovery link invalid or expired",
        });
        console.log("Chi tiết lỗi: ", error);
      }
    };

    handleRecovery();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "Password updated successfully!",
      });

      setTimeout(() => {
        window.location.href =
          "https://smart-inventory-web-fawn.vercel.app/login";
      }, 3000);
    }

    setLoading(false);
  };

  if (!isRecoveryMode && !message.text) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verifying recovery link...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-black">Reset Password</h1>

        {message.text && <div className="mb-4 text-sm">{message.text}</div>}

        {isRecoveryMode && (
          <form onSubmit={handleUpdatePassword}>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-3 mb-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-3 mb-3 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

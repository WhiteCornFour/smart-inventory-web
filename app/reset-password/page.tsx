"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [sessionReady, setSessionReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRecovery = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token || !refresh_token) {
        setMessage("Recovery link invalid or expired");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setSessionReady(true);
      }
    };

    handleRecovery();
  }, []);

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully");

      setTimeout(() => {
        window.location.href =
          "https://smart-inventory-web-fawn.vercel.app/login";
      }, 2000);
    }

    setLoading(false);
  };

  if (!sessionReady && !message) {
    return <div>Verifying recovery link...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[400px] border p-6 rounded">
        <h1 className="text-xl mb-4">Reset Password</h1>

        {message && <p className="mb-3">{message}</p>}

        {sessionReady && (
          <form onSubmit={updatePassword}>
            <input
              type="password"
              placeholder="New password"
              className="border w-full p-2 mb-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="border w-full p-2 mb-3 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full p-2"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

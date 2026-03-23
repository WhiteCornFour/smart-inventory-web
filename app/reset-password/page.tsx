"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRecovery = async () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const type = params.get("type");

      if (!token || type !== "recovery") {
        setMessage("Recovery link invalid or expired");
        return;
      }

      // Verify recovery token → create session
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
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
    <div>
      <h1>Reset Password</h1>

      {message && <p>{message}</p>}

      {sessionReady && (
        <form onSubmit={updatePassword}>
          <input
            type="password"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

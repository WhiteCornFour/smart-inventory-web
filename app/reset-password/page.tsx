"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRecovery = async () => {
      console.log("===== RESET PASSWORD FLOW START =====");
      console.log("Current URL:", window.location.href);

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      console.log("Code from URL:", code);

      if (!code) {
        console.log("ERROR: Code not found");
        setMessage("Recovery link invalid or expired");
        return;
      }

      console.log("Calling exchangeCodeForSession...");

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      console.log("exchange result:", data);
      console.log("exchange error:", error);

      if (error) {
        setMessage(error.message);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Session after exchange:", session);

      if (!session) {
        console.log("ERROR: Session null after exchange");
        setMessage("Session not created");
        return;
      }

      console.log("Session OK → Ready to reset password");
      setSessionReady(true);
    };

    handleRecovery();
  }, []);

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("===== UPDATE PASSWORD =====");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    console.log("updateUser result:", data);
    console.log("updateUser error:", error);

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

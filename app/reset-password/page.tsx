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
      console.log("===== RESET PASSWORD FLOW START =====");

      // Log full URL
      console.log("Current URL:", window.location.href);

      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const type = params.get("type");

      console.log("Token from URL:", token);
      console.log("Type from URL:", type);

      if (!token) {
        console.log("ERROR: Token not found in URL");
        setMessage("Recovery link invalid or expired");
        return;
      }

      if (type !== "recovery") {
        console.log("ERROR: Type is not recovery");
        setMessage("Invalid recovery type");
        return;
      }

      console.log("Calling verifyOtp...");

      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
      });

      console.log("verifyOtp result:", data);
      console.log("verifyOtp error:", error);

      if (error) {
        console.log("ERROR verifyOtp:", error.message);
        setMessage(error.message);
        return;
      }

      console.log("Getting session after verify...");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Session after verify:", session);

      if (!session) {
        console.log("ERROR: Session is null after verify");
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

    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (password !== confirmPassword) {
      console.log("ERROR: Passwords do not match");
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    console.log("Calling updateUser...");

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    console.log("updateUser result:", data);
    console.log("updateUser error:", error);

    if (error) {
      console.log("ERROR updateUser:", error.message);
      setMessage(error.message);
    } else {
      console.log("Password updated successfully");
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

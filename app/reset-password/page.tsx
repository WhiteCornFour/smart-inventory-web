"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const handleSession = async () => {
      console.log("Full URL:", window.location.href);
      console.log("Hash:", window.location.hash);

      // Lấy token từ URL hash
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", ""));

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Set session error:", error);
        } else {
          setSessionReady(true);
        }
      }
    };

    handleSession();
  }, []);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) alert(error.message);
    else alert("Password updated");
  };

  if (!sessionReady) return <div>Verifying recovery link...</div>;

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={updatePassword}>Update Password</button>
    </div>
  );
}
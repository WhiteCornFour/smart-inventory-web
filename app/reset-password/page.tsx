"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      console.log("Full URL:", window.location.href);
      console.log("Hash:", window.location.hash);

      const { data, error } = await supabase.auth.getSession();

      console.log("Session:", data);
      console.log("Error:", error);

      if (data.session) {
        setSessionReady(true);
      }
    };

    getSession();
  }, []);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) alert(error.message);
    else alert("Password updated");
  };

  if (!sessionReady) return <div>Verifying...</div>;

  return (
    <div>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={updatePassword}>Update Password</button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function check() {
      const { error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1);

      if (error) {
        setStatus("Error: " + error.message);
      } else {
        setStatus("Connected to Supabase ✅");
      }
    }

    check();
  }, []);

  return (
    <div className="p-8 text-2xl">
      {status}
    </div>
  );
} 
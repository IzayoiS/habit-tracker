"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/user";

export default function InitializeAuth() {
  const initialize = useAuth((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return null;
}

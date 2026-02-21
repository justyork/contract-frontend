"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Profile } from "@/types/api";
import { api } from "@/lib/api";

interface AuthContextValue {
  token: string | null;
  setToken: (t: string | null) => void;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((t: string | null) => {
    if (typeof window !== "undefined") {
      if (t) localStorage.setItem("token", t);
      else localStorage.removeItem("token");
    }
    setTokenState(t);
    if (!t) setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!token) {
      setProfile(null);
      return;
    }
    try {
      const p = await api.get<Profile>("/profile");
      setProfile(p);
    } catch {
      setToken(null);
      setProfile(null);
    }
  }, [token, setToken]);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    queueMicrotask(() => {
      setTokenState(t);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      queueMicrotask(() => setProfile(null));
      return;
    }
    queueMicrotask(() => void refreshProfile());
  }, [token, refreshProfile]);

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const value: AuthContextValue = {
    token,
    setToken,
    profile,
    loading,
    refreshProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface AuthUser {
  id: number;
  email: string;
  fullName: string | null;
  phone: string | null;
  accountType: string;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("satellite-user", JSON.stringify(data.user));
        }
      } else {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("satellite-user");
        }
      }
    } catch {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("satellite-user");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Hydrate from localStorage first for instant display
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("satellite-user");
        if (stored) {
          const parsed = JSON.parse(stored) as AuthUser;
          setUser(parsed);
        }
      } catch {
        setUser(null);
      }
    }
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

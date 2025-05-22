"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { User } from "@/types/user";
import {
  authService,
  LoginCredentials,
  RegisterCredentials,
  setTokens,
  setUser as setUserCookie,
  getUser as getUserFromCookie,
} from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = getUserFromCookie();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setTokens(response.access_token, response.refresh_token);

      const userProfile = await authService.getProfile();
      setUserCookie(userProfile);
      setUser(userProfile);

      toast.success("Successfully logged in");

      window.location.href = "/dashboard";
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      const response = await authService.register(credentials);
      setTokens(response.access_token, response.refresh_token);

      const userProfile = await authService.getProfile();
      setUserCookie(userProfile);
      setUser(userProfile);

      toast.success("Account created successfully");

      window.location.href = "/dashboard";
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success("Successfully logged out");

    window.location.href = "/login";
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

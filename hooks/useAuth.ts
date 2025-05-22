"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  LoginCredentials,
  RegisterCredentials,
  setTokens,
  setUser,
  getUser,
} from "@/services/auth.service";
import { toast } from "sonner";
import { User } from "@/types/user";

export function useAuth() {
  const [user, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    console.log("Login function called in useAuth hook");
    setLoading(true);
    try {
      console.log("Attempting to login with:", { email: credentials.email });
      const response = await authService.login(credentials);
      console.log("Login successful, setting tokens");
      setTokens(response.access_token, response.refresh_token);

      const userProfile = await authService.getProfile();
      setUser(userProfile);
      setCurrentUser(userProfile);

      toast.success("Successfully logged in");
      router.push("/dashboard");
      return true;
    } catch (error) {
      console.error("Login error in useAuth hook:", error);
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
      setUser(userProfile);
      setCurrentUser(userProfile);

      toast.success("Account created successfully");
      router.push("/dashboard");
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
    setCurrentUser(null);
    toast.success("Successfully logged out");
    router.push("/login");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}

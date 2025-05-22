import { AUTH_ENDPOINTS, STORAGE_KEYS } from "@/constants";
import { User } from "@/types/user";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
  confirmPassword?: string;
}

const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = (name: string): void => {
  if (typeof window === "undefined") return;
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getAccessToken = (): string | null => {
  return getCookie(STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return getCookie(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  setCookie(STORAGE_KEYS.ACCESS_TOKEN, accessToken, 1 / 24);
  setCookie(STORAGE_KEYS.REFRESH_TOKEN, refreshToken, 7);
};

export const clearTokens = (): void => {
  eraseCookie(STORAGE_KEYS.ACCESS_TOKEN);
  eraseCookie(STORAGE_KEYS.REFRESH_TOKEN);
  eraseCookie(STORAGE_KEYS.USER);
};

export const getUser = (): User | null => {
  const userJson = getCookie(STORAGE_KEYS.USER);
  return userJson ? JSON.parse(userJson) : null;
};

export const setUser = (user: User): void => {
  setCookie(STORAGE_KEYS.USER, JSON.stringify(user), 7);
};

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async getProfile(): Promise<User> {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

    try {
      const response = await fetch(AUTH_ENDPOINTS.PROFILE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          await this.refreshToken();
          return this.getProfile();
        }

        const error = await response.json();
        throw new Error(error.message || "Failed to get profile");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(AUTH_ENDPOINTS.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    const data = await response.json();
    setTokens(data.access_token, refreshToken);
    return data;
  },

  logout(): void {
    clearTokens();
  },

  isAuthenticated(): boolean {
    return !!getAccessToken();
  },
};

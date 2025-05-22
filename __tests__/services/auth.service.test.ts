import { AUTH_ENDPOINTS } from "@/constants";
import {
  authService,
  LoginCredentials,
  RegisterCredentials,
} from "@/services/auth.service";

global.fetch = jest.fn();

Object.defineProperty(document, "cookie", {
  writable: true,
  value: "",
});

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = "";
  });

  describe("login", () => {
    it("should successfully login with valid credentials", async () => {
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResponse = {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await authService.login(credentials);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error when login fails", async () => {
      // Mock data
      const credentials: LoginCredentials = {
        email: "test@example.com",
        password: "wrong-password",
      };

      const errorMessage = "Invalid credentials";

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
      });

      await expect(authService.login(credentials)).rejects.toThrow(
        errorMessage
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    });
  });

  describe("register", () => {
    it("should successfully register with valid credentials", async () => {
      const credentials: RegisterCredentials = {
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
      };

      const mockResponse = {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await authService.register(credentials);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(AUTH_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error when registration fails", async () => {
      const credentials: RegisterCredentials = {
        email: "existing@example.com",
        password: "password123",
      };

      const errorMessage = "Email already exists";

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
      });

      await expect(authService.register(credentials)).rejects.toThrow(
        errorMessage
      );
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(AUTH_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
    });
  });

  describe("token management", () => {
    it("should have token management functions", () => {
      expect(typeof authService.login).toBe("function");
      expect(typeof authService.register).toBe("function");
    });
  });
});

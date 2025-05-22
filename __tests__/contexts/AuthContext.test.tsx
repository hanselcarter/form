import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";

jest.mock("@/services/auth.service", () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
    logout: jest.fn(),
  },
  getUser: jest.fn(),
  setUser: jest.fn(),
  setTokens: jest.fn(),
  clearTokens: jest.fn(),
}));

// Create mock functions we can inspect
const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
  }),
}));

const TestComponent = () => {
  const { user, isAuthenticated, login, register, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}
      <button
        data-testid="login-button"
        onClick={() =>
          login({ email: "test@example.com", password: "password123" })
        }
      >
        Login
      </button>
      <button
        data-testid="register-button"
        onClick={() =>
          register({
            email: "newuser@example.com",
            password: "password123",
            name: "New User",
          })
        }
      >
        Register
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should provide authentication status", () => {
    (authService.getProfile as jest.Mock).mockResolvedValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not Authenticated"
    );
  });

  it("should handle login successfully", async () => {
    // Clear mock history before each test
    mockRouterPush.mockClear();

    const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
    const mockTokens = {
      access_token: "test-token",
      refresh_token: "refresh-token",
    };

    (authService.login as jest.Mock).mockResolvedValue(mockTokens);
    (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authenticated"
      );
      // Verify router navigation
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should handle registration successfully", async () => {
    // Clear mock history before each test
    mockRouterPush.mockClear();

    const mockUser = {
      id: "2",
      email: "newuser@example.com",
      name: "New User",
    };
    const mockTokens = {
      access_token: "new-token",
      refresh_token: "new-refresh-token",
    };

    (authService.register as jest.Mock).mockResolvedValue(mockTokens);
    (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
      });
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authenticated"
      );
      // Verify router navigation
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should handle logout", async () => {
    mockRouterPush.mockClear();

    const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
    (authService.getProfile as jest.Mock).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Authenticated"
      );
    });

    fireEvent.click(screen.getByTestId("logout-button"));

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not Authenticated"
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should handle login failure", async () => {
    (authService.login as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalled();
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Not Authenticated"
      );
    });
  });
});

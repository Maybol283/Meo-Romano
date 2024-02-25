import { vi } from "vitest";
import * as AuthProviderModule from "@/components/Provider/AuthProvider"; // Adjust import path as necessary

export const mockSessionStorage = (authenticated) => {
  const sessionStorageMock = {
    getItem: vi.fn((key) =>
      key === "isAdminAuthenticated" && authenticated ? "true" : null
    ),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.sessionStorage = sessionStorageMock;
};

export const setupAuthMock = (authenticated) => {
  vi.mock("@/components/Provider/AuthProvider", () => ({
    useAuth: () => ({
      isAuthenticated: true,
      toggleAuth: vi.fn(),
    }),
  }));
};

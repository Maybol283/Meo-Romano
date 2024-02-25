import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "@/pages/SignIn"; // Adjust the import path as necessary

import { mockSessionStorage, setupAuthMock } from "../__mocks__/__AuthMocks__"; // Ensure correct path

//mock ReziseObserver to be able to see headless dialog box
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock provider auth
vi.mock("@/components/Provider/AuthProvider", () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: true,
    toggleAuth: vi.fn(),
  })),
}));

//mock navigation
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod =
    vi.importActual < typeof import("react-router-dom") > "react-router-dom";
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("SignIn Page", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks in between tests
    mockSessionStorage(true); // Assuming true means authenticated
    setupAuthMock(true); // Adjust based on the actual implementation of setupAuthMock
    render(<SignIn />);
  });

  it("updates pin state correctly when typing", async () => {
    const pinInput = screen.getByLabelText(/enter your pin below/i);
    fireEvent.change(pinInput, { target: { value: "123456" } });
    expect(pinInput.value).toBe("123456");
  });

  it("navigates to /update-manager with pin in query on correct pin submission", () => {
    const pinInput = screen.getByLabelText(/enter your pin below/i);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(pinInput, { target: { value: "123456" } });
    fireEvent.click(signInButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith(
      "/update-manager?pin=123456"
    );
  });

  it('opens AdminModal on pin "000000"', () => {
    const pinInput = screen.getByLabelText(/enter your pin below/i);
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(pinInput, { target: { value: "000000" } });
    fireEvent.click(signInButton);

    // This test might need an adjustment to verify the AdminModal's presence.
    // It depends on how the AdminModal's visibility is managed and rendered.
  });
});

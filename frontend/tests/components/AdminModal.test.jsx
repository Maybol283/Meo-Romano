import { render, screen, fireEvent } from "@testing-library/react";
import AdminModal from "@/components/AdminModal"; // Adjust the import path as necessary
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/tools/queryDatabase", () => ({
  adminLogin: vi.fn(() => Promise.resolve({ success: true })),
}));

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

vi.mock("@/components/Provider/AuthProvider", () => ({
  useAuth: () => ({
    toggleAuth: vi.fn(),
  }),
}));

describe("AdminModal", () => {
  it("renders correctly when open", () => {
    render(<AdminModal open={true} setOpen={() => {}} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText("Admin Login")).toBeInTheDocument();
  });

  it("submits login information", async () => {
    const setOpen = vi.fn();
    render(<AdminModal open={true} setOpen={setOpen} />, {
      wrapper: MemoryRouter,
    });

    const usernameInput = screen.getByPlaceholderText("Enter Username");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    // Simulate user typing into the input fields
    fireEvent.change(usernameInput, { target: { value: "adminUser" } });
    fireEvent.change(passwordInput, { target: { value: "adminPass" } });

    // Find and click the login button
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(mockedUseNavigate).toBeCalled();
  });

  // Add more tests as needed...
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminModal from "@/components/AdminModal"; // Adjust the import path as necessary
import { vi } from "vitest";

vi.mock("@/tools/queryDatabase", () => ({
  adminLogin: vi.fn((username, password) =>
    username === "validUser" && password === "validPass"
      ? Promise.resolve({ success: true })
      : Promise.resolve({ success: false, error: "Login Failed" })
  ),
}));

window.alert = vi.fn();

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockToggleAuth = vi.fn();

vi.mock("@/components/Provider/AuthProvider", () => ({
  useAuth: () => ({
    toggleAuth: mockToggleAuth,
  }),
}));
//Test 1
it("successfully logs in with correct credentials", async () => {
  render(<AdminModal open={true} setOpen={() => {}} />);
  mockToggleAuth.mockImplementation(() => {
    true;
  });
  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
    target: { value: "validUser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
    target: { value: "validPass" },
  });

  // Simulate form submission
  fireEvent.click(screen.getByText("Login"));

  // Check if navigation and auth toggling were called
  await waitFor(() => {
    expect(mockToggleAuth).toHaveBeenCalledWith(true);
  });
});

//Test 2
it("displays an error with incorrect credentials", async () => {
  render(<AdminModal open={true} setOpen={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText("Enter Username"), {
    target: { value: "user" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
    target: { value: "pass" },
  });
  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => {
    // Check that an error message is displayed or `toggleAuth` wasn't called with true
    expect(window.alert).toHaveBeenCalledWith("Login Failed");
  });
});

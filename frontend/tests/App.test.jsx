import { render, screen } from "@testing-library/react";
import App from "@/App"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { mockSessionStorage } from "./__mocks__/__AuthMocks__";
//mock the authentication from AuthProvider

// Assuming vi.mock is correctly set up as before
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal(); // Importing the actual module
  return {
    ...actual, // Spread all actual exports
    BrowserRouter: ({ children }) => <div>{children}</div>, // Mocking BrowserRouter
  };
});

// An array of route tests
const routes = [
  { path: "/", uniqueText: "more than just a meal" },
  { path: "/about", uniqueText: "Our Story" },
  { path: "/gallery", uniqueText: "The Gallery" },
  { path: "/reservations", uniqueText: "Reservation Page" },
  { path: "/sign-in", uniqueText: "Enter your pin below" },
  { path: "/update-manager", uniqueText: "you can edit your booking below" },
];

describe("Routing Test across multiple routes", () => {
  routes.forEach(({ path, uniqueText }) => {
    it(`renders the correct component for ${path}`, () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      // Check for unique text to verify the component is rendered
      expect(screen.getByText(uniqueText)).toBeInTheDocument();
    });
  });
});

describe("Protected Route Tests", () => {
  beforeEach(() => {
    // Clear sessionStorage mock before each test
    vi.restoreAllMocks();
  });

  it("renders the protected route content when authenticated", () => {
    // Simulate an authenticated state
    mockSessionStorage(true);

    render(
      <MemoryRouter initialEntries={["/booking-manager"]}>
        <App />
      </MemoryRouter>
    );

    // Assertion to verify content within the protected route
    expect(
      screen.getByText(
        "A list of all bookings in your account including their name, date, email and party number."
      )
    ).toBeInTheDocument();
  });

  it("does not render the protected route content when not authenticated", () => {
    // Simulate a non-authenticated state
    mockSessionStorage(false);

    render(
      <MemoryRouter initialEntries={["/protected-route"]}>
        <App />
      </MemoryRouter>
    );

    // Verify that the protected content is not accessible
    // This might redirect to a sign-in page or show a "not authorized" message
    expect(
      screen.queryByText(/content of protected route/i)
    ).not.toBeInTheDocument();
  });
});

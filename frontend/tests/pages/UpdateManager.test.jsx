import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import UpdateManager from "@/pages/UpdateManager"; // Adjust the import path as necessary

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"), // Import and spread the actual module
  useLocation: () => ({
    search: "?pin=123456", // Example query string
  }),
  useNavigate: () => vi.fn(),
}));

vi.mock("@/tools/queryDatabase.js", () => ({
  getUpdateBookingInfo: vi.fn(() =>
    Promise.resolve({
      date: "2023-01-01",
      first_name: "George",
      time_slot: "18:00",
      party_size: 4,
    })
  ),
  getTimeSlot: vi.fn(),
}));

describe("UpdateManager Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear all mocks before each test
  });

  it("displays loading state initially", async () => {
    render(<UpdateManager />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("transitions from loading to showing booking information", async () => {
    render(<UpdateManager />);
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    expect(screen.getByText("Update Manager")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Hello George")).toBeInTheDocument()
    );
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});

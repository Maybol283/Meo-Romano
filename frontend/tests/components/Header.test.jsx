import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing context

describe("Header", () => {
  it("renders the logo and main navigation links", () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText("Meo Romano")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Reservation")).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", async () => {
    render(<Header />, { wrapper: MemoryRouter });
    const mobileMenuButton = screen.getByText("Open main menu");
    fireEvent.click(mobileMenuButton); // Open mobile menu
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});

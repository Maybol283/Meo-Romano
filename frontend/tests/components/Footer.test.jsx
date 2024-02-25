import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer"; // Adjust the import path as necessary

describe("Footer Component", () => {
  it("renders contact information, reservation link, and hours", () => {
    render(<Footer />);

    // Verify contact section
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Contact@MeoRomano.co.uk")).toBeInTheDocument();
    expect(screen.getByText("123 Avenue")).toBeInTheDocument();
    expect(screen.getByText("Somewhere Nice")).toBeInTheDocument();

    // Verify reservation link
    const reservationLink = screen.getByRole("link", { name: "Reservation" });
    expect(reservationLink).toBeInTheDocument();
    expect(reservationLink).toHaveAttribute("href", "/Reservations");

    // Verify hours
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Everyday 6-10")).toBeInTheDocument();
  });
});

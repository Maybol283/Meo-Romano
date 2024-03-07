import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Gallery from "@/pages/Gallery"; // Adjust the import path based on your file structure
import pictures from "@/pictures/Pictures_URLS"; // Adjust the import path as needed

describe("Gallery Component", () => {
  // Test to check if the Gallery component renders without crashing
  it("renders Gallery component", () => {
    render(<Gallery />);
    expect(screen.getByText(/The Gallery/i)).toBeInTheDocument();
  });

  // Test to check if the correct gallery is displayed based on the viewport width
  it("displays correct gallery for mobile", () => {
    global.innerWidth = 500; // Set the window width to 500px (mobile view)
    const { rerender } = render(<Gallery />);
    const mobileImage = screen.getAllByRole("img")[0];
    expect(mobileImage).toHaveAttribute("src", pictures.gallery_mobile[0].url);
  });

  it("display the correct gallery for desktop", () => {
    global.innerWidth = 1024; // Set the window width to 1024px (desktop view)
    fireEvent(window, new Event("resize")); // Trigger the resize event
    const { rerender } = render(<Gallery />); // Rerender the component to apply the changes
    const desktopImage = screen.getAllByRole("img")[0];
    expect(desktopImage).toHaveAttribute("src", pictures.gallery[0].url);
  });
});

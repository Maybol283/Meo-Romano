import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "@/pages/About"; // Adjust the import path as necessary
import pictures from "@/pictures/Pictures_URLS"; // Adjust the import path as necessary

describe("About Page", () => {
  it("renders the About page content", () => {
    render(<About />);

    // Test for heading text
    expect(screen.getByText("Our Story")).toBeInTheDocument();

    // Test for descriptive paragraphs
    const paragraphText1 = /celebrating the essence of Italian cuisine/i;
    const paragraphText2 =
      /more than just a meal; it’s a journey through the art of fine dining/i;
    expect(screen.getByText(paragraphText1)).toBeInTheDocument();
    expect(screen.getByText(paragraphText2)).toBeInTheDocument();

    // Test for images - check if images are loaded with correct src from `pictures.about`
    const image1 = screen.getByAltText(pictures.about[0].url);
    const image2 = screen.getByAltText(pictures.about[1].alt);
    expect(image1).toHaveAttribute("src", pictures.about[0].url);
    expect(image2).toHaveAttribute("src", pictures.about[1].url);
  });
});

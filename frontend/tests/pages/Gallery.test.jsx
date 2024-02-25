import { vi } from "vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Gallery from "@/pages/Gallery"; // Adjust the import path as necessary

vi.mock("../../pictures/Pictures_URLS", () => ({
  default: {
    gallery: [
      { url: `/test/Drink_1.jpg`, alt: "Lemon Cocktail" },
      { url: `/test/Food_1.jpg`, alt: "Steak Grill" },
      { url: `/test/Food_2.jpg`, alt: "Pizza Slice" },
      { url: `/test/Food_3.jpg`, alt: "Spaghetti" },
      { url: `/test/Drink_2.jpg`, alt: "Mimosa" },
      { url: `/test/Food_4.jpg`, alt: "2 Meals" },
      { url: `/test/Misc_1.jpg`, alt: "Condiments" },
      { url: `/test/Food_5.jpg`, alt: "Pizza Oven" },
      { url: `/test/Food_6.jpg`, alt: "Carbonara" },
      { url: `/test/Food_8.jpg`, alt: "Oysters" },
      { url: `/test/Drink_3.jpg`, alt: "Wine Rack" },
      { url: `/test/Food_9.jpg`, alt: "Anti-Pasti" },
      { url: `/test/Drink_4.jpg`, alt: "Cocktail" },
      { url: `/test/Food_7.jpg`, alt: "Making Spaghetti" },
      { url: `/test/Food_11.jpg`, alt: "Pasta" },
      { url: `/test/Drink_5.jpg`, alt: "3 Cocktails" },
    ],
  },
}));

vi.mock("@react-spring/web", () => ({
  useSpring: vi.fn(() => ({ opacity: 1 })),
  animated: {
    // Mock `img` as a React component
    img: vi
      .fn()
      .mockImplementation(({ children, ...props }) => (
        <img {...props}>{children}</img>
      )),
  },
}));

describe("Gallery Component", () => {
  it("renders gallery images correctly", () => {
    render(<Gallery />);

    // Check for the gallery title
    expect(screen.getByText("The Gallery")).toBeInTheDocument();

    // Verify each mock image is rendered with correct src and alt attributes
    const images = [
      { url: `/test/Drink_1.jpg`, alt: "Lemon Cocktail" },
      { url: `/test/Food_1.jpg`, alt: "Steak Grill" },
      { url: `/test/Food_2.jpg`, alt: "Pizza Slice" },
      { url: `/test/Food_3.jpg`, alt: "Spaghetti" },
      { url: `/test/Drink_2.jpg`, alt: "Mimosa" },
      { url: `/test/Food_4.jpg`, alt: "2 Meals" },
      { url: `/test/Misc_1.jpg`, alt: "Condiments" },
      { url: `/test/Food_5.jpg`, alt: "Pizza Oven" },
      { url: `/test/Food_6.jpg`, alt: "Carbonara" },
      { url: `/test/Food_8.jpg`, alt: "Oysters" },
      { url: `/test/Drink_3.jpg`, alt: "Wine Rack" },
      { url: `/test/Food_9.jpg`, alt: "Anti-Pasti" },
      { url: `/test/Drink_4.jpg`, alt: "Cocktail" },
      { url: `/test/Food_7.jpg`, alt: "Making Spaghetti" },
      { url: `/test/Food_11.jpg`, alt: "Pasta" },
      { url: `/test/Drink_5.jpg`, alt: "3 Cocktails" },
    ];

    images.forEach(({ url, alt }) => {
      const expectedUrl = url.replace("/test", "/src/pictures");
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", expectedUrl);
    });
  });
});

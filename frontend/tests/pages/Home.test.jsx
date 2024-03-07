import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import pictures from "@/pictures/Pictures_URLS";
import Home from "@/pages/Home";

describe("Home", () => {
  it("renders the Home component", () => {
    render(<Home />);
    expect(screen.getByText("Meo Romano")).toBeInTheDocument();
  });

  it("renders the testimonials component", () => {
    render(<Home />);
    expect(screen.getByText("Judith Black")).toBeInTheDocument();
  });

  it("updates transformValue on scroll", () => {
    // Mock window properties
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      get: () => 5000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    const initialTransformValue =
      window.innerWidth > 800 ? 400 : window.innerWidth > 600 ? 300 : 175;

    // Render the Home component
    const { getByAltText } = render(<Home />);

    // The image element is identified by its alt text, which should be unique
    const imageContainer = getByAltText(pictures.home[0].alt).parentNode;

    // Check the initial transform style
    const expectedInitialTransform = `translateX(${initialTransformValue}px)`;
    expect(imageContainer.style.transform).toBe(expectedInitialTransform);

    // Simulate scrolling
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 1000 });
      window.dispatchEvent(new Event("scroll"));
    });

    // Calculate expected transform value after scrolling
    const scrollPosition = window.scrollY;
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPosition / totalScroll;
    let dampeningFactor = 0.5;
    let expectedTransformValue =
      -initialTransformValue + scrollPercent * 600 * dampeningFactor;

    // Check the updated transform style
    const expectedTransformAfterScroll = `translateX(${expectedTransformValue}px)`;
    expect(imageContainer.style.transform).toBe(expectedTransformAfterScroll);
  });

  it("renders pictures from the pictures object", () => {
    render(<Home />);
    expect(screen.getByAltText(pictures.home[0].alt)).toBeInTheDocument();
  });
});

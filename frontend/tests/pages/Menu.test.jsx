import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Menu from "@/pages/Menu"; // Adjust the import path as necessary
import menu from "@/assets/menuitems"; // Adjust the import path as necessary

describe("Menu Component", () => {
  it("renders menu sections and items correctly, handling duplicates", () => {
    render(<Menu />);

    // Check for the presence of section titles
    Object.keys(menu).forEach((sectionTitle) => {
      expect(screen.getByText(sectionTitle)).toBeInTheDocument();
    });

    // Check for the presence of item names and descriptions
    // For prices, especially duplicates, use getAllByText and verify the expected count
    Object.values(menu)
      .flat()
      .forEach(({ name, description, price }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();

        const priceOccurrences = screen.getAllByText(`£${price.toFixed(2)}`);
        // If you know the expected number of occurrences, you can assert on that
        // For example, if you know there should be 2 items priced at £18.50:
        if (price.toFixed(2) === "18.50") {
          expect(priceOccurrences.length).toBe(2); // Adjust this based on your data
        }
      });
  });
});

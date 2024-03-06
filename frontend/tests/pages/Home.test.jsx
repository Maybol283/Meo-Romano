import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";

describe("Home", () => {
  it("renders the Home component", () => {
    render(<Home />);
    expect(screen.getByText("Meo Romano")).toBeInTheDocument();
  });
});

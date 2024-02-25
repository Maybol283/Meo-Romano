import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

global.ResizeObserver = ResizeObserver;

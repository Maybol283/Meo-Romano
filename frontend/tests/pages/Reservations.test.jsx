import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservations from "@/pages/Reservations"; // Adjust the import path as necessary

vi.mock("../tools/queryDatabase", () => ({
  checkPartySize: vi.fn(), // Mock other functions as needed or leave them if not used
  getTimeSlot: vi.fn(() => Promise.resolve(["18:00", "19:00"])), // Example of mocking getTimeSlot to return specific time slots
  postReservation: vi.fn(() => Promise.resolve(true)), // Mock as per your test requirements
}));

vi.mock("@/tools/dateFormatter", () => ({
  __esModule: true, // This is important for modules that have a default export
  default: vi.fn((date) => date.toISOString().split("T")[0]), // Mock implementation of dateFormatter
}));

it("renders ReservationCalenderForm initially", () => {
  render(<Reservations />);
  expect(screen.getByText("Reservation Page")).toBeInTheDocument();
  // Add specific assertions for ReservationCalenderForm if it has unique identifiable text or elements
});

it("updates continueToggle and shows loading then availability card upon continue button click", async () => {
  render(<Reservations />);
  const continueButton = screen.getByText("Continue");
  fireEvent.click(continueButton);

  await waitFor(() => {
    // Adjust this condition based on the actual behavior and output of your component
    const noAvailabilityText = screen.queryByText(
      "Unfortunately, we have no availability on this day. Please select a different date."
    );
    expect(noAvailabilityText).toBeNull(); // Ensure this text is not present

    // If expecting "Select" buttons, ensure they should appear based on the mock
  });
  // Wait for the mock getTimeSlot to "resolve" and for its effects to be visible in the UI
  await waitFor(() => {
    // If getTimeSlot leads to showing "Select" buttons for time slots, check for those
    expect(screen.queryByText("Loading...")).toBeNull();
    // Assuming "Select" buttons appear as a result of getTimeSlot resolving with time slots
    const selectButtons = screen.queryAllByText("Select");
    expect(selectButtons.length).toBeGreaterThan(0);
  });
});

it("transitions to ContactInfo upon selecting a time slot", async () => {
  render(<Reservations />);
  // Simulate previous steps to reach the point where user can select a time slot
  // This might involve clicking through to make `continueToggle` reach the value that shows `AvailabilityCard`, then selecting a time

  // Example, assuming you simulate the flow correctly:
  await waitFor(() => {
    const submitButton = screen.getByText("Submit"); // Adjust based on your flow
    fireEvent.click(submitButton);
  });

  // Now, wait for the ContactInfo to be shown
  await waitFor(() => {
    expect(screen.getByText("Contact Information")).toBeInTheDocument(); // Assuming your ContactInfo component renders this text
  });
});

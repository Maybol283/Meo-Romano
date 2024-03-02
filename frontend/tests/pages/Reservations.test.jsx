import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservations from "@/pages/Reservations"; // Adjust the import path as necessary
import { expect, vi } from "vitest";

vi.mock("@/tools/queryDatabase.js", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    getTimeSlot: vi.fn(() => Promise.resolve(["18:00", "19:00"])),
    postReservation: vi.fn(() => Promise.resolve("ABC123")),
  };
});

vi.mock("@/tools/dateFormatter.js", () => ({
  __esModule: true,
  default: vi.fn((date) => date.toISOString().split("T")[0]),
}));

// Test 1: Initial render
it("renders ReservationCalenderForm initially", () => {
  render(<Reservations />);
  expect(screen.getByText("Reservation Page")).toBeInTheDocument();
  // Additional checks for ReservationCalenderForm elements
});

// Test 2: Continue to availability
it("shows availability after selecting date and party size", async () => {
  render(<Reservations />);

  fireEvent.click(screen.getByText("Continue"));

  // Wait for the async operation to complete and UI to update
  await waitFor(() => {
    // Check that the "no availability" message is not present
    expect(
      screen.queryByText(
        "Unfortunately, we have no availability on this day. Please select a different date."
      )
    ).toBeNull();
    // Check that the time slots are present
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });
});

//Test 3: Contact Info Transition
it("transitions to ContactInfo upon selecting a time slot", async () => {
  render(<Reservations />);
  fireEvent.click(screen.getByText("Continue"));

  // Wait for the "Select" buttons to be rendered
  await waitFor(() => {
    const selectButtons = screen.getAllByText("Select");
    expect(selectButtons.length).toBeGreaterThan(0);
    fireEvent.click(selectButtons[0]); // Click the first "Select" button
  });

  // Now wait for the ContactInfo component to appear
  await waitFor(() => {
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });
});

//Test 4: Contact Information Form
it("allows the user to enter contact information and proceed", async () => {
  render(<Reservations />);
  await waitFor(() => fireEvent.click(screen.getByText("Continue")));
  await waitFor(() => {
    const selectButtons = screen.getAllByText("Select");
    fireEvent.click(selectButtons[0]); // Click the first "Select" after it's available
  });

  // Wait for the ContactInfo component to render
  await waitFor(() => {
    expect(
      screen.getByLabelText("Contact Information Form")
    ).toBeInTheDocument();
  });

  // Fill in the contact information form
  await waitFor(() => {
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
  });
  // Simulate form submission or button click to proceed
  fireEvent.click(screen.getByText("Save"));

  // Check if the next step in the process is rendered, e.g., InfoCardCheck
  await waitFor(() => {
    expect(
      screen.getByLabelText("Reservation Information")
    ).toBeInTheDocument();
  });
});

//Test 5: Confirmation of Information and Submission
it("allows the user to confirm their reservation details", async () => {
  render(<Reservations />);
  await waitFor(() => fireEvent.click(screen.getByText("Continue")));
  await waitFor(() => {
    const selectButtons = screen.getAllByText("Select");
    fireEvent.click(selectButtons[0]); // Click the first "Select" after it's available
  });

  await waitFor(() => {
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
  });
  fireEvent.click(screen.getByText("Save"));

  // Wait for the InfoCardCheck component to render
  await waitFor(() => {
    expect(
      screen.getByLabelText("Reservation Information")
    ).toBeInTheDocument();
  });

  // Check for the presence of reservation detail fields
  await waitFor(() => {
    expect(screen.getByText("First name:")).toBeInTheDocument();
    expect(screen.getByText("Last name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Phone number:")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("Number of Guests:")).toBeInTheDocument();
  });
  // Click the confirm button
  fireEvent.click(screen.getByText("Submit"));

  // Check if the BookingConfirmation component is rendered
  await waitFor(() => {
    expect(
      screen.getByText("your booking was successful!")
    ).toBeInTheDocument(); // Adjust text based on your actual content
  });
});

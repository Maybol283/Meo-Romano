import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateCard from "@/Components/Reservation components/UpdateCard";
import { vi } from "vitest";
import {
  deleteBooking,
  updateBooking,
  getTimeSlot,
} from "@/tools/queryDatabase.js";

vi.mock("@headlessui/react", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Transition: vi.fn(({ children }) => <div>{children}</div>),
  };
});

vi.mock("@/tools/queryDatabase.js", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    getTimeSlot: vi.fn(() => Promise.resolve(["18:00", "19:00"])),
    postReservation: vi.fn(() => Promise.resolve("ABC123")),
    updateBooking: vi.fn(() => Promise.resolve()), // Ensure the mock aligns with usage
    deleteBooking: vi.fn(() => Promise.resolve()), // Ensure the mock aligns with usage
  };
});

describe("UpdateCard Component", () => {
  const mockSetContinueToggle = vi.fn();
  const mockSetAvailableTimes = vi.fn();
  const bookingInfo = {
    name: "John Doe",
    date: "2023-01-01",
    partySize: 4,
    timeSlot: "18:00",
  };
  const pin = "123456";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when continueToggle is 3", () => {
    render(
      <UpdateCard
        bookingInfo={bookingInfo}
        continueToggle={3}
        setContinueToggle={mockSetContinueToggle}
        pin={pin}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );
    expect(screen.getByText(`Hello ${bookingInfo.name}`)).toBeInTheDocument();
  });

  it("calls setContinueToggle with correct value on edit button click", () => {
    render(
      <UpdateCard
        bookingInfo={bookingInfo}
        continueToggle={3}
        setContinueToggle={mockSetContinueToggle}
        pin={pin}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockSetContinueToggle).toHaveBeenCalledWith(1);
  });

  it("handles timeSlot edit", async () => {
    render(
      <UpdateCard
        bookingInfo={bookingInfo}
        continueToggle={3}
        setContinueToggle={mockSetContinueToggle}
        pin={pin}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );

    const editTimeSlotButton = screen.getAllByText("Edit")[2]; // Assuming this is the third "Edit" button for the time slot
    fireEvent.click(editTimeSlotButton);

    await waitFor(() =>
      expect(getTimeSlot).toHaveBeenCalledWith(
        bookingInfo.partySize,
        bookingInfo.date
      )
    );
    expect(mockSetAvailableTimes).toHaveBeenCalledWith(["18:00", "19:00"]);
    expect(mockSetContinueToggle).toHaveBeenCalledWith(2);
  });

  it("handles delete button click", async () => {
    render(
      <UpdateCard
        bookingInfo={bookingInfo}
        continueToggle={3}
        setContinueToggle={mockSetContinueToggle}
        pin={pin}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );

    // Since deleteBooking is a mocked async function, ensure we await its call
    deleteBooking.mockResolvedValueOnce();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    await waitFor(() => expect(deleteBooking).toHaveBeenCalledWith(pin)); // Wait for deleteBooking to be called

    // Now check if setContinueToggle was called with the correct argument
    expect(mockSetContinueToggle).toHaveBeenCalledWith(5);
  });

  it("handles submit button click", async () => {
    updateBooking.mockResolvedValueOnce(); // Simulate successful update
    render(
      <UpdateCard
        bookingInfo={bookingInfo}
        continueToggle={3}
        setContinueToggle={mockSetContinueToggle}
        pin={pin}
        setAvailableTimes={mockSetAvailableTimes}
      />
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(updateBooking).toHaveBeenCalledWith(bookingInfo, pin)
    ); // Wait for updateBooking to be called

    // Now check if setContinueToggle was called with the correct argument after updateBooking resolves
    expect(mockSetContinueToggle).toHaveBeenCalledWith(6);
  });
});

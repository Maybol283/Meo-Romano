import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import axios from "axios";
import {
  checkPartySize,
  getTimeSlot,
  postReservation,
  getUpdateBookingInfo,
  deleteBooking,
  updateBooking,
  adminLogin,
  getAllBookingInfo,
} from "@/tools/queryDatabase.js";
import { vi } from "vitest";
import axios from "axios";
vi.mock("axios");

describe("checkPartySize", () => {
  it("returns the same number if even", () => {
    expect(checkPartySize(4)).toEqual(4);
  });

  it("returns the next even number if odd", () => {
    expect(checkPartySize(5)).toEqual(6);
  });
});

describe("getTimeSlot", () => {
  it("fetches and returns available slots as expected", async () => {
    // Mock data to be returned by the axios call
    const mockApiResponse = {
      data: { availableSlots: ["09:00 AM", "10:00 AM"] },
    };
    const mockSlots = ["09:00 AM", "10:00 AM"];

    // Configure axios mock to resolve with the mock data
    axios.get.mockResolvedValue(mockApiResponse);

    // Define your input parameters
    const partySize = 4;
    const date = "2023-01-01";

    // Call your function
    const result = await getTimeSlot(partySize, date);

    // Assert the expected result
    expect(result).toEqual(mockSlots);

    // Verify axios.get was called with the correct URL and parameters
    expect(axios.get).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/reservations/query",
      { params: { tablesNeeded: partySize, date: date } } // Assuming checkPartySize(partySize) === partySize for simplicity
    );
  });

  // You can add more tests here to cover failure cases or different scenarios
});

describe("postReservation", () => {
  // Mock data for the booking
  const mockBookingInfo = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    partySize: 4,
    timeSlot: "19:00",
    date: "2023-01-01",
  };

  it("successfully posts reservation data", async () => {
    // Mock the axios.post response
    axios.post.mockResolvedValue({ status: 200 });

    // Call the function with the mock booking info
    const result = await postReservation(mockBookingInfo);

    // Check that the function returns true
    expect(result).toBe(true);

    // Verify axios.post was called with the correct URL and booking data
    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/reservations/store",
      {
        first_name: mockBookingInfo.firstName,
        last_name: mockBookingInfo.lastName,
        phone_number: mockBookingInfo.phoneNumber,
        email: mockBookingInfo.email,
        tables_needed: expect.any(Number), // Since checkPartySize might alter this, we expect any number
        party_size: mockBookingInfo.partySize,
        time_slot: mockBookingInfo.timeSlot,
        date: mockBookingInfo.date,
      }
    );
  });

  // You can add more tests here to cover failure cases or different scenarios
});

describe("getUpdateBookingInfo", () => {
  it("fetches booking info successfully given a PIN", async () => {
    // Mock API response data
    const mockApiResponse = {
      data: {
        date: "2023-01-01",
        time: "19:00",
        first_name: "John",
        number_of_guests: 4,
      },
    };

    // Configure axios.get mock to resolve with the mock data
    axios.get.mockResolvedValue(mockApiResponse);

    // Define the PIN to use for the test
    const testPin = "123456";

    // Call the function with the test PIN
    const result = await getUpdateBookingInfo(testPin);

    // Assert that the result matches the mock API response data
    expect(result).toEqual(mockApiResponse.data);

    // Verify axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/api/update-manager/get?pin=${testPin}`
    );
  });

  // Here you can add more tests to cover different scenarios, such as handling API call failures
});

describe("deleteBooking", () => {
  it("successfully deletes a booking given a PIN", async () => {
    // Mock the successful API response
    const mockApiResponse = { success: true };
    axios.delete.mockResolvedValue({ data: mockApiResponse });

    // Define the PIN to use for the test
    const testPin = "123456";

    // Call the function with the test PIN
    const result = await deleteBooking(testPin);

    // Assert that the result matches the mock API response data
    expect(result).toEqual(mockApiResponse);

    // Verify axios.delete was called with the correct URL
    expect(axios.delete).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/api/update-manager/delete?pin=${testPin}`
    );
  });

  // Here you can add more tests to cover different scenarios, such as handling API call failures
  // For example, testing how the function handles an API error
  it("handles errors on API failure", async () => {
    // Mock an API failure
    const errorMessage = "Async error";
    axios.delete.mockRejectedValue(new Error(errorMessage));

    // Attempt to delete with a test PIN, expecting an error to be logged
    console.error = vi.fn(); // Mock console.error to verify it gets called

    const testPin = "failCase";
    await deleteBooking(testPin);

    // Verify that console.error was called with the expected message
    expect(console.error).toHaveBeenCalledWith("Error:", errorMessage);

    // Cleanup mock
    console.error.mockRestore();
  });
});

describe("updateBooking", () => {
  const mockBookingInfo = {
    date: "2023-01-02",
    partySize: 4,
    timeSlot: "18:00",
  };
  const testPin = "123456";
  it("successfully updates a booking given booking information and a PIN", async () => {
    // Mock the successful API response
    const mockApiResponse = { updated: true };
    axios.patch.mockResolvedValue({ data: mockApiResponse });

    // Mock booking information and PIN for the test

    // Call the function with the mock booking information and PIN
    const result = await updateBooking(mockBookingInfo, testPin);

    // Assert that the result matches the mock API response data
    expect(result).toEqual(mockApiResponse);

    // Verify axios.patch was called with the correct URL and booking information
    expect(axios.patch).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/api/update-manager/update`,
      {
        pin: testPin,
        date: mockBookingInfo.date,
        party_size: mockBookingInfo.partySize,
        time_slot: mockBookingInfo.timeSlot,
        tables_needed: expect.any(Number), // Assuming checkPartySize might alter this, we expect any number
      }
    );
  });

  // Here you can add more tests to cover different scenarios, such as handling API call failures
  it("handles errors on API failure", async () => {
    // Mock an API failure
    const errorMessage = "Async error";
    axios.patch.mockRejectedValue(new Error(errorMessage));

    // Attempt to update with mock booking information, expecting an error to be logged
    console.error = vi.fn(); // Mock console.error to verify it gets called

    await updateBooking(mockBookingInfo, testPin);

    // Verify that console.error was called with the expected message
    expect(console.error).toHaveBeenCalledWith("Error:", errorMessage);

    // Cleanup mock
    console.error.mockRestore();
  });
});

describe("adminLogin", () => {
  const username = "admin";
  const password = "password";

  it("successfully logs in the admin", async () => {
    // Mock axios responses for both the CSRF cookie call and the login call
    axios.get.mockResolvedValue({ status: 200 });
    const mockLoginResponse = {
      status: 200,
      data: {
        token: "fake-jwt-token",
      },
    };
    axios.post.mockResolvedValue(mockLoginResponse);

    // Call adminLogin with mock credentials
    const response = await adminLogin(username, password);

    // Assert successful login response
    expect(response).toEqual({ success: true, token: "fake-jwt-token" });
    // Verify axios calls were made correctly
    expect(axios.get).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sanctum/csrf-cookie",
      {
        withCredentials: true,
      }
    );
    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/admin/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
  });

  it("fails to log in the admin with incorrect credentials", async () => {
    // Mock axios post to simulate failed login attempt
    axios.post.mockResolvedValue({ status: 401 }); // Assuming 401 Unauthorized for failed login

    // Attempt to log in with incorrect credentials
    const response = await adminLogin("wronguser", "wrongpass");

    // Assert failure response
    expect(response).toEqual({ success: false, error: "Login failed" });
  });

  it("handles network or server errors", async () => {
    // Mock a network or server error on login attempt
    const errorMessage = "Network error";
    axios.post.mockRejectedValue(new Error(errorMessage));

    // Mock console.error to verify it gets called
    console.error = vi.fn();

    // Attempt to log in which should trigger an error
    const response = await adminLogin(username, password);

    // Assert that the login attempt was unsuccessful and an error message is returned
    expect(response).toEqual({ success: false, error: errorMessage });
    // Verify that console.error was called with the error message
    expect(console.error).toHaveBeenCalledWith("Error:", errorMessage);

    // Cleanup mock
    console.error.mockRestore();
  });
});

describe("getAllBookingInfo", () => {
  it("successfully fetches all booking information", async () => {
    // Mock API response data
    const mockApiResponse = {
      data: [
        { id: 1, name: "Booking 1", date: "2023-01-01" },
        { id: 2, name: "Booking 2", date: "2023-01-02" },
      ],
    };

    // Configure axios.get mock to resolve with the mock data
    axios.get.mockResolvedValue(mockApiResponse);

    // Call the function
    const result = await getAllBookingInfo();

    // Assert that the result matches the mock API response data
    expect(result).toEqual(mockApiResponse.data);

    // Verify axios.get was called with the correct URL and config
    expect(axios.get).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/api/booking-manager/getAll`,
      {
        withCredentials: true,
      }
    );
  });

  it("handles errors if the API call fails", async () => {
    // Mock a network or server error
    const errorMessage = "Network error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Mock console.error to verify it gets called
    console.error = vi.fn();

    // Attempt to fetch booking info which should trigger an error
    await getAllBookingInfo();

    // Assert that console.error was called with the expected message
    expect(console.error).toHaveBeenCalledWith("Error:", errorMessage);

    // Cleanup mock
    console.error.mockRestore();
  });
});

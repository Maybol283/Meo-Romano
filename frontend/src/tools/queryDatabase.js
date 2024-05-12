import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function checkPartySize(partySize) {
  return partySize % 2 === 0 ? partySize : partySize + 1;
}

// Adding success and error callback parameters
export async function getTimeSlot(partySize, date) {
  // Adjust party size

  const data = {
    tablesNeeded: checkPartySize(partySize),
    date: date,
  };

  try {
    const response = await axios.get(
      `${API_BASE_URL}api/reservations/query?tablesNeeded=${data.tablesNeeded}&date=${data.date}`
    );
    const availableSlots = response.data.availableSlots;

    return availableSlots;
  } catch (error) {
    throw error;
  }
}

//post the bookingInfo to database
export async function postReservation(bookingInfo) {
  const booking = {
    first_name: bookingInfo.firstName,
    last_name: bookingInfo.lastName,
    phone_number: bookingInfo.phoneNumber,
    email: bookingInfo.email,
    tables_needed: checkPartySize(bookingInfo.partySize),
    party_size: bookingInfo.partySize,
    time_slot: bookingInfo.timeSlot,
    date: bookingInfo.date,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}api/reservations/store`,
      booking
    );
    console.log(response);
    return response.data.pin;
  } catch (error) {
    throw error;
  }
}

//retrieve columns: date, time, first_name and number_of_guests
export async function getUpdateBookingInfo(pin) {
  try {
    // Append the pin as a query parameter in the URL
    const url = `${API_BASE_URL}api/update-manager/get?pin=${pin}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBooking(pin) {
  try {
    // Append the pin as a query parameter in the URL
    const url = `${API_BASE_URL}api/update-manager/delete?pin=${pin}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateBooking(bookingInfo, pin) {
  try {
    const updateInfo = {
      pin: pin,
      date: bookingInfo.date, // Changed from new_date
      party_size: bookingInfo.partySize, // Changed from new_party_size
      time_slot: bookingInfo.timeSlot, // Changed from new_time_slot
      tables_needed: checkPartySize(bookingInfo.partySize), // Changed from new_tables_needed
    };

    const response = await axios.patch(
      `${API_BASE_URL}api/update-manager/update`,
      updateInfo
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function adminLogin(username, password) {
  try {
    await axios.get(`${API_BASE_URL}sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    const response = await axios.post(
      `${API_BASE_URL}api/admin/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true, // Include this line to ensure cookies are sent with the request
      }
    );
    if (response.status === 200) {
      return { success: true, token: response.data.token };
    } else {
      return { success: false, error: "Login failed" };
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllBookingInfo(page = 1) {
  try {
    const url = `${API_BASE_URL}api/booking-manager/getAll?page=${page}`;

    // Make the request with credentials included
    const response = await axios.get(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

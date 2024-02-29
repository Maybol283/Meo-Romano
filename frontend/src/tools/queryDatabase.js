import axios from "axios";

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
      "http://127.0.0.1:8000/api/reservations/query",
      { params: data }
    );
    const availableSlots = response.data.availableSlots;
    return availableSlots;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
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
      "http://127.0.0.1:8000/api/reservations/store",
      booking,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response);
    return response.data.pin;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

//retrieve columns: date, time, first_name and number_of_guests
export async function getUpdateBookingInfo(pin) {
  try {
    // Append the pin as a query parameter in the URL
    const url = `http://127.0.0.1:8000/api/update-manager/get?pin=${pin}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

export async function deleteBooking(pin) {
  try {
    // Append the pin as a query parameter in the URL
    const url = `http://127.0.0.1:8000/api/update-manager/delete?pin=${pin}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
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
      `http://127.0.0.1:8000/api/update-manager/update`,
      updateInfo
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

export async function adminLogin(username, password) {
  try {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    const response = await axios.post(
      "http://127.0.0.1:8000/api/admin/login",
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
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return { success: false, error: error.message };
  }
}

export async function getAllBookingInfo() {
  try {
    const url = `http://127.0.0.1:8000/api/booking-manager/getAll`;

    // Make the request with credentials included
    const response = await axios.get(url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

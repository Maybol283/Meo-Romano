import axios from 'axios';


function checkPartySize(partySize) {
    return partySize % 2 === 0 ? partySize : partySize + 1;
}
// Adding success and error callback parameters
export default async function getTimeSlot(partySize, date) {
    // Adjust party size
    
    
 
    const data = {
        tablesNeeded: checkPartySize(partySize),
        date: date,
    };

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/reservations/query', { params: data });
        const availableSlots = response.data.availableSlots;
        return availableSlots;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

export async function postReservation (bookingInfo){

    const booking = {
        first_name: bookingInfo.firstName,
        last_name: bookingInfo.lastName,
        phone_number: bookingInfo.phoneNumber,
        email: bookingInfo.email,
        tables_needed: checkPartySize(bookingInfo.partySize),
        time_slot: bookingInfo.timeSlot,
        date: bookingInfo.date
    };

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/reservations/store', booking);
      return true

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
    
}
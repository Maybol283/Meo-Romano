import axios from 'axios';

// Adding success and error callback parameters
export default function getTimeSlot(partySize, date) {
    // Adjust party size
    function checkPartySize(partySize) {
        return partySize % 2 === 0 ? partySize : partySize + 1;
    }
 
    const data = {
        tablesNeeded: checkPartySize(partySize),
        date: date,
    };

    return axios.get('http://127.0.0.1:8000/api/reservations/query', { params: data })
        .then(response => {
            const availableSlots = response.data.availableSlots;
          
            return availableSlots
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}

export function postReservation (bookingInfo){

}
import axios from 'axios'

export default function queryDatabase(partySize, date) {
    // Prepare the data
    //Tables are for two only so even if one person it will consume two seats
    function checkPartySize(partySize) {
      if (partySize % 2 === 0) {
        return partySize;
      } else {
        return partySize + 1;
      }
    }
    
    const data = {
      tablesNeeded: checkPartySize(partySize),
      date: date
    };
  
 

   // Send a POST request to your backend
    axios.get('http://127.0.0.1:8000/api/reservations/query', { params: data })
    .then(response => {
        console.log('Success:', response.data);
        // Handle success here (e.g., update state, redirect, etc.)
    })
   .catch(error => {
     console.error('Error:', error.response ? error.response.data : error.message);
     // Handle errors here
   });
}
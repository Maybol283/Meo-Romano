import axios from 'axios'

export default function queryDatabase(partySize, date) {
    // Prepare the data
    const data = {
      partySize: partySize,
      date: date
    };
  
   // Send a POST request to your backend
    axios.get('http://127.0.0.1:8000/reservations/query', data)
    .then(response => {
        console.log('Success:', response.data);
        // Handle success here (e.g., update state, redirect, etc.)
    })
   .catch(error => {
     console.error('Error:', error.response ? error.response.data : error.message);
     // Handle errors here
   });
}
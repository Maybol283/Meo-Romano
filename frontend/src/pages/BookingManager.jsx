export default function BookingManager() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/bookings"); // Update with your actual endpoint
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        // Handle error appropriately
      }
    };

    fetchBookings();
  }, []);
  return (
    <div>
      <h2>Booking Management</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Party Size</th>
            <th>Tables Needed</th>
            <th>Actions</th>{" "}
            {/* If you want to include actions like edit or delete */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              {" "}
              {/* Assuming each booking has a unique id */}
              <td>{booking.date}</td>
              <td>{booking.timeSlot}</td>
              <td>{booking.partySize}</td>
              <td>{booking.tablesNeeded}</td>
              <td>
                {/* Example actions */}
                <button onClick={() => editBooking(booking.id)}>Edit</button>
                <button onClick={() => deleteBooking(booking.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

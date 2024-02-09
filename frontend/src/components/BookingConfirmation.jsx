export default function BookingConfirmation({ bookingInfo }) {
  console.log(bookingInfo);
  return (
    <div className="text-xl pt-20">
      <h2>
        <span className="font-medium underline decoration-solid">
          {bookingInfo.firstName}
        </span>{" "}
        your booking was successful!
      </h2>
      <br></br>
      <p>
        A confirmation email has been sent to:{" "}
        <span className="font-medium underline decoration-solid">
          {bookingInfo.email}
        </span>{" "}
      </p>
    </div>
  );
}

export default function InfoCardCheck({ bookingInfo, setContinueToggle }) {
  const fieldNames = {
    Date: bookingInfo.date,
    Time: bookingInfo.timeSlot,
    "First name": bookingInfo.firstName,
    "Last name": bookingInfo.lastName,
    "Phone number": bookingInfo.phoneNumber,
    "E-mail": bookingInfo.email,
    "Number of Guests": bookingInfo.partySize,
  };

  return (
    <div className="rounded-md bg-white shadow">
      <ul role="list" className="overflow-y-auto divide-y divide-gray-200">
        {Object.entries(fieldNames).map(([fieldName, value], index) => (
          <li
            key={fieldName + index}
            className="px-6 py-4 flex justify-between"
          >
            {" "}
            {/* Added flex layout for better control */}
            <span className="font-black">{fieldName}:</span>
            <span>{value}</span>
            <span>
              <button
                value={fieldName}
                onClick={() => {
                  console.log(fieldName);
                  switch (fieldName) {
                    case "First name":
                    case "Last name":
                    case "Phone number":
                    case "E-mail":
                      setContinueToggle(3);
                      break;
                    case "Time":
                      setContinueToggle(2);
                      break;
                    default:
                      setContinueToggle(0);
                  }
                }}
              >
                edit
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
